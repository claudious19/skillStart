# DECISIONS

## 2026-06-21: Dokumentation leitet sich vom Code ab

Entscheidung:

- Repository-Dokumentation beschreibt den echten Ist-Zustand und markiert Abweichungen offen.

Konsequenz:

- Wunscharchitektur oder fruehere Prompts duerfen Codebeobachtungen nicht ueberschreiben.

## Standalone Angular statt klassischem NgModule-Setup

Beobachtung:

- Die App bootstrapped ueber `bootstrapApplication()` und arbeitet mit Standalone Components.

Konsequenz:

- Neue Features sollen dieses Muster fortfuehren, solange kein expliziter Grund fuer eine Umstellung besteht.

## Rollen-Redirect basiert auf `users/{uid}`

Beobachtung:

- Die Rolle wird nicht aus Routen oder Auth-Claims abgeleitet, sondern aus dem zentralen User-Dokument gelesen.

Konsequenz:

- Auth- und Routing-Logik haengen von einem vorhandenen und gueltigen User-Dokument ab.

## Registrierung ueber anonyme Session und anschliessendes Linking

Beobachtung:

- Kandidaten und Unternehmen werden zuerst anonym angemeldet, schreiben Draft-Dokumente und werden danach auf E-Mail/Passwort verlinkt.

Konsequenz:

- Firestore Rules muessen diesen Ablauf erlauben.
- Fehler im Linking oder in den Rules koennen Registrierung und Profilinitialisierung direkt blockieren.

## Unternehmen werden ueber `companies/{companyId}` modelliert

Beobachtung:

- Neue Firmendokumente werden nicht mehr unter `companyProfiles/{uid}` geschrieben.

Konsequenz:

- Firmenprofile muessen ueber `currentUser.companyId` geladen werden.
- Mehrere Company-User koennen grundsaetzlich dieselbe Firma referenzieren, auch wenn die spaetere Mehrbenutzerverwaltung im UI noch nicht gebaut ist.

## GitHub Pages bleibt ein explizites Deployment-Ziel

Beobachtung:

- Es gibt eine konkrete GitHub-Pages-Pipeline und Hash-Routing ist aktiv.

Konsequenz:

- Routing- und Build-Aenderungen muessen statisches Hosting weiterhin respektieren.

## Platzhalterbereiche bleiben sichtbar statt versteckt

Beobachtung:

- Mehrere Feature-Zweige sind bereits im Routing vorhanden und zeigen bewusst Platzhalterseiten.

Konsequenz:

- Der Projektzustand bleibt fuer Weiterentwicklung klar sichtbar.
- Doku muss diese Bereiche als vorbereitet, aber nicht fertig markieren.

## 2026-06-22: Job-Posts speichern Firmenname als Snapshot

Entscheidung:

- `jobPosts/{jobPostId}` enthaelt `companyDisplayNameSnapshot` zusaetzlich zu `companyId`.

Konsequenz:

- Kandidatenfeeds und Listen koennen den Firmennamen spaeter ohne zusaetzlichen `companies/{companyId}`-Read anzeigen.
- Der Snapshot kann veralten, wenn sich ein Firmenname spaeter aendert. Das ist fuer Feed-Performance bewusst akzeptiert und muss bei einer spaeteren Firmenname-Bearbeitung neu bewertet werden.

## 2026-06-22: Company-Job-Posts bleiben owner-scoped

Entscheidung:

- Die Company-UI laedt und bearbeitet Inserate ueber `currentUser.companyId`; `companyId` wird nicht im Formular bearbeitet.

Konsequenz:

- Mehrere Company-User koennen spaeter dieselbe Firma verwalten, solange sie dieselbe `companyId` im User-Dokument tragen.
- Firestore Rules muessen weiterhin sicherstellen, dass fremde `companyId`-Dokumente nicht geschrieben werden koennen.
