import type { ReactNode } from 'react';
import type { StudyTab } from '../types/demo';
import { Tooltip } from './Tooltip';

type AppFrameProps = {
  active: 'home' | 'study' | 'review';
  children: ReactNode;
  onHome: () => void;
  onOpenStudy: (tab?: StudyTab) => void;
};

export function AppFrame({ active, children, onHome, onOpenStudy }: AppFrameProps) {
  return (
    <div className="wireframe-app">
      <aside className="sidebar">
        <h1>Stology</h1>
        <Tooltip id="tip-sidebar-home" title="홈" body="홈 화면으로 돌아가 진행 중인 스터디와 활동을 확인합니다." requirement="Figma처럼 좌측 사이드바는 접히지 않고 항상 노출됩니다.">
          <button type="button" className={active === 'home' ? 'side-link active' : 'side-link'} onClick={onHome}>
            홈
          </button>
        </Tooltip>
        <p className="side-label">진행 중 스터디</p>
        <Tooltip id="tip-sidebar-study1" title="스터디1" body="스터디1의 기본 탭인 지식 구조 화면으로 이동합니다." requirement="스터디 이름 클릭은 스터디 페이지 진입점으로 동작합니다.">
          <button type="button" className={active === 'study' || active === 'review' ? 'side-link active' : 'side-link'} onClick={() => onOpenStudy('knowledge')}>
            스터디1
          </button>
        </Tooltip>
        <button type="button" className="side-link muted-link" onClick={() => onOpenStudy('records')}>스터디2</button>
        <p className="side-label">지난 활동</p>
        <button type="button" className="side-link muted-link" onClick={() => onOpenStudy('report')}>종료된 스터디</button>
      </aside>
      <main className="wireframe-main">
        <header className="top-profile">
          <span className="avatar" aria-hidden="true" />
          <strong>사용자1</strong>
        </header>
        {children}
      </main>
    </div>
  );
}
