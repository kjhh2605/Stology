import type { StudyTab } from '../types/demo';
import { Tooltip } from '../components/Tooltip';
import { KnowledgeTab } from './tabs/KnowledgeTab';
import { UploadTab } from './tabs/UploadTab';
import { RecordsTab } from './tabs/RecordsTab';
import { ReportTab } from './tabs/ReportTab';
import { QuestionsTab } from './tabs/QuestionsTab';
import type { Concept } from '../types/demo';

const tabs: { id: StudyTab; label: string }[] = [
  { id: 'knowledge', label: '지식 구조' },
  { id: 'upload', label: '자료 업로드' },
  { id: 'records', label: '주차별 기록' },
  { id: 'report', label: '주차별 리포트' },
  { id: 'questions', label: '질문함' },
];

type StudyShellProps = {
  tab: StudyTab;
  concepts: Concept[];
  onTabChange: (tab: StudyTab) => void;
  onReview: () => void;
  onQuestionDraft: () => void;
  draftQuestionOpen: boolean;
  editQuestionId: string | null;
  deleteQuestionId: string | null;
  editReplyId: string | null;
};

export function StudyShell(props: StudyShellProps) {
  return (
    <main className="study-shell">
      <header className="study-header">
        <div>
          <p className="eyebrow">스터디1 · 4주차 · 사용자1~사용자4</p>
          <h1>스터디 운영 대시보드</h1>
        </div>
        <span className="status-chip">설정은 스터디장에게만 노출</span>
      </header>
      <nav className="tabs" aria-label="Study tabs">
        {tabs.map((tab) => (
          <Tooltip key={tab.id} id={`tip-tab-${tab.id}`} title={tab.label} body={`${tab.label} 화면으로 전환합니다.`} requirement="StudyShell은 정확히 5개 탭을 유지합니다.">
            <button type="button" className={props.tab === tab.id ? 'tab active' : 'tab'} onClick={() => props.onTabChange(tab.id)}>{tab.label}</button>
          </Tooltip>
        ))}
      </nav>
      {props.tab === 'knowledge' && <KnowledgeTab concepts={props.concepts} />}
      {props.tab === 'upload' && <UploadTab onReview={props.onReview} />}
      {props.tab === 'records' && <RecordsTab />}
      {props.tab === 'report' && <ReportTab />}
      {props.tab === 'questions' && (
        <QuestionsTab
          onQuestionDraft={props.onQuestionDraft}
          draftQuestionOpen={props.draftQuestionOpen}
          editQuestionId={props.editQuestionId}
          deleteQuestionId={props.deleteQuestionId}
          editReplyId={props.editReplyId}
        />
      )}
    </main>
  );
}
