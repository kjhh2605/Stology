import { Tooltip } from '../components/Tooltip';

export function InviteScreen({ onEnterStudy }: { onEnterStudy: () => void }) {
  return (
    <main className="center-screen">
      <Tooltip id="tip-invite-link" title="초대 링크" body="스터디 생성 후 팀원을 초대하는 링크 확인 단계를 시연합니다." requirement="링크는 서버 발급값이 아니라 데모용 정적 문자열이어야 합니다.">
        <section className="panel form-panel" tabIndex={0}>
          <p className="eyebrow">초대 링크</p>
          <h1>초대 링크가 준비되었습니다</h1>
          <output className="invite-box">stology.local/invite/0001</output>
          <p>서버 발급이 아닌 데모용 정적 문자열입니다.</p>
          <button type="button" onClick={onEnterStudy}>자료 업로드 탭으로 이동</button>
        </section>
      </Tooltip>
    </main>
  );
}
