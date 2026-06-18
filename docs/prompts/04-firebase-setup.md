# 04 Firebase Setup

## Scope Control

Strict

## Goal

Define the Firebase integration setup for SkillStart using Firebase Authentication and Cloud Firestore in a static Angular frontend that remains compatible with GitHub Pages testing deployment.

## Requirements

- Use Firebase Authentication.
- Use Cloud Firestore.
- Use environment-based Firebase configuration.
- Support static Angular hosting on GitHub Pages.
- Do not require a custom backend.
- Do not require Cloud Functions for MVP testing.
- Do not require SSR.
- Define the base Firestore collections:
  - `users`
  - `candidateProfiles`
  - `companyProfiles`
  - `jobPosts`
  - `applications`
  - `contactRequests`
  - `auditLogs`
- Keep room for typed Firestore document models.
- Ensure the setup supports Angular services for Firebase access.
- Keep secrets out of the repository.
- State that only public Firebase web config values may be exposed in the frontend.

## Non-goals

- Do not implement auth flows yet.
- Do not implement security rules in full detail here.
- Do not add Firebase Storage unless explicitly needed later.
- Do not introduce non-Firebase infrastructure.

## Implementation Prompt

Set up the Firebase integration foundation for SkillStart.

Follow AGENTS.md exactly.

Implement only:

- Angular Firebase initialization pattern
- environment-based Firebase config
- Firestore access foundation
- clear collection naming aligned with AGENTS.md
- GitHub Pages compatible frontend-only setup

Do not implement feature-specific Firestore logic beyond what is necessary to establish the integration structure.
