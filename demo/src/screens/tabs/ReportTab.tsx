import { materials, weekRecords } from '../../data/demoData';
import { Tooltip } from '../../components/Tooltip';

export function ReportTab() {
  return (
    <Tooltip id="tip-report" title="주차별 리포트" body="활성화 노드, 보강 항목, 팀원 활동을 요약합니다." requirement="차트는 색 대신 패턴, 밀도, 라벨로 상태를 표현합니다.">
      <section className="content-grid" tabIndex={0}>
        <div className="panel wide">
          <h2>4주차 커버리지 리포트</h2>
          <div className="metric-grid">
            <span className="metric">활성화 노드 3</span>
            <span className="metric">신규 후보 1</span>
            <span className="metric">보강 필요 2</span>
          </div>
          <div className="bar-stack" aria-label="팀원 활동 누적 막대">
            <span style={{ width: '42%' }}>사용자1</span><span style={{ width: '28%' }}>사용자2</span><span style={{ width: '18%' }}>사용자3</span><span style={{ width: '12%' }}>사용자4</span>
          </div>
          <p>AI 요약: 추상 누적 자료 기준으로 개념2~개념4가 안정적으로 연결되었고 개념1 검토가 필요합니다.</p>
        </div>
        <aside className="panel">
          <h2>리포트 근거</h2>
          {weekRecords.map((record) => <span className="pill" key={record.week}>{record.week} · {record.concepts.join('/')}</span>)}
          {materials.map((material) => <span className="pill" key={material.id}>{material.id} · {material.status}</span>)}
        </aside>
      </section>
    </Tooltip>
  );
}
