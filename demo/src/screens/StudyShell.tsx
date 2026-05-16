import type { Concept, StudyTab } from '../types/demo';
import { Tooltip } from '../components/Tooltip';
import { KnowledgeTab } from './tabs/KnowledgeTab';
import { UploadTab } from './tabs/UploadTab';
import { RecordsTab } from './tabs/RecordsTab';
import { ReportTab } from './tabs/ReportTab';
import { QuestionsTab } from './tabs/QuestionsTab';

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
    <section className="wireframe-panel study-wireframe" aria-label="스터디 컨테이너">
      <Tooltip id="tip-study-header" title="스터디 공통 헤더" body="스터디명, 현재 주차, 멤버, 시작일, 설정 진입점을 모든 탭 위에 고정합니다." requirement="Figma STD_CONTAINER처럼 탭 전환 시 헤더는 유지하고 본문만 교체해야 합니다.">
        <header className="study-common-header" tabIndex={0}>
          <div className="study-title-group">
            <h1>스터디1</h1>
            <span className="status-chip">4주차</span>
          </div>
          <div className="member-stack" aria-label="스터디 멤버">
            {['사용자1', '사용자2', '사용자3', '사용자4', '사용자5'].map((user) => (
              <span className="member-dot" key={user} aria-label={user} />
            ))}
            <strong>+2</strong>
          </div>
          <span className="muted">시작일 2026-03-01</span>
          <button type="button" className="settings-button" aria-label="스터디 설정">⚙</button>
        </header>
      </Tooltip>

      <nav className="tabs wire-tabs" aria-label="Study tabs">
        {tabs.map((tab) => (
          <Tooltip key={tab.id} id={`tip-tab-${tab.id}`} title={tab.label} body={`${tab.label} 화면으로 전환합니다.`} requirement="STD_CONTAINER의 탭 순서와 개수를 그대로 유지합니다.">
            <button type="button" className={props.tab === tab.id ? 'tab active' : 'tab'} onClick={() => props.onTabChange(tab.id)}>{tab.label}</button>
          </Tooltip>
        ))}
      </nav>

      <div className="study-tab-body">
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
      </div>
    </section>
  );
}
