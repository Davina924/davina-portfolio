import { createContext } from 'react';

/**
 * Shared state for the process rail.
 * - registerNode(id, element): steps report where their BPMN node is.
 * - reachedSteps: steps the token has passed.
 * - playedSteps: steps that should play their entrance animation.
 * - hoveredStep / setHoveredStep: used to highlight tools in the Toolkit.
 */
export const ProcessContext = createContext(null);
