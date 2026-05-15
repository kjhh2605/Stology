export function InviteScreen({ onEnterStudy }: { onEnterStudy: () => void }) {
  return (
    <main className="center-screen">
      <section className="panel form-panel">
        <p className="eyebrow">초대 링크</p>
        <h1>초대 링크가 준비되었습니다</h1>
        <output className="invite-box">stology.local/invite/0001</output>
        <p>서버 발급이 아닌 데모용 정적 문자열입니다.</p>
        <button type="button" onClick={onEnterStudy}>자료 업로드 탭으로 이동</button>
      </section>
    </main>
  );
}
