# ARCHITECTURE

## Stack

- Angular 20
- TypeScript
- Firebase Authentication
- Cloud Firestore
- Angular Router
- Angular Reactive Forms
- Angular Service Worker
- pnpm

## App-Stil

Die Anwendung nutzt Angular Standalone Components und `bootstrapApplication()` statt eines klassischen `AppModule`.

Wichtige Bootstrap-Stellen:

- [`src/main.ts`](C:\Users\claudio\Documents\SkillStart\src\main.ts)
- [`src/app/app.config.ts`](C:\Users\claudio\Documents\SkillStart\src\app\app.config.ts)

## Struktur

Die aktuelle Struktur folgt weitgehend einer Feature-Aufteilung:

```text
src/app/
  core/
    guards/
    services/
  features/
    admin/
    auth/
    candidate-profile/
    company-profile/
    employer-view/
    job-posts/
    landing/
  firebase/
  models/
  shared/
    components/
```

## Routing-Architektur

- Zentrales Root-Routing in `src/app/app.routes.ts`
- Feature-Routen in den jeweiligen Feature-Ordnern
- Rollenbereiche unter `/candidate`, `/company` und `/admin`
- Hash-Routing wird optional ueber `environment.useHashRouting` aktiviert und ist aktuell aktiv

## Guards

- `authGuard`
  - blockiert anonyme oder ausgeloggte Benutzer auf geschuetzten Routen
- `roleGuard`
  - prueft die Zielrolle gegen das `users/{uid}`-Dokument
- `publicOnlyGuard`
  - haelt eingelogte aktive Benutzer von Login- und Register-Routen fern

## Service-Aufteilung

- `AuthService`
  - Firebase-Auth-Nahbereich
  - Login
  - Logout
  - Passwort-Reset
  - anonyme Session
- `AuthFlowService`
  - Registrierungsablauf
  - Linking anonymous -> email/password
  - Rollenbasierter Login-Redirect
- `UserDocumentService`
  - Lesen und Beobachten von `users/{uid}`
  - Validierung gemappter Userdaten
- `ProfileService`
  - Lesen und Schreiben von Kandidaten- und Firmenprofilen
- `RoleRedirectService`
  - zentrale Ziel-URL pro Rolle
- `FirestoreCollectionService`
  - typsichere Helper fuer Collection- und Document-Referenzen

## Firebase-Einbindung

Die Firebase-Instanzen werden ueber eigene Provider und Injection Tokens bereitgestellt:

- `FIREBASE_APP`
- `FIREBASE_AUTH`
- `FIREBASE_FIRESTORE`

Relevante Dateien:

- [`src/app/firebase/firebase.providers.ts`](C:\Users\claudio\Documents\SkillStart\src\app\firebase\firebase.providers.ts)
- [`src/app/firebase/firebase.tokens.ts`](C:\Users\claudio\Documents\SkillStart\src\app\firebase\firebase.tokens.ts)

## UI-Architektur

- globale Tokens und primitive UI-Klassen in `src/styles.css`
- Landingpage mit eigener Feature-CSS
- Auth-Seiten mit geteilter CSS-Datei
- Kandidaten- und Firmenprofil teilen sich eine gemeinsame Profil-CSS-Datei

## Architekturgrenzen

- keine Backend-API im Repository
- keine globale State-Management-Bibliothek
- keine SSR-Schicht
- keine Cloud Functions als notwendiger Laufzeitbestandteil
