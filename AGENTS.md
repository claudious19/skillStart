# SkillStart Development Rules

## Product Context

SkillStart is a platform for apprentices after graduation who want a real first chance after their apprenticeship.

The goal is not to build another generic job board.

SkillStart helps graduates show their skills, projects, IPA work, certificates and potential so companies can identify strong junior talent without judging only by years of experience.

Core promise:

> Deine erste echte Chance nach der Lehre.

Secondary promise:

> Zeig, was du kannst. Finde, wo du wachsen kannst.

---

## Technology Stack

Use the following stack:

- Angular
- TypeScript
- Firebase Authentication
- Cloud Firestore
- Angular Routing
- Angular Reactive Forms
- Mobile-first UI
- PWA-ready architecture

Do not use:

- PostgreSQL
- Prisma
- Next.js
- Express backend unless explicitly requested
- Server-side rendering unless explicitly requested

---

## Skill Mapping

When a task matches one of the skill categories below, use that skill first and follow its instructions before editing files.

### UI and frontend work

Use these skills for any visual, layout, responsive, or interface task:

- `cleanui` for professional, non-generic UI decisions and frontend quality control.
- `ui-ux-pro-max` for deeper UI/UX design choices, layout systems, visual direction, and interface refinement.
- `build-web-apps:frontend-app-builder` for landing pages, marketing pages, dashboards, and full frontend builds.
- `build-web-apps:frontend-testing-debugging` for browser QA, responsive checks, console issues, and visual regressions.
- `Browser` for opening local pages, inspecting rendered UI, clicking through flows, and taking screenshots.

Priority for UI work:

1. Read `cleanui` first.
2. Use `ui-ux-pro-max` when the task needs stronger design direction or a more polished product feel.
3. Use `build-web-apps:frontend-app-builder` when implementing or redesigning a full frontend experience.
4. Use `build-web-apps:frontend-testing-debugging` and `Browser` to verify the result in the browser.

### Product and implementation work

Use these skills when the task is about product structure, implementation, or platform-specific features:

- `skill-creator` for creating or updating Codex skills.
- `skill-installer` for installing new Codex skills from curated sources or repositories.
- `better-auth-best-practices` for Firebase authentication alternatives or auth patterns outside the core MVP rules.
- `build-web-apps:react-best-practices` only for React or Next.js work in repositories that actually use those stacks.
- `build-web-apps:shadcn` only when the project uses shadcn/ui.
- `build-web-apps:stripe-best-practices` only for Stripe payment work.
- `build-web-apps:supabase-postgres-best-practices` only for Supabase or Postgres work.
- `Documents`, `PDF`, `Presentations`, or `Spreadsheets` only when the requested artifact is a document, PDF, slide deck, or spreadsheet.
- `GitHub` for repository, PR, issue, review, or CI work.

### Skill selection rules

- Prefer the smallest skill set that fully covers the task.
- If a UI task is involved, always check whether `cleanui` applies before using a broader skill.
- Do not use a skill just because it exists; use it only when the task clearly matches its scope.
- If multiple skills apply, announce the order you will use them in before editing files.

---

## Architecture Rules

Use a clean feature-based Angular architecture.

Recommended structure:

```text
src/
  app/
    core/
      guards/
      services/
      interceptors/
    shared/
      components/
      directives/
      pipes/
    features/
      landing/
      auth/
      candidate-profile/
      company-profile/
      employer-view/
      job-posts/
      admin/
    models/
    firebase/
```

Rules:

- Keep business logic out of components.
- Use services for Firestore access.
- Use typed interfaces for all Firestore documents.
- Use Angular Reactive Forms for complex forms.
- Keep components small and reusable.
- Avoid global state unless clearly needed.
- Prefer simple readable code over premature abstractions.

---

## Major Roles

SkillStart has two major user groups:

```text
candidate
company
```

### Candidate

A candidate is a person who wants to apply to jobs and prove their potential after graduation.

