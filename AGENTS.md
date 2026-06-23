# SkillStart Agent Rules

## Purpose

SkillStart is an Angular 20 and Firebase frontend-only platform for apprentices and junior professionals after graduation. Work must reflect the real repository state, not assumptions or desired architecture.

## Operating Principle

Be autonomous by default. Inspect relevant files, make the smallest correct change, update affected documentation, run verification, and report the result. Ask only when blocked by missing credentials, destructive ambiguity, or conflicting requirements.

When writing texts in German never use oe ue ae as replacements for ä ö ü

## Required Context

Always read first:

* `AGENTS.md`
* `docs/CODEX_CONTEXT.md` if present

Read additional docs only when their topic is affected:

* `docs/PROJECT_CONTEXT.md` for product direction or target-group questions
* `docs/PROJECT_STATE.md` for implemented/partial/missing feature status
* `docs/ARCHITECTURE.md` for structure, services, guards, providers, routing, or app architecture
* `docs/ROUTES.md` for route changes
* `docs/DATA_MODEL.md` for models, roles, Firestore collections, profile fields, job posts, or permissions
* `docs/FIREBASE.md` for Auth, Firestore, rules, environments, Firebase config, or deployment
* `docs/DESIGN_SYSTEM.md` for UI, layout, responsive behaviour, visual tokens, or component styling
* `docs/DECISIONS.md` for architecture or product decisions
* `docs/TODO.md` for known gaps and risks
* `docs/linux-compatible-commands.md` only when command compatibility matters

Do not bulk-read documentation that is unrelated to the task.

## Core Rules

* Inspect existing code before editing.
* Do not invent architecture, files, services, routes, roles, or backend behaviour.
* Do not add backend/server logic unless explicitly requested.
* Do not commit secrets.
* Use `pnpm` for install, build, test, and scripts.
* Use normal `git` commands. Do not use GitHub CLI unless explicitly requested.
* Prefer `rg` for search.
* Keep changes scoped to the requested task.
* Preserve existing local changes. Never discard or overwrite them silently.
* Mention placeholders, partial implementations, and risks when relevant.

## Branch Workflow

* Before work: run `git status`.
* For every new implementation task: create a new branch.
* Branch name format: `codex/<short-task-name>`.
* Do not work directly on `master` unless the user explicitly requests it.
* Do not merge branches.
* Do not push unless requested.

## Documentation Rules

Update documentation only when the task changes the documented subject.

Update:

* `docs/PROJECT_STATE.md` for feature status, new behaviour, removed behaviour, or new risks
* `docs/ARCHITECTURE.md` for structure, services, guards, providers, routing, or project layout
* `docs/ROUTES.md` for route additions, removals, redirects, guards, or page mapping
* `docs/DATA_MODEL.md` for fields, collections, roles, Firestore documents, permissions, or validation
* `docs/FIREBASE.md` for Auth, Firestore, rules, environments, deployment, Firebase config, or hosting
* `docs/DESIGN_SYSTEM.md` for UI system, tokens, layout rules, reusable styles, or responsive patterns
* `docs/DECISIONS.md` for new technical or product decisions
* `docs/TODO.md` when known gaps are created, changed, or closed
* `docs/CHANGELOG_INTERNAL.md` after completed implementation work

Do not update every documentation file by default.

## UI Work

For UI, layout, responsive, or UX tasks, use the relevant installed skills when available:

* `cleanui` for clean, non-generic UI decisions
* `ui-ux-pro-max` for stronger visual direction and UX refinement
* `build-web-apps:frontend-app-builder` for larger frontend implementations or redesigns
* `build-web-apps:frontend-testing-debugging` and browser inspection for visual checks and regressions

UI changes must consider mobile and larger screens.

## Firebase and Security

* Firebase is used directly from Angular.
* The repository is frontend-only.
* Do not introduce Cloud Functions, backend APIs, or server-side assumptions unless requested.
* Treat Firestore rules as security-critical.
* If multiple rules files exist or the live console state may differ, state the risk clearly.
* Never expose private credentials.
* Public Firebase web config is not a secret; security must be enforced by Firebase Auth and Firestore Rules.

## Angular Rules

* Use Angular standalone patterns.
* Respect strict TypeScript and strict Angular template checking.
* Prefer typed services and models over loose object access.
* Keep feature code inside the existing feature/core/shared structure.
* Do not add global state libraries unless explicitly requested.
* Do not add SSR unless explicitly requested.

## Command Rules

Use Linux-compatible commands where possible, even on Windows shells. Prefer:

* `rg` for search
* `git status`
* `git checkout -b`
* `pnpm install`
* `pnpm run build`
* `pnpm run test`
* `pnpm run verify` if available

Do not use PowerShell-specific alternatives unless necessary.

## Verification

After code changes, run the smallest useful verification:

* Type/model/service changes: typecheck or build
* UI/template changes: build
* test-related changes: relevant tests
* deployment changes: build and inspect workflow impact
* documentation-only changes: no build required unless linked to code behaviour

If verification cannot run, explain why.

## Final Response

Keep the final response short and factual:

* Branch
* Changed code files
* Changed documentation files
* Verification result
* Remaining risks or follow-up

Do not include long explanations unless the task requires them.
