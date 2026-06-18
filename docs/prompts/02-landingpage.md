# 02 Landingpage

## Scope Control

Flexible

## Goal

Define the public landingpage experience for SkillStart so it communicates the product promise clearly, works mobile-first and guides visitors into candidate or company registration paths.

## Requirements

- The landingpage must be the public root route.
- The landingpage must communicate:
  - the core promise
  - the value for candidates
  - the value for companies
  - the difference from generic job boards
- Include clear calls to action for:
  - candidate registration
  - company registration
  - login
- Use mobile-first layout.
- Use responsive sections and cards instead of dense layouts.
- Align the copy with:
  - potential over years of experience
  - visible proof through projects, IPA, GitHub and certificates
  - career growth and learning opportunities
- Keep routing and auth assumptions compatible with later role-based flows.
- Keep the page PWA-friendly and lightweight.

## Non-goals

- Do not implement login or registration logic here.
- Do not create private dashboards.
- Do not create candidate search or job applications here.
- Do not change product logic or role definitions.

## Implementation Prompt

Create the SkillStart landingpage.

Follow AGENTS.md exactly.

Implement only the public landingpage scope with flexible UI decisions.

Include:

- hero section
- problem and solution framing
- candidate value section
- company value section
- proof-oriented platform explanation
- clear primary and secondary calls to action

Use mobile-first Angular UI and keep the structure simple, reusable and ready for later routing integration.

You may improve copy and layout, but do not invent new product features.
