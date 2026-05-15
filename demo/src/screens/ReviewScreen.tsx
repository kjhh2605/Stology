import { Tooltip } from '../components/Tooltip';

export function ReviewScreen({ onApprove, onReject }: { onApprove: () => void; onReject: () => void }) {
  return (
    <main className="review-screen">
      <section className="panel review-panel">
        <p className="eyebrow">자료1 검토 화면</p>
        <h1>개념 후보 검토</h1>
        <article className="candidate-card">
          <strong>개념1</strong>
          <p>자료1에서 추출된 추상 후보입니다. 승인하면 기존 온톨로지 노드가 활성화되고 근거가 자료1로 기록됩니다.</p>
          <span className="status-chip">현재 검토 후보</span>
        </article>
        <div className="button-row">
          <Tooltip id="tip-approve" title="승인" body="개념1을 활성 노드로 확정합니다." requirement="승인 후 지식 구조 탭으로 이동하고 evidenceIds에 자료1이 표시됩니다.">
            <button type="button" onClick={onApprove}>승인하고 완료</button>
          </Tooltip>
          <Tooltip id="tip-reject" title="반려" body="개념1을 비활성 상태로 유지합니다." requirement="반려 상태도 색이 아닌 라벨과 패턴으로 표현합니다.">
            <button type="button" className="secondary" onClick={onReject}>반려하고 완료</button>
          </Tooltip>
        </div>
      </section>
    </main>
  );
}
