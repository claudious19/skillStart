# 09 Employer View

## Scope Control

Strict

## Goal

Define the employer-facing candidate discovery view so approved companies can browse approved candidate profiles in a way that highlights proof, potential and role fit.

## Requirements

- Only approved companies should access this area.
- Companies can view approved candidate profiles only.
- The view must emphasize:
  - apprenticeship profession
  - specialisation
  - graduation year
  - skills
  - IPA project
  - projects
  - certificates
  - GitHub
  - portfolio
  - location
  - career goals
  - desired professional fields
- Use mobile-first layout.
- Prefer cards or adaptable list layouts over dense desktop tables.
- Keep data access in services.
- Keep the read logic aligned with Firestore security expectations from AGENTS.md.
- Prepare the employer flow to connect later with:
  - contact requests
  - job applications

## Non-goals

- Do not implement matching algorithms.
- Do not add advanced search beyond what is necessary for the basic employer view.
- Do not expose unapproved candidate data.
- Do not implement admin controls here.

## Implementation Prompt

Implement the employer view for browsing approved candidate profiles.

Follow AGENTS.md exactly.

Implement only:

- the employer-facing candidate listing and detail access structure
- approved-only candidate visibility
- UI that highlights candidate proof and growth potential

Keep the scope strict and avoid introducing advanced discovery features that were not requested.
