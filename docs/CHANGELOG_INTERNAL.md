# CHANGELOG_INTERNAL

## 2026-06-22

- `JobPost`-Modell fuer `jobPosts/{jobPostId}` ergaenzt
- `JobPostService` fuer Company-Listen, Erstellen, Bearbeiten, Veröffentlichen und Archivieren eingefuehrt
- Company-Job-Post-Routen durch echte Listen- und Formularseiten ersetzt
- Firmenprofil-Navigation um direkten Einstieg zur Inseratsverwaltung erweitert
- Job-Post-UI mit mobile-first Listen-Cards, Inline-Validierung und Pflichtfeldhinweisen gebaut
- `companyDisplayNameSnapshot` wird beim Erstellen redundant aus dem User-Dokument gespeichert
- Dokumentation zu Datenmodell, Routen, Firebase, Architektur, Designsystem, Entscheidungen, Status und TODOs aktualisiert

## 2026-06-21

- repo-basierte Dokumentationsstruktur eingefuehrt
- `README.md` auf kurze Projektuebersicht mit Doc-Links reduziert
- `AGENTS.md` auf aktuellen Arbeitsstandard und Doku-Pflichten ausgerichtet
- neue Referenzdokumente fuer Projektkontext, Status, Architektur, Routen, Datenmodell, Firebase, Designsystem, Entscheidungen und TODOs erstellt
- bekannte Abweichung zwischen `firestore.rules`, `fb-newrules.json` und moeglichen Console-Rules explizit dokumentiert
- Kandidatenprofil auf die bereits vorhandenen Modellfelder erweitert und Profil-UI fuer Candidate und Company neu gegliedert
- Profil-Header-Meta auf Desktop vertikal gestapelt, damit der zweite Hinweis nicht in den folgenden Text hineinragt
- Profil-Header von Candidate und Company als symmetrische Zwei-Zonen-Struktur mit fester Aktionsspalte und sauberem Meta-Block neu ausbalanciert
- Profil-Titel auf Desktop etwas schmaler und luftiger gesetzt, damit der Einleitungssatz nicht optisch in den Heading-Bereich rutscht
- Profilfelder im gemeinsamen Gitter auf top-aligned gesetzt, damit `Spezialisierung` und `Wohnort` sauber mit der linken Spalte starten
- Kandidatenprofil zeigt Pflicht- und optionale Felder direkt im Label und erlaubt leere Nachweisfelder dort, wo es sinnvoll ist
- `Abschlussjahr` und `Gewünschte Berufsfelder` im Kandidatenprofil sind jetzt wieder Pflichtfelder, damit die Profilbasis eindeutig bleibt
- Kommagetrennte Felder im Abschnitt `Stärken und Ziele` akzeptieren jetzt leere Eingaben ohne Formatfehler und werden nur bei Inhalt aufgeteilt
- Kandidatenprofil zeigt nach dem Speichern jetzt eine eigene Erfolgsnachricht, die explizit das Kandidatenprofil nennt
