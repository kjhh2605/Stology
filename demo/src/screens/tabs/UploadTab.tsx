import { materials } from '../../data/demoData';
import { Tooltip } from '../../components/Tooltip';

export function UploadTab({ onReview }: { onReview: () => void }) {
  return (
    <section className="tab-panel upload-tab" aria-label="자료 업로드 탭">
      <Tooltip id="tip-material-input" title="자료 등록 영역" body="상단에서 파일 업로드 모양과 텍스트 직접 입력 모양, 주차, 제목, 설명, 등록 버튼을 확인합니다." requirement="STD_UPLOAD처럼 상단 40% 자료 등록 영역과 하단 60% 대기 자료 영역을 세로로 분리합니다.">
        <section className="upload-box upload-input-box" tabIndex={0}>
          <h2>상단: 자료 업로드 영역 (40%)</h2>
          <div className="upload-grid">
            <div>
              <div className="segmented"><span className="selected">파일 업로드 선택</span><span>텍스트 직접 입력</span></div>
              <div className="dropzone">드롭존 / 파일 선택<br />마크다운 파일만 가능</div>
            </div>
            <div className="upload-fields">
              <label>주차 선택<input value="4주차" readOnly /></label>
              <label>자료 제목 *<input value="자료1" readOnly /></label>
              <label>자료 설명 (선택)<textarea value="실제 업로드 없이 시연용 입력 상태만 표시합니다." readOnly /></label>
            </div>
            <button type="button" className="register-button">등록</button>
          </div>
        </section>
      </Tooltip>

      <Tooltip id="tip-material-list" title="대기 중인 자료 영역" body="업로드일, 제목, 제출자, 상태 배지를 가진 누적 자료 목록입니다." requirement="자료1~자료6의 추상 상태만 표시하고 실제 업로드나 처리 호출은 하지 않습니다.">
        <section className="upload-box waiting-box" tabIndex={0}>
          <h2>하단: 대기 중인 자료 영역 (60%)</h2>
          <div className="wire-table">
            {materials.map((material) => (
              <article className="wire-table-row" key={material.id}>
                <span>2026-03-{material.id === '자료1' ? '15' : '14'}</span>
                <strong>{material.title}</strong>
                <span>{material.ownerId}</span>
                <span className="status-chip">{material.status}</span>
                {material.id === '자료1' ? (
                  <Tooltip id="tip-review" title="검토 필요" body="자료1의 개념 후보를 AI 후보 검토 화면으로 엽니다." requirement="검토 화면은 StudyShell 내부 탭이 아니라 별도 app-level 화면이어야 합니다.">
                    <button type="button" className="secondary" onClick={onReview}>검토 필요</button>
                  </Tooltip>
                ) : <span className="muted">누적 상태</span>}
              </article>
            ))}
          </div>
        </section>
      </Tooltip>
    </section>
  );
}
