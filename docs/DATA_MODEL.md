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
- `jobPosts`

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

- `firstName`
- `lastName`
- `apprenticeshipProfession`
- `specialisation`
- `graduationYear`
- `skills`
- `location` als `Wohnort` im UI
- `careerGoals`
- `ipaProject`
- `personalProjects`
- `certificates`
- `githubUrl`
- `portfolioUrl`
- `desiredProfessionalFields`

Aktuell im Modell vorhanden, aber nicht ueber die Profilseite bearbeitbar:

- `reviewStatus`
- `reviewComment`

Aktuell im Profil optional speicherbar:

- `ipaProject`
- `personalProjects`
- `certificates`
- `githubUrl`
- `portfolioUrl`
 
Pflichtfelder in der aktuellen UI:

- `firstName`
- `lastName`
- `apprenticeshipProfession`
- `specialisation`
- `graduationYear`
- `location`
- `careerGoals`

Aktuell optional in der UI:

- `skills`
- `desiredProfessionalFields`

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
- Die neue `jobPosts`-Struktur speichert `jobPostId` und `companyId`, damit spaetere Bewerbungen darauf referenzieren koennen.

## JobPost

Quelle:

- [`src/app/models/job-post.model.ts`](C:\Users\claudio\Documents\SkillStart\src\app\models\job-post.model.ts)

```ts
export interface JobPost {
  jobPostId: string;
  companyId: string;
  companyDisplayNameSnapshot: string;
  title: string;
  description: string;
  location: string;
  employmentType: 'full_time' | 'part_time' | 'internship' | 'temporary' | 'other';
  apprenticeshipProfessions: string[];
  requiredSkills: string[];
  desiredSkills: string[];
  salaryMin: number;
  salaryMax: number;
  status: 'draft' | 'published' | 'archived';
  createdBy: string;
  createdAt: AppTimestamp;
  updatedAt: AppTimestamp;
  publishedAt: AppTimestamp | null;
  expiresAt: AppTimestamp;
}
```

Aktuell im Company-UI bearbeitbar:

- `title`
- `description`
- `location`
- `employmentType`
- `apprenticeshipProfessions`
- `requiredSkills`
- `desiredSkills`
- `salaryMin`
- `salaryMax`
- `expiresAt`

Automatisch aus dem eingeloggten User-Dokument gesetzt:

- `companyId`
- `companyDisplayNameSnapshot`
- `createdBy`

Automatisch durch die App gesetzt:

- `jobPostId`
- `status`
- `createdAt`
- `updatedAt`
- `publishedAt`

Feed- und Pagination-Vorbereitung:

- `status` trennt Entwurf, sichtbare Inserate und archivierte Inserate.
- `publishedAt` und `expiresAt` bereiten eine spaetere Kandidaten-Feed-Sortierung und Ablaufpruefung vor.
- `companyDisplayNameSnapshot` wird bewusst redundant gespeichert, damit Feed-Karten den Firmennamen ohne zusaetzlichen Company-Read anzeigen koennen.

Aktuell im Candidate-UI genutzt:

- nur `status: 'published'`
- nur nicht abgelaufene Inserate
- Filter nach `location`, `employmentType` und `apprenticeshipProfessions`
- Freitextsuche ueber `title`, `companyDisplayNameSnapshot`, `location`, `description`, `apprenticeshipProfessions`, `requiredSkills` und `desiredSkills`
- Sortierung nach `publishedAt`, `expiresAt`, `salaryMin` und `salaryMax`

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