Candidates can:

- Register an account.
- Log in.
- Create and edit their own candidate profile.
- Add skills, IPA work, projects, certificates and links.
- View approved job posts.
- Apply to approved job posts.
- Send contact requests or applications to companies.
- Track their own applications.

Candidates cannot:

- Publish job posts.
- View private company data.
- Change review statuses.
- Access admin features.

### Company

A company is an employer or recruiter who wants to publish jobs and find strong junior talent.

Companies can:

- Register an account.
- Log in.
- Create and edit their own company profile.
- Create and edit their own job posts.
- Submit job posts for admin review.
- View approved candidate profiles.
- Receive applications or contact requests.
- Manage their own published job posts.

Companies cannot:

- Apply to jobs.
- Edit candidate profiles.
- Access unapproved candidate profiles.
- Change review statuses.
- Access admin features.

---

## System Roles

SkillStart uses the following technical roles:

```text
candidate
company
admin
```

Admin is not a major product audience. Admin exists for platform operation, quality control and security.

Rules:

- Candidates can create and edit their own profiles.
- Candidates can view and apply to approved job posts.
- Companies can create and edit their own company profile and job posts.
- Companies can view approved candidate profiles only.
- Admins can review candidates, companies and job posts.
- Admins can change review statuses.
- Admins can write review comments.
- Public users can access the landingpage only.

---

## Authentication Requirements

Implement Firebase Authentication.

Required authentication flows:

- Candidate registration
- Company registration
- Login
- Logout
- Password reset
- Auth state persistence
- Route protection with Angular guards
- Role-based redirects after login

Authentication methods for MVP:

- Email and password

Do not implement in MVP unless explicitly requested:

- Google login
- LinkedIn login
- Magic links
- Multi-factor authentication
- SSO
- Passkeys

---

## Registration Flow

### Candidate Registration

Candidate registration must collect:

- Email
- Password
- First name
- Last name
- Role: `candidate`

After successful registration:

1. Create Firebase Auth user.
2. Create document in `users/{uid}`.
3. Create initial document in `candidateProfiles/{uid}`.
4. Set candidate profile `reviewStatus` to `draft`.
5. Redirect to candidate profile setup.

### Company Registration

Company registration must collect:

- Email
- Password
- Company name
- Contact person first name
- Contact person last name
- Role: `company`

After successful registration:

1. Create Firebase Auth user.
2. Create document in `users/{uid}`.
3. Create initial document in `companyProfiles/{uid}`.
4. Set company profile `reviewStatus` to `draft`.
5. Redirect to company profile setup.

---

## Login Flow

Login must support both major roles.

After login:

- If role is `candidate`, redirect to candidate dashboard.
- If role is `company`, redirect to company dashboard.
- If role is `admin`, redirect to admin dashboard.
- If user document is missing, block access and show an error state.
- If role is unknown, block access and show an error state.

Do not infer roles from frontend route names.

Always read the role from `users/{uid}`.

---

## Route Protection

Required guards:

```text
authGuard
roleGuard
publicOnlyGuard
```

### authGuard

Use for routes that require a logged-in user.

### roleGuard

Use for routes that require a specific role.

Examples:

- Candidate dashboard requires `candidate`.
- Company dashboard requires `company`.
- Admin dashboard requires `admin`.

### publicOnlyGuard

Use for login and registration pages.

Logged-in users should not see login/register pages again.

---

## Suggested Routes

```text
/
  landingpage

/auth/login
/auth/register
/auth/register/candidate
/auth/register/company
/auth/reset-password

/candidate/dashboard
/candidate/profile
/candidate/applications
/candidate/jobs

/company/dashboard
/company/profile
/company/job-posts
/company/job-posts/new
/company/applications

/admin/dashboard
/admin/candidates
/admin/companies
/admin/job-posts
```

---

## Firestore User Model

Use a central user document for role and account state.

Collection:

```text
users
```

Document ID:

```text
{uid}
```

