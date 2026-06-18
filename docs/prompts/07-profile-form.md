# 07 Profile Form

## Scope Control

Flexible

## Goal

Define the mobile-first candidate profile form experience so users can complete and update their profile clearly and efficiently using Angular Reactive Forms.

## Requirements

- Use Angular Reactive Forms.
- Keep the form aligned to the exact candidate profile fields defined in AGENTS.md.
- Design the form for mobile-first completion.
- Use progressive disclosure for long form sections where useful.
- Make primary actions easy to reach on mobile.
- Support create and edit flows for the signed-in candidate.
- Organize the form into understandable sections such as:
  - personal identity
  - apprenticeship details
  - skills and proof
  - links
  - goals
- Include validation states and user-friendly error feedback.
- Keep the data mapping typed and predictable.
- Keep save logic in services and form logic in the feature layer.

## Non-goals

- Do not change the underlying candidate profile data model.
- Do not add non-required profile fields.
- Do not implement company profile forms here.
- Do not add admin moderation logic here.

## Implementation Prompt

Implement the candidate profile form for SkillStart.

Follow AGENTS.md exactly.

Implement only the form experience for candidate profile creation and editing.

Use:

- Angular Reactive Forms
- mobile-first UI
- progressive disclosure where helpful
- clear validation and save states

You may improve UX and sectioning, but do not change business rules or add extra fields.
