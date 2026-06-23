# FIREBASE

## Aktuell verwendete Firebase-Dienste

- Firebase Authentication
- Cloud Firestore

Nicht sichtbar im aktiven Frontend:

- Cloud Functions
- Firebase Storage
- serverseitige Admin-SDK-Nutzung

## Konfigurationsquellen

Environment-Dateien:

- [`src/environments/environment.ts`](C:\Users\claudio\Documents\SkillStart\src\environments\environment.ts)
- [`src/environments/environment.development.ts`](C:\Users\claudio\Documents\SkillStart\src\environments\environment.development.ts)
- [`src/environments/environment.production.ts`](C:\Users\claudio\Documents\SkillStart\src\environments\environment.production.ts)
- [`src/environments/environment.github-pages.ts`](C:\Users\claudio\Documents\SkillStart\src\environments\environment.github-pages.ts)

Aktueller Stand:

- Firebase Web Config ist im Repository enthalten
- Die Werte sind oeffentliche Client-Konfiguration, keine Admin-Secrets
- `useHashRouting` ist in allen sichtbaren Environments auf `true`

## Angular-Firebase-Wiring

Firebase wird ueber eigene Provider initialisiert:

- [`src/app/firebase/firebase.providers.ts`](C:\Users\claudio\Documents\SkillStart\src\app\firebase\firebase.providers.ts)
- [`src/app/firebase/firebase.tokens.ts`](C:\Users\claudio\Documents\SkillStart\src\app\firebase\firebase.tokens.ts)

Bereitgestellt werden:

- Firebase App
- Firebase Auth
- Firestore

## Auth-Flows

### Login

- E-Mail und Passwort
- Persistenz ueber `browserLocalPersistence`
- Rollen-Redirect ueber `users/{uid}`

### Registrierung

Der aktuelle Registrierungsfluss ist nicht `createUserWithEmailAndPassword` direkt, sondern:

1. anonyme Session sicherstellen
2. Draft-Dokumente in Firestore anlegen
3. anonymen Benutzer mit E-Mail/Passwort verlinken
4. `users/{uid}.accountStatus` auf `active` setzen

Das ist fuer beide Rollen implementiert.

### Passwort-Reset

- implementiert ueber `sendPasswordResetEmail`

### Logout

- implementiert ueber `signOut`

## Firestore-Nutzung im Frontend

Aktive Dokumentpfade:

- `users/{uid}`
- `candidateProfiles/{uid}`
- `companies/{companyId}`
- `jobPosts/{jobPostId}`

Aktive Lese- und Schreibstellen:

- Registrierung in `AuthFlowService`
- User-Dokumente in `UserDocumentService`
- Profile in `ProfileService`
- Stelleninserate in `JobPostService`

Job-Post-Hinweise:

- `companyId` wird aus dem eingeloggten `users/{uid}`-Dokument uebernommen.
- `companyDisplayNameSnapshot` wird bewusst redundant am Inserat gespeichert.
- `publishedAt` ist bei Entwuerfen `null` und wird beim Veröffentlichen gesetzt.
- `expiresAt`, `status` und `publishedAt` bereiten spaetere Feed- und Pagination-Abfragen vor.
- Der Candidate-Feed liest nur `status == 'published'` und blendet abgelaufene Inserate im Frontend aus.

## Rules-Dateien im Repository

Aktive Firebase-Konfiguration in `firebase.json`:

- verweist auf `firestore.rules`

Weitere Rules-Datei im Repository:

- `fb-newrules.json`

Wichtige Beobachtung:

- `firestore.rules` und `fb-newrules.json` sind nicht identisch.
- `fb-newrules.json` ist trotz Dateiendung kein JSON, sondern eine alternative Firestore-Rules-Datei.
- Laut bisherigem Projektverlauf werden Rules teils direkt in der Firebase Console gepflegt. Deshalb kann die produktive Rules-Lage vom Repository abweichen.

## GitHub Pages und Deployment

Der Workflow liegt in:

- [`.github/workflows/deploy-github-pages.yml`](C:\Users\claudio\Documents\SkillStart\.github\workflows\deploy-github-pages.yml)

Aktueller Ablauf:

- `pnpm install --frozen-lockfile`
- Angular Production Build mit `base-href /`
- Kopie des Browser-Builds nach `dist/skillStart`
- `CNAME` und `404.html` werden fuer Pages vorbereitet

Hinweis:

- Die App ist zugleich auf Hash-Routing vorbereitet. Das senkt das Risiko bei statischem Hosting.

## PWA

Sichtbar implementiert:

- `provideServiceWorker(...)` in `app.config.ts`
- Manifest unter `public/manifest.webmanifest`

Unklar oder nicht in diesem Task verifiziert:

- Offline-Verhalten im Browser
- Install-Prompt-Verhalten auf allen Zielgeraeten
