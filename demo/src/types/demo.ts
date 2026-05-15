export type DemoRoute = 'home' | 'createStudy' | 'invite' | 'study' | 'review';
export type StudyTab = 'knowledge' | 'upload' | 'records' | 'report' | 'questions';

export type AppScreen =
  | { route: 'home' }
  | { route: 'createStudy' }
  | { route: 'invite' }
  | { route: 'study'; tab: StudyTab }
  | { route: 'review'; materialId: '자료1' };

export type User = { id: string; label: string };
export type MaterialStatus = '검토 필요' | '승인됨' | '반려됨' | '수정 필요' | '추출 실패' | '대기 중';
export type Material = {
  id: string;
  title: string;
  week: string;
  ownerId: string;
  status: MaterialStatus;
  summary: string;
  evidenceConceptIds: string[];
};

export type Concept = {
  id: string;
  label: string;
  active: boolean;
  stateLabel: string;
  evidenceIds: string[];
};

export type ConceptLink = { source: string; target: string; label: string };
export type Question = { id: string; title: string; body: string; replies: string[] };
export type Activity = { id: string; text: string; meta: string };
export type WeekRecord = { week: string; title: string; summary: string; materials: string[]; concepts: string[] };

export type DemoState = {
  screen: AppScreen;
  approvedConceptIds: string[];
  rejectedConceptIds: string[];
  draftQuestionOpen: boolean;
  editQuestionId: string | null;
  deleteQuestionId: string | null;
  editReplyId: string | null;
};
