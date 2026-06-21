# DATA_MODEL

## Hinweis zum Ist-Zustand

Diese Datei beschreibt nur Modelle und Collections, die im aktuellen Code sichtbar sind. Sie ist keine Soll-Architektur fuer spaetere Features.

## Collections im Code

Aktuell in `FIRESTORE_COLLECTIONS` vorhanden:

- `users`
- `companies`
- `candidateProfiles`
- `jobPosts`
- `applications`
- `contactRequests`
- `auditLogs`

Davon werden aktuell im Frontend effektiv verwendet:

- `users`
- `companies`
- `candidateProfiles`

## AppUser

Quelle:

- [`src/app/models/app-user.model.ts`](C:\Users\claudio\Documents\SkillStart\src\app\models\app-user.model.ts)

```ts
export interface AppUser {
  uid: string;
  email: string;
  role: 'candidate' | 'company' | 'admin';
  companyId: string | null;
  CompanyDisplayname: string | null;
  displayName: string;
  firstName?: string;
  lastName?: string;
  accountStatus: 'active' | 'pending';
  createdAt: AppTimestamp;
  updatedAt: AppTimestamp;
}
```

Beobachtungen:

- `CompanyDisplayname` ist bewusst mit grossem `C` im Feldnamen implementiert.
- `accountStatus` kennt aktuell nur `active` und `pending`.
- `companyId` ist nur fuer `company` relevant.

## CandidateProfile

Quelle:

- [`src/app/models/candidate-profile.model.ts`](C:\Users\claudio\Documents\SkillStart\src\app\models\candidate-profile.model.ts)

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
  createdAt: AppTimestamp;
  updatedAt: AppTimestamp;
}
```

Aktuell in der UI bearbeitbar:

- `apprenticeshipProfession`
- `specialisation`
- `skills`
- `location`
- `careerGoals`

Aktuell im Modell vorhanden, aber nicht ueber die Profilseite bearbeitbar:

- `graduationYear`
- `ipaProject`
- `personalProjects`
- `certificates`
- `githubUrl`
- `portfolioUrl`
- `desiredProfessionalFields`
- `reviewStatus`
- `reviewComment`

## Company

Quelle:

- [`src/app/models/company.model.ts`](C:\Users\claudio\Documents\SkillStart\src\app\models\company.model.ts)

```ts
export interface Company {
  companyId: string;
  companyName: string;
  description: string;
  location: string;
  reviewStatus: 'draft' | 'pending' | 'approved' | 'rejected' | 'needs_changes';
  createdBy: string;
  createdAt: AppTimestamp;
  updatedAt: AppTimestamp;
}
```

Aktuell in der UI bearbeitbar:

- `description`
- `location`

Aktuell nicht ueber die Profilseite bearbeitbar:

- `companyName`
- `reviewStatus`
- `createdBy`

## JobApplication

Quelle:

- [`src/app/models/job-application.model.ts`](C:\Users\claudio\Documents\SkillStart\src\app\models\job-application.model.ts)

```ts
export interface JobApplication {
  candidateId: string;
  companyId: string;
  jobPostId: string;
  status: 'submitted' | 'viewed' | 'rejected' | 'invited' | 'withdrawn';
  message?: string;
  createdAt: AppTimestamp;
  updatedAt: AppTimestamp;
}
```

Hinweis:

- Das Modell existiert, aber es gibt aktuell keine aktive UI oder Datenlogik fuer Bewerbungen.

## Registrierungsdaten, die aktuell geschrieben werden

### Candidate

- `users/{uid}`
  - `uid`
  - `email`
  - `role: 'candidate'`
  - `companyId: null`
  - `CompanyDisplayname: null`
  - `displayName`
  - `firstName`
  - `lastName`
  - `accountStatus: 'pending' -> 'active'`
  - `createdAt`
  - `updatedAt`
- `candidateProfiles/{uid}`
  - Startdokument mit `reviewStatus: 'draft'`

### Company

- `users/{uid}`
  - `uid`
  - `email`
  - `role: 'company'`
  - `companyId`
  - `CompanyDisplayname`
  - `displayName`
  - `firstName`
  - `lastName`
  - `accountStatus: 'pending' -> 'active'`
  - `createdAt`
  - `updatedAt`
- `companies/{companyId}`
  - `companyId`
  - `companyName`
  - `description`
  - `location`
  - `reviewStatus: 'draft'`
  - `createdBy`
  - `createdAt`
  - `updatedAt`

## Typing-Risiken

- `AppTimestamp` ist nur als `object` definiert.
- Die App mappt Firestore-Daten defensiv, aber nicht jedes optionale Feld wird hart validiert.
