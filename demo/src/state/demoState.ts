import type { AppScreen, Concept, DemoState, StudyTab } from '../types/demo';
import { baseConcepts } from '../data/demoData';

export const initialState: DemoState = {
  screen: { route: 'home' },
  homeModal: null,
  reviewDecision: null,
  approvedConceptIds: [],
  rejectedConceptIds: [],
  draftQuestionOpen: false,
  editQuestionId: '질문2',
  deleteQuestionId: '질문4',
  editReplyId: '답글3',
};

export const studyScreen = (tab: StudyTab): AppScreen => ({ route: 'study', tab });

export function deriveConcepts(state: DemoState): Concept[] {
  return baseConcepts.map((concept) => {
    if (concept.id === '개념1' && state.approvedConceptIds.includes('개념1')) {
      return { ...concept, active: true, stateLabel: '승인 활성', evidenceIds: ['자료1'] };
    }
    if (concept.id === '개념1' && state.rejectedConceptIds.includes('개념1')) {
      return { ...concept, active: false, stateLabel: '반려 비활성', evidenceIds: [] };
    }
    return concept;
  });
}
