import type { HomeModal } from '../types/demo';
import { activities, studies } from '../data/demoData';
import { Tooltip } from '../components/Tooltip';

type HomeScreenProps = {
  modal: HomeModal;
  onCreate: () => void;
  onInvite: () => void;
  onCloseModal: () => void;
  onOpenStudy: () => void;
  onEnterStudy: () => void;
};

export function HomeScreen({ modal, onCreate, onInvite, onCloseModal, onOpenStudy, onEnterStudy }: HomeScreenProps) {
  const personalActivities = activities.slice(0, 3);
  const teamActivities = activities.slice(3).concat([
    { id: 'activity-team-1', text: '사용자2가 답글1을 작성했습니다.', meta: '3주차 · 질문함' },
    { id: 'activity-team-2', text: '사용자3이 자료6을 등록했습니다.', meta: '4주차 · 대기 중' },
  ]);

  return (
    <section className="wireframe-panel home-wireframe" aria-label="홈 화면">
      <div className="page-title-row">
        <h1>홈</h1>
        <p>스터디와 최근 활동</p>
      </div>

      <Tooltip id="tip-home-study-strip" title="진행 중인 스터디" body="서비스 진입 첫 화면에서 참여 중인 스터디 카드를 가로 1열로 보여줍니다." requirement="Figma HOME001처럼 스터디 카드와 + 스터디 생성 카드가 같은 행에 있어야 합니다.">
        <section className="wire-section" tabIndex={0}>
          <h2>진행 중인 스터디</h2>
          <div className="study-strip">
            {studies.map((study, index) => (
              <button type="button" className="study-card-wire" key={study.id} onClick={onOpenStudy}>
                <strong>{study.title}</strong>
                <span>{study.week}{index === 0 ? '  NEW' : ''}</span>
                <small>{study.state}</small>
              </button>
            ))}
            <button type="button" className="study-card-wire create-card" onClick={onCreate}>
              <strong>+</strong>
              <span>스터디 생성</span>
              <small>항상 노출</small>
            </button>
          </div>
        </section>
      </Tooltip>

      <section className="activity-columns" aria-label="활동 로그">
        <Tooltip id="tip-home-personal-log" title="개인 활동 로그" body="사용자1이 최근에 수행한 자료 등록, 검토, 질문 활동을 최신순으로 보여줍니다." requirement="HOME001의 좌측 활동 영역처럼 팀 로그와 분리된 박스여야 합니다.">
          <article className="log-panel" tabIndex={0}>
            <h2>개인 활동 로그</h2>
            <ul className="wire-list compact">
              {personalActivities.map((activity) => (
                <li key={activity.id}><span>{activity.text}</span><small>{activity.meta}</small></li>
              ))}
            </ul>
          </article>
        </Tooltip>
        <Tooltip id="tip-home-team-log" title="팀원 활동 로그" body="사용자2~사용자4의 최근 답글, 자료, 검토 활동을 따로 보여줍니다." requirement="HOME001의 우측 활동 영역처럼 개인 로그와 50:50 영역으로 배치합니다.">
          <article className="log-panel" tabIndex={0}>
            <h2>팀원 활동 로그</h2>
            <ul className="wire-list compact">
              {teamActivities.map((activity) => (
                <li key={activity.id}><span>{activity.text}</span><small>{activity.meta}</small></li>
              ))}
            </ul>
          </article>
        </Tooltip>
      </section>

      {modal === 'createStudy' && (
        <div className="modal-backdrop" role="presentation" onMouseDown={onCloseModal}>
          <Tooltip id="tip-create-study-modal" title="스터디 생성 모달" body="홈의 + 스터디 생성 카드에서 새 스터디 정보를 입력하는 모달입니다." requirement="별도 화면 전환이 아니라 Figma MOD_STUDY_CREATE처럼 홈 위 모달로 떠야 합니다.">
            <section className="modal-card" role="dialog" aria-modal="true" aria-label="스터디 생성" onMouseDown={(event) => event.stopPropagation()} tabIndex={0}>
              <div className="section-heading">
                <div>
                  <p className="eyebrow">MOD_STUDY_CREATE</p>
                  <h2>스터디 생성</h2>
                </div>
                <button type="button" className="icon-button" onClick={onCloseModal}>닫기</button>
              </div>
              <div className="modal-form-grid">
                <label>스터디 이름<input value="스터디1" readOnly /></label>
                <label>스터디 설명<textarea value="자료와 질문이 이미 쌓인 데모 스터디입니다." readOnly /></label>
                <label>검토 인원 수<input value="2명" readOnly /></label>
              </div>
              <div className="button-row end">
                <button type="button" className="secondary" onClick={onCloseModal}>취소</button>
                <button type="button" onClick={onInvite}>생성하고 초대 링크 보기</button>
              </div>
            </section>
          </Tooltip>
        </div>
      )}

      {modal === 'invite' && (
        <div className="modal-backdrop" role="presentation" onMouseDown={onCloseModal}>
          <Tooltip id="tip-invite-modal" title="초대 링크 모달" body="생성 직후 초대 링크를 보여주고 스터디 자료 업로드 탭으로 진입합니다." requirement="Figma MOD_INVITE_LINK_HOME처럼 홈 맥락 위에서 링크 확인 후 스터디로 이동합니다.">
            <section className="modal-card" role="dialog" aria-modal="true" aria-label="스터디 초대" onMouseDown={(event) => event.stopPropagation()} tabIndex={0}>
              <div className="section-heading">
                <div>
                  <p className="eyebrow">MOD_INVITE_LINK_HOME</p>
                  <h2>스터디 초대</h2>
                </div>
                <button type="button" className="icon-button" onClick={onCloseModal}>닫기</button>
              </div>
              <div className="invite-box">초대 링크: /invite/스터디1</div>
              <p className="muted">실제 링크 복사나 외부 공유는 수행하지 않는 시연용 표시입니다.</p>
              <div className="button-row end">
                <button type="button" className="secondary" onClick={onCloseModal}>홈에 머물기</button>
                <button type="button" onClick={onEnterStudy}>스터디로 이동</button>
              </div>
            </section>
          </Tooltip>
        </div>
      )}
    </section>
  );
}
