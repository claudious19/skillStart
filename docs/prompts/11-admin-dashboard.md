# 11 Admin Dashboard

## Scope Control

Strict

## Goal

Define the admin dashboard and review workflow foundation so platform operators can review candidates, companies and job posts securely and consistently.

## Requirements

- The admin area is for technical role `admin` only.
- Protect all admin routes with auth and role guards.
- Admins can review:
  - candidate profiles
  - company profiles
  - job posts
- Admins can change review statuses:
  - `draft`
  - `pending`
  - `approved`
  - `rejected`
  - `needs_changes`
- Admins can write review comments.
- Admin actions must be written to `auditLogs`.
- Keep the dashboard structure compatible with mobile-first usage, but optimize for practical review workflows.
- Keep logic in services and use typed document models.
- Use read and write flows that align with Firestore security expectations.

## Non-goals

- Do not create analytics dashboards.
- Do not create billing tools.
- Do not add moderation systems outside candidate, company and job review.
- Do not create advanced automation or notification systems.

## Implementation Prompt

Implement the admin dashboard foundation for SkillStart.

Follow AGENTS.md exactly.

Implement only:

- admin route structure
- review lists
- review detail flow
- review status update actions
- review comments
- audit log write integration points

Do not add broader back-office features outside the review workflow scope.
