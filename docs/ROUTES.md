# ROUTES

## Routing-Grundlagen

- Root-Routes liegen in [`src/app/app.routes.ts`](C:\Users\claudio\Documents\SkillStart\src\app\app.routes.ts)
- Auth-Routes liegen in [`src/app/features/auth/auth.routes.ts`](C:\Users\claudio\Documents\SkillStart\src\app\features\auth\auth.routes.ts)
- Hash-Routing ist aktuell aktiv

## Oeffentliche Routen

| Route | Verhalten | Schutz |
| --- | --- | --- |
| `/` | Landingpage | offen |
| `/auth/login` | Login-Seite | `publicOnlyGuard` |
| `/auth/register` | Rollenwahl fuer Registrierung | `publicOnlyGuard` |
| `/auth/register/candidate` | Kandidaten-Registrierung | `publicOnlyGuard` |
| `/auth/register/company` | Unternehmens-Registrierung | `publicOnlyGuard` |
| `/auth/reset-password` | Passwort-Reset | `publicOnlyGuard` |
| `/account-error` | Fehlerseite fuer ungueltige oder unvollstaendige Accounts | offen |

## Candidate-Bereich

Basisroute:

- `/candidate`
- Schutz: `authGuard` und `roleGuard(['candidate'])`

Aktuelle Unterrouten:

| Route | Aktueller Inhalt |
| --- | --- |
| `/candidate/dashboard` | Kandidatenprofilseite |
| `/candidate/profile` | Kandidatenprofilseite |
| `/candidate/applications` | Kandidatenprofilseite |
| `/candidate/jobs` | Listenansicht fuer veröffentlichte Stelleninserate mit Filtern und Sortierung |

Hinweis:

- `dashboard` und `profile` sind aktuell identisch.
- `applications` ist noch nicht umgesetzt und zeigt derzeit ebenfalls die Profilseite.

## Company-Bereich

Basisroute:

- `/company`
- Schutz: `authGuard` und `roleGuard(['company'])`

Aktuelle Unterrouten:

| Route | Aktueller Inhalt |
| --- | --- |
| `/company/dashboard` | Firmenprofilseite |
| `/company/profile` | Firmenprofilseite |
| `/company/job-posts` | Listenansicht fuer eigene Stelleninserate |
| `/company/job-posts/new` | Formular fuer neues Stelleninserat |
| `/company/job-posts/:jobPostId/edit` | Formular zum Bearbeiten eines eigenen Stelleninserats |
| `/company/applications` | Platzhalterseite |

Hinweis:

- `dashboard` und `profile` sind aktuell identisch.
- Das Firmenprofil verlinkt direkt auf die Inseratsverwaltung.

## Admin-Bereich

Basisroute:

- `/admin`
- Schutz: `authGuard` und `roleGuard(['admin'])`

Aktuelle Unterrouten:

| Route | Aktueller Inhalt |
| --- | --- |
| `/admin/dashboard` | Platzhalterseite |
| `/admin/candidates` | Platzhalterseite |
| `/admin/companies` | Platzhalterseite |
| `/admin/job-posts` | Platzhalterseite |

## Redirect-Verhalten

- `/candidate` -> `/candidate/dashboard`
- `/company` -> `/company/dashboard`
- `/admin` -> `/admin/dashboard`
- unbekannte Routen -> `/`

## Guard-Verhalten im Detail

- `authGuard`
  - eingeloggt und nicht anonym: erlaubt
  - anonym: Redirect auf `/auth/register`
  - ausgeloggt: Redirect auf `/auth/login?redirectTo=...`
- `publicOnlyGuard`
  - ausgeloggt oder anonym: erlaubt
  - eingeloggt und aktiver User: Redirect auf Rollen-Dashboard
  - fehlendes oder inaktives User-Dokument: Redirect auf `/account-error`
- `roleGuard`
  - liest die Rolle immer aus `users/{uid}`
  - fehlender User: Redirect auf `/auth/login`
  - anonymer User: Redirect auf `/auth/register`
  - falsche Rolle: Redirect auf das echte Dashboard der vorhandenen Rolle
