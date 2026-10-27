import { useCallback, useEffect, useRef, useState } from 'react';

/** Where on the screen the token sits, as a share of the viewport height. */
const TOKEN_VIEWPORT_POSITION = 0.55;

function setsAreEqual(a, b) {
  if (a.size !== b.size) return false;
  for (const item of a) {
    if (!b.has(item)) return false;
  }
  return true;
}

/**
 * Drives the process rail.
 * The rail fill and token move with scroll. They are updated through refs,
 * so scrolling does not re-render the whole page. React state only changes
 * when a step is reached or left.
 */
export function useProcessProgress({ processRef, fillRef, tokenRef }) {
  const nodesRef = useRef(new Map());
  const seenRef = useRef(new Set());
  const isReadyRef = useRef(false);

  const [reachedSteps, setReachedSteps] = useState(() => new Set());
  const [playedSteps, setPlayedSteps] = useState(() => new Set());
  const [arrowPositions, setArrowPositions] = useState([]);

  const registerNode = useCallback((stepId, element) => {
    nodesRef.current.set(stepId, element);
    return () => nodesRef.current.delete(stepId);
  }, []);

  /** Vertical position of each node inside the process, in document order. */
  const getNodeBoxes = useCallback(() => {
    const process = processRef.current;
    if (!process) return [];
    const top = process.getBoundingClientRect().top;

    return [...nodesRef.current.entries()]
      .map(([stepId, element]) => {
        const box = element.getBoundingClientRect();
        return {
          stepId,
          top: box.top - top,
          bottom: box.bottom - top,
          center: box.top + box.height / 2 - top,
        };
      })
      .sort((a, b) => a.top - b.top);
  }, [processRef]);

  const measureArrows = useCallback(() => {
    const boxes = getNodeBoxes();
    const arrows = boxes.slice(1).map((box, index) => ({
      toStepId: box.stepId,
      y: (boxes[index].bottom + box.top) / 2,
    }));
    setArrowPositions(arrows);
  }, [getNodeBoxes]);

  const updateProgress = useCallback(() => {
    const process = processRef.current;
    if (!process) return;

    const { top, height } = process.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const isAtPageBottom =
      window.scrollY + viewportHeight >= document.documentElement.scrollHeight - 4;
    const tokenY = isAtPageBottom
      ? height
      : Math.min(height, Math.max(0, viewportHeight * TOKEN_VIEWPORT_POSITION - top));

    if (fillRef.current) fillRef.current.style.height = `${tokenY}px`;
    if (tokenRef.current) tokenRef.current.style.transform = `translateY(${tokenY}px)`;

    const nextReached = new Set(
      getNodeBoxes()
        .filter((box) => tokenY >= box.center)
        .map((box) => box.stepId),
    );
    setReachedSteps((previous) => (setsAreEqual(previous, nextReached) ? previous : nextReached));

    // Steps reached for the first time after the page loaded get their entrance animation.
    const firstTimeSteps = [...nextReached].filter((stepId) => !seenRef.current.has(stepId));
    firstTimeSteps.forEach((stepId) => seenRef.current.add(stepId));
    if (isReadyRef.current && firstTimeSteps.length > 0) {
      setPlayedSteps((previous) => new Set([...previous, ...firstTimeSteps]));
    }
  }, [processRef, fillRef, tokenRef, getNodeBoxes]);

  useEffect(() => {
    let frameId = 0;

    const scheduleUpdate = () => {
      if (frameId) return;
      frameId = requestAnimationFrame(() => {
        frameId = 0;
        updateProgress();
      });
    };
    const handleResize = () => {
      measureArrows();
      scheduleUpdate();
    };

    measureArrows();
    updateProgress();
    isReadyRef.current = true;

    // Fonts change text height, so measure again once they are loaded.
    document.fonts?.ready.then(handleResize);

    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', handleResize);
    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', handleResize);
    };
  }, [measureArrows, updateProgress]);

  return { registerNode, reachedSteps, playedSteps, arrowPositions };
}