Interface:

```ts
export interface AppUser {
  uid: string;
  email: string;
  role: 'candidate' | 'company' | 'admin';
  accountStatus: 'active' | 'blocked' | 'pending';
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
```

Rules:

- `uid` must match Firebase Auth UID.
- Role must be written during registration.
- Normal users cannot change their own role.
- Normal users cannot change `accountStatus`.
- Only admins can change `role` or `accountStatus`.
- Missing user documents must be treated as invalid accounts.

---

## Candidate Profile Model

Collection:

```text
candidateProfiles
```

Document ID:

```text
{uid}
```

Required fields:

```ts
export interface CandidateProfile {
  ownerId: string;
  firstName: string;
  lastName: string;
  apprenticeshipProfession: string;
  specialisation: string;
  graduationYear: number;
  skills: string[];
  ipaProject?: string;
  personalProjects: string[];
  certificates: string[];
  githubUrl?: string;
  portfolioUrl?: string;
  location: string;
  careerGoals: string;
  desiredProfessionalFields: string[];
  reviewStatus: 'draft' | 'pending' | 'approved' | 'rejected' | 'needs_changes';
  reviewComment?: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
```

---

## Company Profile Model

Collection:

```text
companyProfiles
```

Document ID:

```text
{uid}
```

Required fields:

```ts
export interface CompanyProfile {
  ownerId: string;
  companyName: string;
  contactPersonFirstName: string;
  contactPersonLastName: string;
  websiteUrl?: string;
  location: string;
  description: string;
  reviewStatus: 'draft' | 'pending' | 'approved' | 'rejected' | 'needs_changes';
  reviewComment?: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
```

---

## Job Application Model

Collection:

```text
applications
```

Required fields:

```ts
export interface JobApplication {
  candidateId: string;
  companyId: string;
  jobPostId: string;
  status: 'submitted' | 'viewed' | 'rejected' | 'invited' | 'withdrawn';
  message?: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
```

Rules:

- Candidates can create applications for approved job posts.
- Candidates can read their own applications.
- Companies can read applications for their own job posts.
- Companies can update application status.
- Candidates cannot update company-side statuses except `withdrawn`.
- Admins can read all applications.

---

## Scope Control Modes

Each task must define a scope control mode.

### Strict

Use this for:

- Product vision
- Firestore data model
- Roles and permissions
- Login and registration flows
- Security rules
- Candidate profile fields
- Job quality fields
- Admin approval workflow

Rules for Strict mode:

- Implement exactly the requested scope.
- Do not add extra fields.
- Do not rename fields.
- Do not introduce new dependencies.
- Do not change architecture.
- Do not invent features.
- Ask for clarification only if implementation is impossible.

### Flexible

Use this for:

- Landingpage layout
- Visual design
- UI spacing
- Component styling
- Copywriting improvements
- Empty states
- Responsive layout refinements

Rules for Flexible mode:

- Implement all requested requirements.
- UX improvements are allowed.
- Reusable components are allowed.
- Layout decisions are allowed.
- Do not change product logic.

---

## Product Rules

SkillStart must focus on potential, not years of experience.

Candidate profiles should make these things visible:

- Apprenticeship profession
- Specialisation
- Graduation year
- Skills
- IPA project
- Personal projects
- Certificates
- GitHub
- Portfolio
- Location
- Career goals
- Desired professional fields

The platform should avoid showing candidates only as generic juniors.

Every profile should answer:

> Why should a company give this person a chance now?

---

## Job Quality Rules

SkillStart should not be positioned as a platform against support work.

The platform is about finding roles with growth, responsibility and proof opportunities.

A good job post should include:

- Role title
- Target apprenticeship profession
- Main tasks
- Technologies
- Learning potential
- Mentoring
- Responsibility level
- Development path
- Support percentage
- Project work percentage
- Engineering or specialist work percentage

A job should be flagged if:

