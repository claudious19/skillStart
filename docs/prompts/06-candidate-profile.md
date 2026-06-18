# 06 Candidate Profile

## Scope Control

Strict

## Goal

Define the candidate profile feature so apprenticeship graduates can present visible proof of ability and companies can evaluate potential beyond years of experience.

## Requirements

- Use the `candidateProfiles` collection.
- Use document ID `{uid}`.
- Follow the profile fields from AGENTS.md:
  - `ownerId`
  - `firstName`
  - `lastName`
  - `apprenticeshipProfession`
  - `specialisation`
  - `graduationYear`
  - `skills`
  - `ipaProject`
  - `personalProjects`
  - `certificates`
  - `githubUrl`
  - `portfolioUrl`
  - `location`
  - `careerGoals`
  - `desiredProfessionalFields`
  - `reviewStatus`
  - `reviewComment`
  - `createdAt`
  - `updatedAt`
- Use typed interfaces.
- Candidates can create and edit their own profile.
- Companies can view approved candidate profiles only.
- Admins can review candidate profiles later.
- The profile must make these things visible:
  - apprenticeship profession
  - specialisation
  - graduation year
  - skills
  - IPA project
  - personal projects
  - certificates
  - GitHub
  - portfolio
  - location
  - career goals
  - desired professional fields
- Keep business logic in services, not components.

## Non-goals

- Do not change or extend the field model.
- Do not implement company browsing here unless required only for profile read access structure.
- Do not build the form flow in detail here if it belongs in the dedicated form prompt.
- Do not add ranking or scoring logic.

## Implementation Prompt

Implement the candidate profile feature for SkillStart.

Follow AGENTS.md exactly.

Implement only:

- typed candidate profile model usage
- candidate-owned profile read and write flow
- approved-profile read pattern for companies
- Angular structure needed for displaying the candidate profile

Keep the profile centered on visible proof of potential.
Do not add extra profile fields or unrelated recommendation logic.
