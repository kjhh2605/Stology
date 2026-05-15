# Stology 프로젝트 작업 지침

이 파일은 `/Users/gnar/Desktop/Stology` 루트와 하위 폴더 전체에 적용되는 Codex/AI 에이전트용 프로젝트 관리 지침입니다. 더 하위 폴더에 별도 `AGENTS.md`가 있으면 해당 폴더에서는 하위 지침을 우선합니다. 현재 `video/AGENTS.md`가 HyperFrames 영상 작업 규칙을 별도로 정의합니다.

## 프로젝트 개요

- 프로젝트명: **Stology**
- 한 줄 소개: 스터디에서 쌓이는 다양한 자료를 활용해 체계적인 스터디 운영 플로우를 제공하는 서비스
- 핵심 컨셉: `Study + Ontology` — 흩어진 학습자료를 AI 후보 추출, 팀 검토, 공통 온톨로지 기반 지식 구조, 주차별 리포트로 연결
- 주요 산출물:
  - 제품 기획/와이어프레임 문서
  - 브랜드 이미지 에셋
  - HyperFrames 기반 60초 소개 영상

## 현재 폴더 구조

```text
.
├── README.md                         # 프로젝트 한 줄 소개 및 링크
├── AGENTS.md                         # 루트 작업 지침(현재 파일)
├── Brand_Assets/                     # 브랜드/캐릭터/커버 이미지 에셋
│   ├── notion_cover.png
│   ├── notion_cover_vertical.png
│   └── character/                    # 캐릭터 이미지 원본
├── ai-skills/                        # 프로젝트 진행 중 만든 AI 스킬 보관본
│   └── figma-pm-wireframe/
│       └── SKILL.md                  # PM 와이어프레임 제작 스킬 복제본
├── docs/                             # 제품 기획 및 화면 요구사항 문서
│   ├── 기획안.md                     # 서비스 배경, 목표, MVP 범위
│   ├── 화면설계서.md                 # PM 관점 화면 정보/와이어프레임/디스크립션 산출물
│   ├── 변경사항/합의_0514.md         # 합의/변경 이력
│   └── wire_frame_requirements/      # 화면별 와이어프레임 명세
│       ├── 00-index.md               # 문서 인덱스 및 화면 흐름
│       ├── 01-login.md
│       ├── 02-home.md
│       ├── 03-study-knowledge.md
│       ├── 04-study-upload.md
│       ├── 05-study-records.md
│       ├── 06-study-report.md
│       ├── 07-study-container.md
│       ├── 08-study-questions.md
│       └── 09-review-screen.md
├── demo/                             # React/Vite 기반 Stology 데모사이트
│   ├── docs/traceability.md          # 요구사항-구현-검증 매핑
│   ├── src/                          # 화면, 컴포넌트, 정적 데모 데이터
│   ├── package.json                  # 데모 실행/검증 명령
│   └── package-lock.json             # 데모 의존성 잠금
├── video/                            # HyperFrames 영상 프로젝트
│   ├── AGENTS.md                     # 영상 작업 전용 지침
│   ├── DESIGN.md                     # 영상 디자인 소스 오브 트루스
│   ├── index.html                    # 메인 HyperFrames 컴포지션
│   ├── package.json                  # 영상 preview/check/render/publish 명령
│   ├── assets/                       # 영상용 이미지/오디오/PDF 변환 에셋
│   └── renders/                      # 렌더링 결과물(mp4 등)
└── .omx/                             # oh-my-codex 런타임 상태/로그(수동 편집 금지)
```

## 에이전트 작업 원칙

1. **한국어 우선**: 사용자 응답, 문서 추가, 요약은 기본적으로 한국어로 작성합니다. 코드/CLI/API 명칭은 원문을 유지합니다.
2. **문서 먼저 확인**: 제품/화면 관련 작업은 아래 순서로 근거를 확인합니다.
   - `docs/기획안.md`
   - `docs/변경사항/합의_0514.md`
   - `docs/wire_frame_requirements/00-index.md`
   - 필요한 화면별 `docs/wire_frame_requirements/0X-*.md`
3. **근거 없는 기능 추가 금지**: MVP 범위나 화면 요구사항에 없는 기능/화면/정책은 임의로 추가하지 않습니다. 필요하면 “제안”으로 분리해 표시합니다.
4. **원본 에셋 보존**: `Brand_Assets/`의 원본 이미지와 `video/assets/pdf/`의 PDF 변환 이미지는 명시 요청 없이 덮어쓰지 않습니다. 파생본은 새 이름으로 저장합니다.
5. **런타임/시스템 파일 제외**: `.omx/`, `.git/`, `.DS_Store`, 임시 캐시, 빌드 산출물은 프로젝트 산출물로 취급하지 않습니다.
6. **작은 변경 선호**: 문서/영상/에셋 변경은 목적별로 작고 되돌리기 쉽게 유지합니다.
7. **검증 후 완료 보고**: 변경 후 가능한 검증을 실행하고, 실행한 명령과 결과를 짧게 보고합니다.
8. **폴더 구조 변경 시 문서 갱신**: 새 폴더/주요 파일을 추가하거나 기존 폴더 역할을 바꾸면, 같은 작업 안에서 이 `AGENTS.md`의 `현재 폴더 구조`와 관련 작업 규칙도 반드시 함께 수정합니다.

