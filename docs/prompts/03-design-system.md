# 03 Design System

## Scope Control

Flexible

## Goal

Define a lightweight design system for SkillStart that supports a mobile-first Angular UI, strong readability and a consistent product identity across public and authenticated views.

## Requirements

- Define foundational UI tokens and conventions for:
  - colors
  - typography
  - spacing
  - border radius
  - elevation
  - form controls
  - buttons
  - cards
  - status badges
- Support the review statuses:
  - `draft`
  - `pending`
  - `approved`
  - `rejected`
  - `needs_changes`
- Support role-oriented UI clarity for:
  - `candidate`
  - `company`
  - `admin`
- Design mobile-first first, then scale up.
- Prefer accessible contrast and readable sizing.
- Keep the system compatible with Angular component styling.
- Keep the visual language professional, modern and growth-oriented.
- Make the system reusable across forms, dashboards and review views.

## Non-goals

- Do not redesign product scope.
- Do not define a full brand book.
- Do not add animation-heavy requirements.
- Do not implement page-specific feature logic.

## Implementation Prompt

Create a minimal but solid design system specification for SkillStart.

Follow AGENTS.md exactly.

Define reusable styling decisions for the Angular app, with special attention to:

- mobile-first UI
- form-heavy flows
- cards over dense tables
- accessible states
- review status visibility

Allow thoughtful UI refinement, but do not change business logic or add extra product features.
