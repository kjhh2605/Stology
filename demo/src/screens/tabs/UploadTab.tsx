import { materials } from '../../data/demoData';
import { Tooltip } from '../../components/Tooltip';

export function UploadTab({ onReview }: { onReview: () => void }) {
  return (
    <section className="content-grid">
      <Tooltip id="tip-material-input" title="자료 입력" body="파일 업로드와 텍스트 입력 선택지를 보여주지만 실제 업로드는 수행하지 않습니다." requirement="파일 선택기, 브라우저 파일 읽기, 전송 객체, 네트워크 호출 없이 readOnly 데모 입력만 유지합니다.">
        <div className="panel" tabIndex={0}>
          <h2>자료 입력</h2>
          <div className="segmented"><span className="selected">파일 업로드 모양</span><span>텍스트 입력 모양</span></div>
          <div className="dropzone">실제 업로드 없이 데모용 입력 영역만 표시합니다.</div>
          <label>주차<input value="4주차" readOnly /></label>
          <label>자료 제목<input value="자료1" readOnly /></label>
        </div>
      </Tooltip>
      <Tooltip id="tip-material-list" title="자료 리스트" body="누적 자료와 현재 검토 대상 자료1의 상태를 한 번에 확인합니다." requirement="자료1~자료6의 추상 상태만 표시하고 현실적인 콘텐츠나 목데이터는 쓰지 않습니다.">
        <div className="panel wide" tabIndex={0}>
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
      </Tooltip>
    </section>
  );
}
