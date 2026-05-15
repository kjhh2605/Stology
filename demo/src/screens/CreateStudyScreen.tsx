export function CreateStudyScreen({ onNext, onCancel }: { onNext: () => void; onCancel: () => void }) {
  return (
    <main className="center-screen">
      <section className="panel form-panel">
        <p className="eyebrow">스터디 생성</p>
        <h1>스터디1과 같은 구조 만들기</h1>
        <label>스터디 이름<input value="스터디3" readOnly /></label>
        <label>온톨로지 템플릿<input value="템플릿1" readOnly /></label>
        <label>시작일<input value="2026-05-15" readOnly /></label>
        <label>설명<textarea value="추상 설명 문장입니다." readOnly /></label>
        <div className="button-row">
          <button type="button" onClick={onNext}>생성하기</button>
          <button type="button" className="ghost" onClick={onCancel}>홈으로</button>
        </div>
      </section>
    </main>
  );
}
