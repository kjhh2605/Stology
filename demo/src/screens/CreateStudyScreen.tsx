import { Tooltip } from '../components/Tooltip';

export function CreateStudyScreen({ onNext, onCancel }: { onNext: () => void; onCancel: () => void }) {
  return (
    <main className="center-screen">
      <Tooltip id="tip-create-study" title="스터디 생성" body="스터디명, 템플릿, 시작일을 확인하고 초대 링크 화면으로 이어지는 생성 플로우입니다." requirement="실제 저장/API 없이 readOnly 정적 입력과 화면 전환만 제공해야 합니다.">
        <section className="panel form-panel" tabIndex={0}>
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
      </Tooltip>
    </main>
  );
}
