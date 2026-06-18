# 10 Job Post Quality Form

## Scope Control

Strict

## Goal

Define the company job post creation flow with a quality-focused form so SkillStart only promotes junior roles with clear learning, mentoring and development value.

## Requirements

- The job post flow is for `company` users.
- Use Angular Reactive Forms.
- Keep the form mobile-first.
- Include job quality fields aligned with AGENTS.md:
  - role title
  - target apprenticeship profession
  - main tasks
  - technologies
  - learning potential
  - mentoring
  - responsibility level
  - development path
  - support percentage
  - project work percentage
  - engineering or specialist work percentage
- Keep room for review workflow states:
  - `draft`
  - `pending`
  - `approved`
  - `rejected`
  - `needs_changes`
- Support company-owned create and edit flows.
- Prepare job posts for admin review submission.
- Flag low-quality role patterns in the UX when:
  - support work dominates
  - there is no clear learning path
  - there is no mentoring
  - requirements are unrealistic for graduates
  - more than 2 years of experience is required
  - the role sounds junior but expects mid-level output
- Keep logic readable and typed.

## Non-goals

- Do not implement admin review UI here.
- Do not implement payments or promoted listings.
- Do not introduce hidden scoring systems.
- Do not define unrelated company profile logic here.

## Implementation Prompt

Implement the company job post quality form for SkillStart.

Follow AGENTS.md exactly.

Implement only:

- job post create and edit form
- quality-oriented field structure
- validation and warning patterns for low-quality junior roles
- submission readiness for later admin review

Use strict scope.
Do not add extra business flows beyond job post creation and quality framing.
