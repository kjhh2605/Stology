import type { ReviewDecision } from '../types/demo';
import { Tooltip } from '../components/Tooltip';

type ReviewScreenProps = {
  decision: ReviewDecision;
  onDecision: (decision: ReviewDecision) => void;
  onFinish: () => void;
};

export function ReviewScreen({ decision, onDecision, onFinish }: ReviewScreenProps) {
  const progressLabel = decision ? '1/1 검토 완료' : '0/1 검토 중';

  return (
    <section className="wireframe-panel review-wireframe" aria-label="AI 후보 검토 화면">
      <Tooltip id="tip-review-banner" title="자료 검토 배너" body="검토 대상 자료의 제목, 업로더, 업로드일, 주차와 사용자의 검토 진행률을 보여줍니다." requirement="Figma AI001처럼 상단 고정 배너와 진행률 막대가 먼저 보여야 합니다.">
        <header className="review-banner" tabIndex={0}>
          <div>
            <strong>자료1 / 업로더 사용자1 / 업로드일 2026-03-15 / 4주차</strong>
            <div className="progress-track" aria-label={progressLabel}><span style={{ width: decision ? '100%' : '35%' }} /></div>
          </div>
          <b>{progressLabel}</b>
        </header>
      </Tooltip>

      <div className="review-list">
        <Tooltip id="tip-review-candidate-1" title="노드 후보 카드" body="개념 후보마다 체크박스 모양, 후보명, AI 매칭 근거, 현재 리뷰어 상태를 함께 보여줍니다." requirement="원본 자료 분할, 후보 수정, 코멘트 작성은 제공하지 않고 승인/반려만 제공해야 합니다.">
          <article className={decision ? 'candidate-card selected-state' : 'candidate-card'} tabIndex={0}>
            <span className="check-box" aria-hidden="true">□</span>
            <div className="candidate-main">
              <strong>노드 후보 1: 개념1</strong>
              <p>AI 매칭 근거: 자료1에서 개념1과 연결1 후보를 추출함</p>
            </div>
            <div className="reviewer-state">
              <strong>{decision === 'reject' ? '반려 선택됨' : '현재 상태: 2/N명 승인'}</strong>
              <small>승인자: 사용자1, 사용자2</small>
              <small>반려자: {decision === 'reject' ? '사용자1' : '-'}</small>
            </div>
            <div className="candidate-actions">
              <button type="button" className={decision === 'approve' ? 'active-choice' : 'secondary'} onClick={() => onDecision('approve')}>승인</button>
              <button type="button" className={decision === 'reject' ? 'active-choice' : 'secondary'} onClick={() => onDecision('reject')}>반려</button>
            </div>
          </article>
        </Tooltip>

        {['개념2', '개념3'].map((concept, index) => (
          <article className="candidate-card muted-candidate" key={concept}>
            <span className="check-box" aria-hidden="true">□</span>
            <div className="candidate-main">
              <strong>노드 후보 {index + 2}: {concept}</strong>
              <p>이미 누적 승인된 비교 후보입니다.</p>
            </div>
            <div className="reviewer-state">
              <strong>현재 상태: 2/N명 승인</strong>
              <small>승인자: 사용자2, 사용자3</small>
              <small>반려자: -</small>
            </div>
            <div className="candidate-actions"><span className="status-chip">누적 상태</span></div>
          </article>
        ))}
      </div>

      <Tooltip id="tip-review-footer" title="검토 하단 액션" body="전체 승인, 선택 일괄 처리, 검토 마치기 액션을 하단 고정 영역에 제공합니다." requirement="사용자가 후보 선택을 마친 뒤 검토 마치기로 자료 업로드 탭에 복귀해야 합니다.">
        <footer className="review-footer" tabIndex={0}>
          <button type="button" className="secondary" onClick={() => onDecision('approve')}>전체 승인</button>
          <button type="button" className="secondary" onClick={() => onDecision(decision ?? 'approve')}>선택 일괄 처리</button>
          <button type="button" onClick={onFinish} disabled={!decision}>검토 마치기</button>
        </footer>
      </Tooltip>
    </section>
  );
}