- Support work dominates the role
- There is no clear learning path
- There is no mentoring
- Requirements are unrealistic for graduates
- The role requires more than 2 years of experience
- The role uses junior wording but describes mid-level expectations

---

## Firestore Rules

Use typed Firestore collections.

Base collections:

```text
users
candidateProfiles
companyProfiles
jobPosts
applications
skills
projects
certificates
contactRequests
reviews
auditLogs
```

General document rules:

- Every document must have `createdAt`.
- Every document must have `updatedAt`.
- User-owned documents must have `ownerId`.
- Reviewable documents must have `reviewStatus`.
- Admin actions must be written to `auditLogs`.

Allowed review statuses:

```text
draft
pending
approved
rejected
needs_changes
```

---

## Security Rules Principles

Firestore security rules must enforce:

- Users can only modify their own data.
- Candidates can only apply to approved job posts.
- Companies can only manage their own job posts.
- Companies cannot access unapproved candidate profiles.
- Candidates cannot access private company data.
- Only admins can approve, reject or request changes.
- Audit logs cannot be edited by normal users.
- Role changes cannot be performed by normal users.
- Application data must only be visible to the owning candidate, owning company and admins.

Never rely only on frontend checks for permissions.

---

## Mobile-First Rules

SkillStart must be designed mobile-first.

Rules:

- Start layout from smartphone screens.
- Use bottom navigation where useful.
- Forms must be easy to complete on mobile.
- Avoid dense desktop-first tables.
- Use cards instead of large tables where possible.
- Keep primary actions reachable with one thumb.
- Use progressive disclosure for long forms.

---

## PWA Rules

The Angular application should be PWA-ready.

Requirements:

- Angular Service Worker
- Manifest file
- App icons
- Mobile meta tags
- Installable structure
- Offline-friendly fallback where reasonable

Future compatibility target:

- Capacitor
- Ionic
- Mobile app wrapper

Do not implement Ionic unless explicitly requested.

---

## Testing Hosting Target

During the testing phase, SkillStart must be hostable on GitHub Pages.

GitHub Pages is the temporary testing deployment target.

Requirements:

- The Angular app must build as a static frontend.
- The app must not require a custom Node.js server.
- Firebase must be used directly from the Angular frontend.
- Firebase configuration must be environment-based.
- The production build must work when served from a GitHub Pages subpath.
- Routing must be compatible with GitHub Pages static hosting.
- Deep-link refresh issues must be handled.

Recommended deployment approach:

- Use Angular production build.
- Configure `baseHref` for the GitHub Pages repository path.
- Prefer hash-based routing during GitHub Pages testing if needed.
- Use GitHub Actions for automatic deployment to GitHub Pages.

Example Angular build for project pages:

```bash
ng build --configuration production --base-href /REPOSITORY_NAME/
```

If the app is deployed to a user or organisation GitHub Pages root domain, use:

```bash
ng build --configuration production --base-href /
```

Routing rules:

- For GitHub Pages testing, hash routing is allowed.
- Example URL format with hash routing:

```text
https://USERNAME.github.io/REPOSITORY_NAME/#/auth/login
```

- Do not rely on server-side rewrites.
- Do not implement SSR for GitHub Pages.

Firebase rules:

- Firebase Auth is allowed.
- Cloud Firestore is allowed.
- Firebase Storage is allowed only if explicitly requested.
- Firebase Cloud Functions must not be required for the MVP testing phase.
- Secrets must not be committed to the repository.
- Only public Firebase web config values may be exposed in the frontend.

GitHub Actions deployment should:

- Install dependencies.
- Build the Angular app.
- Upload the static build output.
- Deploy to GitHub Pages.

Do not introduce deployment dependencies that make GitHub Pages impossible.


---

## Prompt Usage

When implementing from a prompt file, follow only that file's scope.

Example instruction:

```text
Use docs/prompts/01-project-setup.md.
Implement only this scope.
Do not modify unrelated files.
Follow AGENTS.md.
```

