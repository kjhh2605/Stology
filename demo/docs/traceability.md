# Stology Demo Traceability

| Requirement | Implementation | Verification |
|---|---|---|
| Logged-in Home starts the demo | `src/screens/HomeScreen.tsx`, `src/App.tsx` initial state | Smoke path starts at Home |
| Home → create → invite → study(upload) → review → knowledge → records → report → questions | `src/App.tsx`, `src/screens/*` | Manual smoke flow and build |
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
