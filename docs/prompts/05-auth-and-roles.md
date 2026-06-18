# 05 Auth And Roles

## Scope Control

Strict

## Goal

Define the authentication, role handling and route protection flows for SkillStart using Firebase Authentication and Firestore-backed role data.

## Requirements

- Implement these auth flows:
  - candidate registration
  - company registration
  - login
  - logout
  - password reset
  - auth state persistence
- Use the technical roles:
  - `candidate`
  - `company`
  - `admin`
- Always read the role from `users/{uid}`.
- If the user document is missing, block access and show an error state.
- If the role is unknown, block access and show an error state.
- Implement role-based redirects after login:
  - `candidate` -> candidate dashboard
  - `company` -> company dashboard
  - `admin` -> admin dashboard
- Define and use these Angular guards:
  - `authGuard`
  - `roleGuard`
  - `publicOnlyGuard`
- Candidate registration must create:
  - Firebase Auth user
  - `users/{uid}` document
  - `candidateProfiles/{uid}` initial document
- Company registration must create:
  - Firebase Auth user
  - `users/{uid}` document
  - `companyProfiles/{uid}` initial document
- Initial profile `reviewStatus` must be `draft`.
- Keep the implementation compatible with mobile-first form flows.

## Non-goals

- Do not add social login.
- Do not add MFA, SSO, magic links or passkeys.
- Do not implement profile editing beyond registration bootstrap.
- Do not implement admin review screens here.

## Implementation Prompt

Implement the authentication and role system for SkillStart.

Follow AGENTS.md exactly.

Implement only:

- registration flows for candidates and companies
- login, logout and password reset
- Firestore-backed role handling
- auth state management
- route guards
- role-based redirects

Do not infer roles from routes or UI state.
Use strict scope and keep the implementation minimal, typed and secure.
