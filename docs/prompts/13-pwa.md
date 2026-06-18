# 13 PWA

## Scope Control

Strict

## Goal

Define the PWA-ready foundation for SkillStart so the Angular application is installable, mobile-friendly and structured for offline-friendly behavior where reasonable.

## Requirements

- Use Angular Service Worker.
- Include a web manifest.
- Include app icons.
- Include mobile meta tags.
- Keep the app installable.
- Provide offline-friendly fallback behavior where reasonable.
- Keep the setup compatible with:
  - Angular static hosting
  - GitHub Pages testing deployment
  - future mobile wrapper compatibility
- State future compatibility targets:
  - Capacitor
  - Ionic
  - mobile app wrapper
- Do not require Ionic implementation now.
- Keep the architecture aligned with mobile-first UI.

## Non-goals

- Do not implement a mobile app.
- Do not introduce push notifications unless explicitly requested.
- Do not add advanced offline sync logic unless explicitly requested.
- Do not change product logic.

## Implementation Prompt

Implement the PWA-ready foundation for SkillStart.

Follow AGENTS.md exactly.

Implement only:

- Angular PWA setup
- service worker integration
- manifest and icons
- installability basics
- offline-friendly fallback where reasonable

Do not add unrelated mobile app features or advanced offline behavior.
