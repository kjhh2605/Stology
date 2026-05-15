import { materials } from '../../data/demoData';
import { Tooltip } from '../../components/Tooltip';

export function UploadTab({ onReview }: { onReview: () => void }) {
  return (
    <section className="content-grid">
      <div className="panel">
        <h2>자료 입력</h2>
        <div className="segmented"><span className="selected">파일 업로드 모양</span><span>텍스트 입력 모양</span></div>
        <div className="dropzone">실제 업로드 없이 데모용 입력 영역만 표시합니다.</div>
        <label>주차<input value="4주차" readOnly /></label>
        <label>자료 제목<input value="자료1" readOnly /></label>
      </div>
      <div className="panel wide">
        <h2>대기 중인 자료 리스트</h2>
        <div className="table-list">
          {materials.map((material) => (
            <article className="row-card" key={material.id}>
              <div><strong>{material.title}</strong><span>{material.week} · {material.ownerId}</span></div>
              <span className="status-chip">{material.status}</span>
              {material.id === '자료1' ? (
                <Tooltip id="tip-review" title="자료1 검토" body="자료1의 개념1 후보를 전체 화면 검토로 엽니다." requirement="ReviewScreen은 StudyShell 탭이 아닌 app-level 화면입니다.">
                  <button type="button" onClick={onReview}>검토하기</button>
                </Tooltip>
              ) : <span className="muted">누적 상태</span>}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
