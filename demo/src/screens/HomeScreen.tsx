import { activities, studies } from '../data/demoData';
import { Tooltip } from '../components/Tooltip';

export function HomeScreen({ onCreate, onOpenStudy }: { onCreate: () => void; onOpenStudy: () => void }) {
  return (
    <main className="page-grid">
      <section className="hero-panel">
        <p className="eyebrow">로그인된 데모 홈</p>
        <h1>Stology 운영 흐름</h1>
        <p>누적 자료와 질문이 있는 스터디를 바로 둘러보고, 새 스터디 생성 흐름도 확인합니다.</p>
        <div className="button-row">
          <Tooltip id="tip-home-create" title="스터디 생성" body="새 스터디 생성 화면으로 이동합니다." requirement="초기 화면은 인증 화면이 아니라 Home이어야 합니다.">
            <button type="button" onClick={onCreate}>새 스터디 생성</button>
          </Tooltip>
          <Tooltip id="tip-home-study" title="스터디 카드" body="기존 스터디1로 이동합니다." requirement="이미 사용한 흔적이 있는 카드와 활동 로그를 표시합니다.">
            <button type="button" className="secondary" onClick={onOpenStudy}>스터디1 열기</button>
          </Tooltip>
        </div>
      </section>
      <Tooltip id="tip-home-studies" title="참여 스터디" body="이미 사용 중인 스터디1과 보관된 스터디2를 함께 보여줍니다." requirement="사용된 듯한 누적 상태를 추상 명칭으로만 표현해야 합니다.">
        <section className="panel" tabIndex={0}>
          <h2>참여 스터디</h2>
          <div className="card-list">
            {studies.map((study) => (
              <article className="card" key={study.id}>
                <strong>{study.title}</strong>
                <span>{study.state} · {study.week}</span>
                <small>{study.members.join(' / ')}</small>
              </article>
            ))}
          </div>
        </section>
      </Tooltip>
      <Tooltip id="tip-home-activity" title="활동 로그" body="자료 등록, 검토 요청, 답글, 노드 활성화 같은 최근 활동을 요약합니다." requirement="백엔드 타임라인이 아니라 정적 preset-material-flow 데이터로 구성합니다.">
        <section className="panel wide" tabIndex={0}>
          <h2>활동 로그</h2>
          <ul className="timeline">
            {activities.map((activity) => (
              <li key={activity.id}><span>{activity.text}</span><small>{activity.meta}</small></li>
            ))}
          </ul>
        </section>
      </Tooltip>
    </main>
  );
}
