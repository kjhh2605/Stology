import { weekRecords } from '../../data/demoData';
import { Tooltip } from '../../components/Tooltip';

export function RecordsTab() {
  return (
    <Tooltip id="tip-records" title="주차별 기록" body="주차 칩을 선택하고 주차별 자료/개념 누적 기록을 펼쳐 봅니다." requirement="STD_WEEKLY_RECORD와 STD_RECORD_OPEN처럼 리포트와 별도 탭이며 인라인 펼침 상태를 포함합니다.">
      <section className="tab-panel records-tab" tabIndex={0}>
        <div className="section-heading">
          <div><h2>주차별 기록</h2><p>기록1~기록3이 이미 누적된 상태입니다.</p></div>
          <div className="week-chips">{weekRecords.map((record) => <span className="pill" key={record.week}>{record.week}</span>)}</div>
        </div>
        <div className="record-list">
          {weekRecords.map((record, index) => (
            <article className={index === 1 ? 'record-row open' : 'record-row'} key={record.week}>
              <div><strong>{record.week} · {record.title}</strong><p>{record.summary}</p></div>
              <span className="status-chip">자료 {record.materials.length}</span>
              {index === 1 && <div className="record-expanded">자료 {record.materials.join(', ')} · 개념 {record.concepts.join(', ')}</div>}
            </article>
          ))}
        </div>
      </section>
    </Tooltip>
  );
}