If a prompt conflicts with AGENTS.md:

1. Follow the explicit user instruction.
2. Follow the active prompt.
3. Follow AGENTS.md.
4. Follow existing project conventions.

---

## Non-MVP Features

Do not implement these unless explicitly requested:

- Matching algorithm
- Payments
- Chat system
- Notifications
- Mobile app release
- Advanced analytics
- CV parser
- AI scoring
- Employer subscriptions
- Public company reviews

These can come later.

The MVP must focus on:

1. Landingpage
2. Candidate registration and login
3. Company registration and login
4. Candidate profile
5. Company profile
6. Candidate job search
7. Job post creation
8. Job applications
9. Admin approval workflow
10. Firebase authentication
11. Firestore data storage

---

## Git Workflow Rules

Use normal Git commands for all repository operations.

Allowed standard Git commands include:

```bash
git status
git branch
git checkout
git switch
git add
git commit
git pull
git push
git fetch
git log
git diff
```

Do not use GitHub CLI (`gh`) for normal Git operations.

Forbidden for normal workflow:

```bash
gh pr create
gh pr merge
gh repo clone
gh repo fork
gh api
```

Exception:

GitHub CLI may only be used to create a new GitHub repository when the user explicitly requests repository creation.

Example allowed exception:

```bash
gh repo create
```

### Branch Rules

Every implemented prompt must be done on a new branch.

Before implementing a prompt:

1. Check the current branch.
2. Check working tree status.
3. Create a new branch for the active prompt.
4. Implement only the active prompt.
5. Commit the result to that branch.
6. Push the branch with normal Git commands.

Example:

```bash
git status
git switch -c prompt-05-auth-and-roles
git add .
git commit -m "feat(prompt-05): implement auth and roles"
git push -u origin prompt-05-auth-and-roles
```

Branch naming format:

```text
prompt-XX-short-description
```

Examples:

```text
prompt-01-project-setup
prompt-04-firebase-setup
prompt-05-auth-and-roles
prompt-10-job-post-quality-form
```

### Merge Rules

The agent must not merge branches.

Forbidden:

```bash
git merge
git rebase
git cherry-pick
gh pr merge
```

Rules:

- Do not merge feature branches into `main`.
- Do not merge feature branches into each other.
- Do not rebase branches unless explicitly requested.
- Do not delete branches unless explicitly requested.
- Leave merge decisions to the user.

### Pull and Push Rules

Use normal Git commands for pull and push.

Allowed:

```bash
git pull
git push
git fetch
```

Rules:

- Pull only when needed to update the current branch.
- Push only the branch created for the active prompt.
- Do not force-push unless explicitly requested.
- Do not push directly to `main` unless explicitly requested.
- Do not change Git remotes unless explicitly requested.

### Commit Rules

Commit after every completed prompt.

Commit message format:

```text
feat(prompt-XX): short description
```

Examples:

```text
feat(prompt-01): initialise Angular project
feat(prompt-04): add Firebase services
feat(prompt-05): implement authentication and roles
```

If the task is a fix:

```text
fix(prompt-XX): short description
```

If the task only changes documentation:

```text
docs(prompt-XX): short description
```

### Prompt Execution Rule

For each prompt implementation:

1. Read `AGENTS.md`.
2. Read the active prompt file.
3. Create a new branch.
4. Implement only the active prompt.
5. Commit changes.
6. Push the branch.
7. Stop.

Do not continue with the next prompt unless explicitly instructed.

---

## Development Behaviour

Before changing code:

- Read the active prompt.
- Read relevant existing files.
- Identify impacted files.
- Keep the implementation minimal.
- Avoid unrelated refactoring.

After changing code:

- Ensure TypeScript types are valid.
- Ensure components compile.
- Ensure forms are typed.
- Ensure Firestore access is isolated in services.
- Summarise changed files and decisions.

Do not generate placeholder logic that pretends to be production-ready.

Mark unfinished logic clearly with TODO comments.
