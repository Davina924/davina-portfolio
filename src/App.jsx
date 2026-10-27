import { useMemo, useRef, useState } from 'react';
import CertificateList from './components/CertificateList/CertificateList.jsx';
import CertificatePreviewProvider from './components/CertificatePreview/CertificatePreviewProvider.jsx';
import Contact from './components/Contact/Contact.jsx';
import Entry from './components/Entry/Entry.jsx';
import Footer from './components/Footer/Footer.jsx';
import Gateway from './components/Gateway/Gateway.jsx';
import Header from './components/Header/Header.jsx';
import Hero from './components/Hero/Hero.jsx';
import ProcessRail from './components/ProcessRail/ProcessRail.jsx';
import Skills from './components/Skills/Skills.jsx';
import Step from './components/Step/Step.jsx';
import { ProcessContext } from './context/ProcessContext.js';
import { CERTIFICATIONS, EDUCATION, PROJECTS, TEACHING, VOLUNTEERING } from './data/experience.js';
import { PROCESS_STEPS, PROFILE } from './data/profile.js';
import { SKILL_GROUPS } from './data/skills.js';
import { useProcessProgress } from './hooks/useProcessProgress.js';
import { useTheme } from './hooks/useTheme.js';
import styles from './App.module.css';

export default function App() {
  const { theme, toggleTheme } = useTheme();
  const [hoveredStep, setHoveredStep] = useState(null);

  const processRef = useRef(null);
  const fillRef = useRef(null);
  const tokenRef = useRef(null);
  const { registerNode, reachedSteps, playedSteps, arrowPositions } = useProcessProgress({
    processRef,
    fillRef,
    tokenRef,
  });

  const currentStepLabel = useMemo(() => {
    const lastReached = [...PROCESS_STEPS].reverse().find((step) => reachedSteps.has(step.id));
    if (!lastReached) return PROCESS_STEPS[0].label;
    return lastReached.id === 'next' ? `${lastReached.label} · complete` : lastReached.label;
  }, [reachedSteps]);

  const processContextValue = useMemo(
    () => ({ registerNode, reachedSteps, playedSteps, setHoveredStep }),
    [registerNode, reachedSteps, playedSteps],
  );

  const fullName = `${PROFILE.firstName} ${PROFILE.lastName}`;

  return (
    <CertificatePreviewProvider>
      <Header name={fullName} currentStepLabel={currentStepLabel} />

      <div className={styles.wrap}>
        <ProcessContext.Provider value={processContextValue}>
          <main ref={processRef} className={styles.process}>
            <ProcessRail
              ref={fillRef}
              tokenRef={tokenRef}
              arrows={arrowPositions}
              reachedSteps={reachedSteps}
            />

            <Step
              id="start"
              nodeType="start"
              variant="hero"
              kicker="start event"
              kickerNote={PROFILE.location}
              bare
            >
              <Hero profile={PROFILE} theme={theme} onToggleTheme={toggleTheme} />
            </Step>

            <Step
              id="learn"
              nodeType="task"
              kicker="task 1"
              title="Learn how businesses run"
              intro="Information Systems at ITS taught me to model a process before touching any software. SAP training showed me what an integrated ERP looks like end to end."
              layout="two"
            >
              <Entry title="Certifications" period={`${CERTIFICATIONS.length} completed`}>
                <CertificateList
                  certificates={CERTIFICATIONS}
                  checked={reachedSteps.has('learn')}
                />
              </Entry>
              <Entry {...EDUCATION} playStat={playedSteps.has('learn')} />
            </Step>

            <Step
              id="teach"
              nodeType="task"
              kicker="task 2"
              title="Explain the system to others"
              intro="Teaching Odoo showed me where people get stuck. Usually it isn't the software. It's the process around it."
            >
              <Entry {...TEACHING} playStat={playedSteps.has('teach')} />
            </Step>

            <Step
              id="build"
              nodeType="task"
              kicker="task 3"
              title="Build tools that show progress"
              intro="Two coursework projects with the same goal: make progress easy to see, for one person's tasks and for a whole company."
              layout="two"
            >
              {PROJECTS.map((project) => (
                <Entry key={project.id} {...project} />
              ))}
            </Step>

            <Step
              id="coordinate"
              nodeType="task"
              kicker="task 4 · volunteering"
              title="Keep people moving together"
              intro="Processes run on people. Campus programs taught me to keep teams and partners in sync so nothing falls through."
              layout="two"
            >
              {VOLUNTEERING.map((item) => (
                <Entry key={item.id} {...item} playStat={playedSteps.has('coordinate')} />
              ))}
            </Step>

            <Step id="tools" nodeType="data" kicker="data object" title="What I work with">
              <Skills groups={SKILL_GROUPS} highlightedStep={hoveredStep} />
            </Step>

            <Step
              id="decide"
              nodeType="gateway"
              kicker="decision"
              title="Is there a remote internship?"
            >
              <Gateway isReached={reachedSteps.has('decide')} />
            </Step>

            <Step id="next" nodeType="end" kicker="end event" bare>
              <Contact email={PROFILE.email} linkedinUrl={PROFILE.linkedinUrl} />
            </Step>
          </main>
        </ProcessContext.Provider>

        <Footer name={fullName} />
      </div>
    </CertificatePreviewProvider>
  );
}
