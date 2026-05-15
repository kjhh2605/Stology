import type { Activity, Concept, ConceptLink, Material, Question, User, WeekRecord } from '../types/demo';

export const users: User[] = ['사용자1', '사용자2', '사용자3', '사용자4'].map((label, index) => ({
  id: `user-${index + 1}`,
  label,
}));

export const studies = [
  { id: 'study-1', title: '스터디1', state: '진행 중', members: users.map((user) => user.label), week: '4주차' },
  { id: 'study-2', title: '스터디2', state: '종료됨', members: ['사용자1', '사용자3'], week: '기록 보관' },
];

export const materials: Material[] = [
  { id: '자료1', title: '자료1', week: '4주차', ownerId: '사용자1', status: '검토 필요', summary: '추상 자료에서 개념1 후보가 추출되었습니다.', evidenceConceptIds: ['개념1'] },
  { id: '자료2', title: '자료2', week: '1주차', ownerId: '사용자2', status: '승인됨', summary: '개념2를 활성화한 누적 자료입니다.', evidenceConceptIds: ['개념2'] },
  { id: '자료3', title: '자료3', week: '2주차', ownerId: '사용자3', status: '승인됨', summary: '개념3을 활성화한 누적 자료입니다.', evidenceConceptIds: ['개념3'] },
  { id: '자료4', title: '자료4', week: '3주차', ownerId: '사용자4', status: '승인됨', summary: '개념4를 활성화한 누적 자료입니다.', evidenceConceptIds: ['개념4'] },
  { id: '자료5', title: '자료5', week: '4주차', ownerId: '사용자2', status: '추출 실패', summary: '추출 실패 상태를 보여주는 추상 자료입니다.', evidenceConceptIds: [] },
  { id: '자료6', title: '자료6', week: '4주차', ownerId: '사용자3', status: '대기 중', summary: '처리 대기 상태를 보여주는 추상 자료입니다.', evidenceConceptIds: [] },
];

export const baseConcepts: Concept[] = Array.from({ length: 8 }, (_, index) => {
  const id = `개념${index + 1}`;
  const initiallyActive = ['개념2', '개념3', '개념4'].includes(id);
  return {
    id,
    label: id,
    active: initiallyActive,
    stateLabel: initiallyActive ? '누적 활성' : id === '개념1' ? '검토 후보' : '템플릿 대기',
    evidenceIds: initiallyActive ? [`자료${index + 1}`] : [],
  };
});

export const conceptLinks: ConceptLink[] = [
  { source: '개념1', target: '개념2', label: '연결1' },
  { source: '개념2', target: '개념3', label: '연결2' },
  { source: '개념3', target: '개념4', label: '연결3' },
  { source: '개념4', target: '개념5', label: '연결4' },
  { source: '개념2', target: '개념6', label: '연결5' },
  { source: '개념6', target: '개념7', label: '연결6' },
  { source: '개념7', target: '개념8', label: '연결7' },
];

export const questions: Question[] = [
  { id: '질문1', title: '질문1', body: '추상 질문 본문1입니다.', replies: ['답글1', '답글2'] },
  { id: '질문2', title: '질문2', body: '추상 질문 본문2입니다.', replies: ['답글3'] },
  { id: '질문3', title: '질문3', body: '추상 질문 본문3입니다.', replies: ['답글4', '답글5'] },
  { id: '질문4', title: '질문4', body: '추상 질문 본문4입니다.', replies: ['답글6'] },
];

export const activities: Activity[] = [
  { id: 'activity-1', text: '사용자1이 자료1 검토를 요청했습니다.', meta: '4주차 · 검토 필요' },
  { id: 'activity-2', text: '사용자2가 자료2를 등록했습니다.', meta: '1주차 · 승인됨' },
  { id: 'activity-3', text: '사용자3이 질문3에 답글5를 남겼습니다.', meta: '3주차 · 질문함' },
  { id: 'activity-4', text: '사용자4가 자료4로 개념4를 활성화했습니다.', meta: '3주차 · 지식 구조' },
];

export const weekRecords: WeekRecord[] = [
  { week: '1주차', title: '기록1', summary: '자료2와 개념2가 누적되었습니다.', materials: ['자료2'], concepts: ['개념2'] },
  { week: '2주차', title: '기록2', summary: '자료3과 개념3이 누적되었습니다.', materials: ['자료3'], concepts: ['개념3'] },
  { week: '3주차', title: '기록3', summary: '자료4와 개념4가 누적되었습니다.', materials: ['자료4'], concepts: ['개념4'] },
];
