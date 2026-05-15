import { weekRecords } from '../../data/demoData';
import { Tooltip } from '../../components/Tooltip';

export function RecordsTab() {
  return (
    <Tooltip id="tip-records" title="주차별 기록" body="최소 3주차 이상의 누적 기록을 확인합니다." requirement="리포트와 별도 탭으로 접근 가능해야 합니다.">
      <section className="panel wide" tabIndex={0}>
        <h2>주차별 기록</h2>
        <div className="card-list three">
          {weekRecords.map((record) => (
            <article className="card" key={record.week}>
              <strong>{record.week} · {record.title}</strong>
              <p>{record.summary}</p>
              <small>자료 {record.materials.join(', ')} · 개념 {record.concepts.join(', ')}</small>
            </article>
          ))}
        </div>
      </section>
    </Tooltip>
  );
}
