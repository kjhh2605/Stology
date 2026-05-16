import { materials, weekRecords } from '../../data/demoData';
import { Tooltip } from '../../components/Tooltip';

export function ReportTab() {
  return (
    <Tooltip id="tip-report" title="주차별 리포트" body="완료된 주차의 커버리지, 보강 필요 개념, 팀원 활동 통계를 한 화면에 보여줍니다." requirement="STD_WEEKLY_REPORT처럼 주차 선택, 요약 카드, 분포 차트, 부족 개념, 팀 통계를 포함합니다.">
      <section className="tab-panel report-tab" tabIndex={0}>
        <div className="section-heading">
          <div><h2>4주차 커버리지 리포트</h2><p>추상 자료 기준으로 이미 사용된 리포트 상태입니다.</p></div>
          <div className="week-chips">{['1주차', '2주차', '3주차', '4주차'].map((week) => <span className="pill" key={week}>{week}</span>)}</div>
        </div>
        <div className="report-grid">
          <article className="report-card summary-card"><strong>AI 요약</strong><p>개념2~개념4는 안정적으로 연결되었고 개념1은 검토 후 반영 대기 상태입니다.</p></article>
          <article className="report-card chart-card"><strong>커버리지 분포</strong><div className="bar-stack" aria-label="커버리지 분포"><span style={{ width: '45%' }}>개념</span><span style={{ width: '30%' }}>자료</span><span style={{ width: '25%' }}>질문</span></div></article>
          <article className="report-card"><strong>보강 필요 개념</strong>{['개념1', '개념5'].map((item) => <span className="pill" key={item}>{item}</span>)}</article>
          <article className="report-card"><strong>팀원 활동 통계</strong>{['사용자1 4', '사용자2 3', '사용자3 2', '사용자4 1'].map((item) => <span className="pill" key={item}>{item}</span>)}</article>
        </div>
        <div className="pill-list evidence-list">
          {weekRecords.map((record) => <span className="pill" key={record.week}>{record.week} · {record.concepts.join('/')}</span>)}
          {materials.slice(0, 4).map((material) => <span className="pill" key={material.id}>{material.id} · {material.status}</span>)}
        </div>
      </section>
    </Tooltip>
  );
}
