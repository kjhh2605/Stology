import { useMemo, useState } from 'react';
import { AppFrame } from './components/AppFrame';
import { TooltipProvider } from './components/TooltipProvider';
import { deriveConcepts, initialState, studyScreen } from './state/demoState';
import type { DemoState, HomeModal, ReviewDecision, StudyTab } from './types/demo';
import { HomeScreen } from './screens/HomeScreen';
import { StudyShell } from './screens/StudyShell';
import { ReviewScreen } from './screens/ReviewScreen';
import './styles/tokens.css';
import './styles/globals.css';

export default function App() {
  const [state, setState] = useState<DemoState>(initialState);
  const concepts = useMemo(() => deriveConcepts(state), [state]);

  const openHome = () => setState((current) => ({ ...current, screen: { route: 'home' }, homeModal: null }));
  const openStudy = (tab: StudyTab = 'knowledge') => setState((current) => ({ ...current, screen: studyScreen(tab), homeModal: null }));
  const setTab = (tab: StudyTab) => setState((current) => ({ ...current, screen: studyScreen(tab) }));
  const setHomeModal = (homeModal: HomeModal) => setState((current) => ({ ...current, homeModal }));
  const setReviewDecision = (reviewDecision: ReviewDecision) => setState((current) => ({ ...current, reviewDecision }));
  const finishReview = () => {
    setState((current) => ({
      ...current,
      approvedConceptIds: current.reviewDecision === 'approve' ? ['개념1'] : [],
      rejectedConceptIds: current.reviewDecision === 'reject' ? ['개념1'] : [],
      reviewDecision: null,
      screen: studyScreen('upload'),
    }));
  };

  return (
    <TooltipProvider>
      {state.screen.route === 'home' && (
        <AppFrame active="home" onHome={openHome} onOpenStudy={openStudy}>
          <HomeScreen
            modal={state.homeModal}
            onCreate={() => setHomeModal('createStudy')}
            onInvite={() => setHomeModal('invite')}
            onCloseModal={() => setHomeModal(null)}
            onOpenStudy={() => openStudy('knowledge')}
            onEnterStudy={() => openStudy('upload')}
          />
        </AppFrame>
      )}
      {state.screen.route === 'study' && (
        <AppFrame active="study" onHome={openHome} onOpenStudy={openStudy}>
          <StudyShell
            tab={state.screen.tab}
            concepts={concepts}
            onTabChange={setTab}
            onReview={() => setState((current) => ({ ...current, reviewDecision: null, screen: { route: 'review', materialId: '자료1' } }))}
            onQuestionDraft={() => setState((current) => ({ ...current, draftQuestionOpen: !current.draftQuestionOpen }))}
            draftQuestionOpen={state.draftQuestionOpen}
            editQuestionId={state.editQuestionId}
            deleteQuestionId={state.deleteQuestionId}
            editReplyId={state.editReplyId}
          />
        </AppFrame>
      )}
      {state.screen.route === 'review' && (
        <AppFrame active="review" onHome={openHome} onOpenStudy={openStudy}>
          <ReviewScreen decision={state.reviewDecision} onDecision={setReviewDecision} onFinish={finishReview} />
        </AppFrame>
      )}
    </TooltipProvider>
  );
}