## 문서 작업 규칙

- 새 제품 문서는 `docs/` 아래에 둡니다.
- 화면 단위 요구사항은 `docs/wire_frame_requirements/`에 `NN-kebab-name.md` 형식으로 추가합니다.
- 기존 화면의 파생 모달/팝업/인라인 상태는 가능하면 해당 화면 문서 안에 함께 정리합니다.
- 화면 목록이나 흐름을 바꾸면 `docs/wire_frame_requirements/00-index.md`도 함께 갱신합니다.
- 변경 합의나 결정 기록은 날짜가 보이도록 `docs/변경사항/` 아래에 남깁니다.
- 문서에서는 Stology 핵심 용어를 일관되게 사용합니다.
  - `Stology`, `Study + Ontology`, `온톨로지`, `자료`, `지식 구조`, `노드`, `그래프`, `Evidence`, `검토`, `합의`, `주차별 리포트`

## 제품 범위 참고

MVP의 핵심 흐름은 다음과 같습니다.

1. 카카오 소셜 로그인
2. 스터디 생성 및 초대 링크 공유
3. 학습자료 입력: 마크다운 파일 업로드, 텍스트 직접 입력
4. AI 개념 후보 추출
5. GitHub PR 방식 참고 팀 검토: 승인/반려
6. 승인된 후보를 공통 온톨로지 기반 지식 구조에 반영
7. 질문함 관리
8. 주차별 커버리지 리포트 생성

MVP에서 보류된 범위는 외부 문서 연동, Notion/Google Docs/Discord/Slack 연동, 사용자 온톨로지 직접 수정, 별도 설정 화면 등입니다.

## 영상 작업 규칙

`video/` 아래 파일을 수정할 때는 반드시 `video/AGENTS.md`와 `video/DESIGN.md`를 함께 따릅니다.

주요 명령:

```bash
cd video
npm run dev       # HyperFrames preview
npm run check     # lint + validate + inspect
npm run render    # MP4 render
npm run publish   # publish
```

영상 작업 완료 기준:

- `.html` 컴포지션 수정 후 `npm run check` 실행
- 렌더 결과가 필요한 작업이면 `npm run render` 실행
- 실제 MP4 길이/주요 프레임 검수가 필요한 경우 `ffprobe` 및 프레임 추출로 확인
- `video/renders/`의 기존 결과물은 명시 요청 없이 삭제/덮어쓰기 금지

## 데모사이트 작업 규칙

`demo/`는 로그인/백엔드 없이 Stology 핵심 화면 흐름을 체험하기 위한 정적 React 데모입니다.

주요 명령:

```bash
cd demo
npm install       # 최초 의존성 설치
npm run dev       # 로컬 미리보기
npm run typecheck # TypeScript 검사
npm run lint      # ESLint 검사
npm run build     # 프로덕션 빌드
```

데모 작업 기준:

- 로그인은 구현하지 않고 로그인된 Home 화면에서 시작합니다.
- 백엔드 API, 브라우저 저장소, 실제 파일 업로드/파싱은 추가하지 않습니다.
- 데모 데이터는 `사용자1`, `스터디1`, `자료1`, `개념1`처럼 추상 명칭만 사용합니다.
- 시각 스타일은 화이트/그레이 스켈레톤으로 유지하고 의미 색상은 쓰지 않습니다.
- 주요 화면/상호작용 컴포넌트에는 서비스 기능과 개발/디자인 요구사항을 담은 hover/focus 말풍선을 유지합니다.
- 3D 온톨로지 그래프는 `react-force-graph-3d` 기반으로 유지하되 그래프 직접 편집 기능은 추가하지 않습니다.
- `demo/node_modules/`, `demo/dist/`, `*.tsbuildinfo`는 산출물로 커밋하지 않습니다.

## Git/커밋 지침

- 사용자 요청 없이 커밋하지 않습니다.
- 커밋이 필요한 경우 메시지는 Lore Commit Protocol 형식을 따릅니다.
- `.DS_Store`, 임시 파일, 런타임 로그, 불필요한 렌더 산출물이 커밋에 섞이지 않게 확인합니다.

## 빠른 참조

- 전체 서비스 기획: `docs/기획안.md`
- PM 화면설계서: `docs/화면설계서.md`
- 화면 목록/흐름: `docs/wire_frame_requirements/00-index.md`
- 데모사이트: `demo/`
- 데모 요구사항 추적: `demo/docs/traceability.md`
- 영상 디자인 기준: `video/DESIGN.md`
- 영상 구현 규칙: `video/AGENTS.md`
- 영상 메인 파일: `video/index.html`
- 브랜드 이미지: `Brand_Assets/`
