import { useMemo, useState } from 'react';
import { TooltipProvider } from './components/TooltipProvider';
import { deriveConcepts, initialState, studyScreen } from './state/demoState';
import type { DemoState, StudyTab } from './types/demo';
import { HomeScreen } from './screens/HomeScreen';
import { CreateStudyScreen } from './screens/CreateStudyScreen';
import { InviteScreen } from './screens/InviteScreen';
import { StudyShell } from './screens/StudyShell';
import { ReviewScreen } from './screens/ReviewScreen';
import './styles/tokens.css';
import './styles/globals.css';

export default function App() {
  const [state, setState] = useState<DemoState>(initialState);
  const concepts = useMemo(() => deriveConcepts(state), [state]);

  const setTab = (tab: StudyTab) => setState((current) => ({ ...current, screen: studyScreen(tab) }));

  return (
    <TooltipProvider>
      {state.screen.route === 'home' && (
        <HomeScreen
          onCreate={() => setState((current) => ({ ...current, screen: { route: 'createStudy' } }))}
          onOpenStudy={() => setState((current) => ({ ...current, screen: studyScreen('knowledge') }))}
        />
      )}
      {state.screen.route === 'createStudy' && (
        <CreateStudyScreen
          onNext={() => setState((current) => ({ ...current, screen: { route: 'invite' } }))}
          onCancel={() => setState((current) => ({ ...current, screen: { route: 'home' } }))}
        />
      )}
      {state.screen.route === 'invite' && <InviteScreen onEnterStudy={() => setState((current) => ({ ...current, screen: studyScreen('upload') }))} />}
      {state.screen.route === 'study' && (
        <StudyShell
          tab={state.screen.tab}
          concepts={concepts}
          onTabChange={setTab}
          onReview={() => setState((current) => ({ ...current, screen: { route: 'review', materialId: '자료1' } }))}
          onQuestionDraft={() => setState((current) => ({ ...current, draftQuestionOpen: !current.draftQuestionOpen }))}
          draftQuestionOpen={state.draftQuestionOpen}
          editQuestionId={state.editQuestionId}
          deleteQuestionId={state.deleteQuestionId}
          editReplyId={state.editReplyId}
        />
      )}
      {state.screen.route === 'review' && (
        <ReviewScreen
          onApprove={() => setState((current) => ({ ...current, approvedConceptIds: ['개념1'], rejectedConceptIds: [], screen: studyScreen('knowledge') }))}
          onReject={() => setState((current) => ({ ...current, rejectedConceptIds: ['개념1'], approvedConceptIds: [], screen: studyScreen('knowledge') }))}
        />
      )}
    </TooltipProvider>
  );
}
