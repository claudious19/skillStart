# TODO

## Produkt und Features

- echte Kandidaten-Jobliste fuer `/candidate/jobs` bauen
- Bewerbungsansichten fuer Kandidaten und Unternehmen implementieren
- Admin-Ansichten funktional ausbauen
- Pagination oder Endless Feed fuer Kandidaten-Jobliste produktiv anbinden

## Profile und Datenmodell

- restliche Kandidatenprofilfelder im UI nutzbar machen oder bewusst aus dem Modell ausklammern
- klaeren, ob `companyName` in der Firmenprofilseite bearbeitbar sein soll
- Timestamp-Typing praezisieren, falls kuenftige Aufgaben staerkere Typisierung verlangen

## Firebase und Sicherheit

- lokalen Repo-Stand der Firestore Rules mit dem echten Console-Stand abgleichen
- dokumentieren, welche Rules-Datei die gueltige Quelle sein soll
- Firestore Rules fuer `jobPosts` mit Erstellen, Bearbeiten, Veröffentlichen und Archivieren pruefen
- Admin-Setup und erwartete User-Dokumente dokumentieren, sobald vorhanden

## UX und Navigation

- eigene Dashboard-Navigation fuer geschuetzte Bereiche einfuehren
- Platzhalterseiten visuell ans Hauptsystem angleichen oder spaeter ersetzen
- pruefen, ob `candidate/applications` bis zur echten Umsetzung besser auf einen Platzhalter statt auf die Profilseite zeigen soll

## Deployment und Qualitaet

- PWA- und Offline-Verhalten im Browser verifizieren
- Build und Hosting periodisch gegen GitHub Pages pruefen
- moegliche Tests fuer Guards, AuthFlow und Profile erweitern
