# 01 Project Setup

## Scope Control

Strict

## Goal

Define how to set up the Angular project structure, core architecture and foundational configuration for the SkillStart MVP without implementing feature logic beyond the setup scope.

## Requirements

- Use Angular with TypeScript.
- Follow the feature-based structure from AGENTS.md.
- Include these top-level app areas:
  - `core`
  - `shared`
  - `features`
  - `models`
  - `firebase`
- Prepare for:
  - Angular Routing
  - Angular Reactive Forms
  - Firebase Authentication
  - Cloud Firestore
  - mobile-first UI
  - PWA-ready architecture
- Keep business logic out of components.
- Use services for Firestore access.
- Use typed interfaces for Firestore documents.
- Prefer standalone Angular patterns only if they fit a clean Angular setup.
- Ensure the app can later support GitHub Pages deployment.
- Do not create backend dependencies.
- Do not use SSR.

## Non-goals

- Do not implement authentication flows yet.
- Do not build profile pages yet.
- Do not create job post features yet.
- Do not define detailed design tokens here.
- Do not implement admin workflows yet.

## Implementation Prompt

Set up the Angular project foundation for SkillStart.

Follow AGENTS.md exactly.

Implement only the setup scope:

- project structure
- routing foundation
- shared and core folders
- Firebase config placeholders using environment-based configuration
- base architecture for services, guards and models
- PWA-ready foundation
- GitHub Pages compatible frontend setup

Use readable, minimal structure that supports later prompts one by one.

Do not implement feature-specific business logic beyond placeholders needed for structure.
