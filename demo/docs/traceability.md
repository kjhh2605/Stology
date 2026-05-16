# Stology Demo Traceability

| Requirement | Implementation | Verification |
|---|---|---|
| Logged-in Home starts the demo | `src/screens/HomeScreen.tsx`, `src/App.tsx` initial state | Smoke path starts at Home |
| Home → create modal → invite modal → study(upload) → review → upload → knowledge/records/report/questions | `src/App.tsx`, `src/screens/*` | Headless DOM smoke, manual flow target, build |
| Figma HOME001 left sidebar, card row, split activity logs | `src/components/AppFrame.tsx`, `src/screens/HomeScreen.tsx`, `src/styles/globals.css` | Figma `14:169` context + headless DOM check |
| Figma STD_CONTAINER fixed header and five tabs | `src/screens/StudyShell.tsx`, `src/styles/globals.css` | Figma `14:550` context + typecheck/lint/build |
| Figma STD_UPLOAD top/bottom split and AI001 review list | `src/screens/tabs/UploadTab.tsx`, `src/screens/ReviewScreen.tsx` | Figma `14:1689`, `14:2255` contexts + build |
| Figma STD_KG graph/filter structure with 3D adaptation plus node selection | `src/screens/tabs/KnowledgeTab.tsx`, `src/components/OntologyGraph3D.tsx` | Figma `14:1139` context + typecheck/lint/build |
| Graph interactions: visible links, node side panel slide-in/out, related-node highlight | `src/components/OntologyGraph3D.tsx`, `src/screens/tabs/KnowledgeTab.tsx`, `src/styles/globals.css` | TypeScript prop coverage + build |
| StudyShell has exactly five tabs | `src/screens/StudyShell.tsx` | Code inspection and smoke navigation |
| Review screen is app-level, not a tab | `src/screens/ReviewScreen.tsx`, `src/App.tsx` route `review` | Smoke review entry from `자료1` |
| Preset accumulated abstract data | `src/data/demoData.ts` | Accumulated data audit |
| 3D ontology graph with full template nodes | `src/components/OntologyGraph3D.tsx`, `src/data/demoData.ts` | Graph QA and build |
| Approval activates existing `개념1` with `자료1` evidence | `src/state/demoState.ts`, `src/App.tsx` approve handler | Review/graph QA |
| Rejection leaves `개념1` inactive | `src/state/demoState.ts`, `src/App.tsx` reject handler | Review/graph QA |
| Tooltip hover/focus/portal/collision/accessibility | `src/components/TooltipProvider.tsx`, `src/components/Tooltip.tsx` | Tooltip QA |
| White/gray skeleton only | `src/styles/tokens.css`, `src/styles/globals.css` | Grayscale grep audit |
| No backend, account flow, storage, real upload, parsing | static state and read-only demo inputs | Demo-only grep audit |
| Questions with existing questions/replies and edit/delete states | `src/screens/tabs/QuestionsTab.tsx`, `src/data/demoData.ts` | Questions smoke QA |
