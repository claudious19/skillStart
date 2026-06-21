# PROJECT_STATE

Stand dieser Datei: 2026-06-21

## Zusammenfassung

Das Repository ist ein funktionierender MVP-Zwischenstand mit echter Landingpage, funktionierenden Auth-Flows und editierbaren Basisprofilen fuer Kandidaten und Unternehmen. Mehrere Produktbereiche sind im Routing bereits angelegt, aber noch bewusst als Platzhalter umgesetzt.

## Implementiert

- Angular-Standalone-App mit Feature-Routing
- Firebase App-, Auth- und Firestore-Initialisierung
- Auth-Persistenz via `browserLocalPersistence`
- Anonymous-zu-E-Mail-Registrierungsfluss fuer Kandidaten und Unternehmen
- Login mit Rollen-Redirect
- Passwort-Reset
- Guards fuer geschuetzte und oeffentliche Routen
- Kandidatenprofil mit speicherbaren Feldern:
  - `apprenticeshipProfession`
  - `specialisation`
  - `skills`
  - `location`
  - `careerGoals`
- Firmenprofil mit speicherbaren Feldern:
  - `description`
  - `location`
- Landingpage, Register-Auswahl und Auth-UI mit responsive Layout
- GitHub-Pages-Workflow
- PWA-Basis mit Manifest und Service Worker

## Teilweise implementiert

- `candidate/dashboard` laedt aktuell dieselbe Seite wie `candidate/profile`
- `candidate/applications` laedt aktuell ebenfalls dieselbe Kandidatenprofilseite
- `company/dashboard` laedt aktuell dieselbe Seite wie `company/profile`
- Das Kandidatenprofil-Modell enthaelt mehr Felder als die aktuelle UI bearbeitbar macht
- Das Firmenmodell enthaelt `companyName`, aber die Firmenprofilseite erlaubt aktuell nur `description` und `location`
- Firestore Rules liegen lokal in mehr als einer Variante vor

## Nur vorbereitet oder Platzhalter

- `candidate/jobs`
- `company/job-posts`
- `company/job-posts/new`
- `company/applications`
- `admin/dashboard`
- `admin/candidates`
- `admin/companies`
- `admin/job-posts`

## Bekannte Risiken

- `firestore.rules` und `fb-newrules.json` bilden nicht denselben Regelstand ab.
- Laut Projektverlauf werden Firestore Rules teils direkt in der Firebase Console gepflegt. Der echte Produktzustand kann daher vom Repository abweichen.
- `AccountStatus` ist im Code aktuell nur `active | pending`. Ein `blocked`-Status ist nicht modelliert.
- `AppTimestamp` ist absichtlich sehr allgemein als `object` getypt und nicht auf eine konkrete Firebase-Timestamp-Klasse eingeschraenkt.
- Mehrere Bereiche sind routing-seitig vorhanden, koennen aber fachlich noch nichts Produktives tun.

## Unbekannt oder nicht abgesichert

- Ob die lokal vorliegenden Firestore Rules genau den live ausgerollten Console-Rules entsprechen
- Ob alle PWA- und Offline-Pfade produktiv getestet wurden
- Ob Admin-Accounts und Admin-Dokumente im Produktivprojekt bereits eingerichtet sind
