import { questions } from '../../data/demoData';
import { Tooltip } from '../../components/Tooltip';

type QuestionsTabProps = {
  onQuestionDraft: () => void;
  draftQuestionOpen: boolean;
  editQuestionId: string | null;
  deleteQuestionId: string | null;
  editReplyId: string | null;
};

export function QuestionsTab({ onQuestionDraft, draftQuestionOpen, editQuestionId, deleteQuestionId, editReplyId }: QuestionsTabProps) {
  return (
    <section className="tab-panel questions-tab">
      <div className="section-heading">
        <div><h2>질문함</h2><p>질문1~질문4와 답글1~답글6이 누적된 상태입니다.</p></div>
        <Tooltip id="tip-question-new" title="질문 작성" body="질문 작성 모달 상태를 스터디 화면 안에서 시연합니다." requirement="MOD_QNA_CREATE처럼 질문 작성은 목록 위 모달/패널 상태로 확인 가능해야 합니다.">
          <button type="button" onClick={onQuestionDraft}>질문 작성</button>
        </Tooltip>
      </div>
      {draftQuestionOpen && <article className="notice-box modal-like">질문 작성 패널 · 제목과 본문 입력 상태</article>}
      <Tooltip id="tip-question-list" title="질문 목록" body="질문 펼침, 질문 수정, 삭제 확인, 답글 인라인 편집 상태를 한 화면에서 확인합니다." requirement="STD_QNA_OPEN, MOD_QNA_EDIT, STD_REPLY_EDIT, MOD_DELETE_CONFIRM 상태를 정적 데모로 포함합니다.">
        <div className="question-list" tabIndex={0}>
          {questions.map((question, index) => (
            <article className={index === 0 ? 'question-card open' : 'question-card'} key={question.id}>
              <div className="section-heading">
                <div><strong>{question.title}</strong><p>{question.body}</p></div>
                <span className="status-chip">답글 {question.replies.length}</span>
              </div>
              {index === 0 && <div className="notice-box">게시글 펼침 상태 · 본문과 답글 목록 표시</div>}
              {editQuestionId === question.id && <div className="notice-box">{question.id} 수정 중 상태</div>}
              {deleteQuestionId === question.id && <div className="notice-box">{question.id} 삭제 확인 상태</div>}
              <div className="reply-list">
                {question.replies.map((reply) => <span className="pill" key={reply}>{reply}{editReplyId === reply ? ' · 인라인 편집 중' : ''}</span>)}
              </div>
            </article>
          ))}
        </div>
      </Tooltip>
    </section>
  );
}
