# 12 GitHub Pages Deployment

## Scope Control

Strict

## Goal

Define the GitHub Pages testing deployment setup for SkillStart so the Angular app can be built and deployed as a static frontend without any custom backend.

## Requirements

- Use a static Angular build.
- No custom backend.
- No SSR.
- Use environment-based Firebase config.
- Support `baseHref` for GitHub Pages subpaths.
- Hash routing is allowed for testing.
- Handle deep-link refresh limitations in a GitHub Pages compatible way.
- Keep Firebase usage frontend-only for MVP testing.
- Ensure the deployment path works for both:
  - repository subpath hosting
  - root-domain hosting if needed
- Include GitHub Actions based deployment expectations:
  - install dependencies
  - build Angular app
  - upload static output
  - deploy to GitHub Pages
- Do not introduce deployment dependencies that make GitHub Pages impossible.

## Non-goals

- Do not deploy to custom infrastructure.
- Do not add server rewrites.
- Do not add SSR or Node hosting.
- Do not introduce secrets into the repository.

## Implementation Prompt

Implement the GitHub Pages deployment setup for SkillStart.

Follow AGENTS.md exactly.

Implement only:

- static Angular deployment compatibility
- baseHref support
- routing strategy suitable for GitHub Pages testing
- environment-based Firebase config usage
- GitHub Actions deployment workflow

Do not add non-static hosting assumptions.
