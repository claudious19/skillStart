# 08 Company Profile

## Scope Control

Strict

## Goal

Define the company profile feature so employers can present themselves clearly and participate in SkillStart as growth-oriented companies for junior talent.

## Requirements

- Use the `companyProfiles` collection.
- Use document ID `{uid}`.
- Follow the profile fields from AGENTS.md:
  - `ownerId`
  - `companyName`
  - `contactPersonFirstName`
  - `contactPersonLastName`
  - `websiteUrl`
  - `location`
  - `description`
  - `reviewStatus`
  - `reviewComment`
  - `createdAt`
  - `updatedAt`
- Use typed interfaces.
- Companies can create and edit their own company profile.
- Admins can review company profiles later.
- Keep business logic in services.
- Keep the profile structure compatible with company-owned job posts and applications.
- Maintain the platform positioning around mentorship, growth and junior opportunity quality.

## Non-goals

- Do not add extra company profile fields.
- Do not build job posting logic here.
- Do not implement admin review UI here.
- Do not implement advanced public company pages.

## Implementation Prompt

Implement the company profile feature for SkillStart.

Follow AGENTS.md exactly.

Implement only:

- typed company profile model usage
- company-owned profile read and write flow
- Angular structure needed for displaying and editing the company profile

Do not add extra profile fields or unrelated platform features.
