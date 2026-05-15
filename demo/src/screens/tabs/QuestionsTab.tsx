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
    <section className="panel wide">
      <div className="section-heading">
        <div><h2>질문함</h2><p>질문1~질문4와 답글1~답글6이 누적된 상태입니다.</p></div>
        <Tooltip id="tip-question-new" title="질문 작성" body="질문 작성 상태를 화면 안에서 시연합니다." requirement="질문 작성, 수정, 삭제 확인, 답글 인라인 편집 상태를 확인할 수 있어야 합니다.">
          <button type="button" onClick={onQuestionDraft}>질문 작성</button>
        </Tooltip>
      </div>
      {draftQuestionOpen && <article className="notice-box">새 질문 작성 패널 · 제목과 본문 입력 상태</article>}
      <div className="question-list">
        {questions.map((question) => (
          <article className="question-card" key={question.id}>
            <div className="section-heading">
              <div><strong>{question.title}</strong><p>{question.body}</p></div>
              <span className="status-chip">답글 {question.replies.length}</span>
            </div>
            {editQuestionId === question.id && <div className="notice-box">{question.id} 수정 중 상태</div>}
            {deleteQuestionId === question.id && <div className="notice-box">{question.id} 삭제 확인 상태</div>}
            <div className="reply-list">
              {question.replies.map((reply) => <span className="pill" key={reply}>{reply}{editReplyId === reply ? ' · 인라인 편집 중' : ''}</span>)}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
