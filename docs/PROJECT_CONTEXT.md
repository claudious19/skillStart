# PROJECT_CONTEXT

## Produktzweck

SkillStart positioniert sich als Einstiegsplattform nach der Lehre. Die Produktbotschaft ist im Code und in der Landingpage klar auf Potenzial, sichtbare Arbeitsproben und erste echte Chancen ausgerichtet.

Aktuelle Leitbotschaften im UI:

- `Deine erste echte Chance nach der Lehre.`
- `Zeig, was du kannst. Finde, wo du wachsen kannst.`

## Zielgruppen

Im aktuellen Code sind drei technische Rollen sichtbar:

- `candidate`
- `company`
- `admin`

Produktseitig werden vor allem zwei Hauptgruppen angesprochen:

- Kandidatinnen und Kandidaten nach der Lehre
- Unternehmen, die Junior-Talente suchen

`admin` ist im Routing vorhanden, aber aktuell nur als Platzhalterbereich implementiert.

## Was aktuell wirklich umgesetzt ist

- Marketing-Landingpage mit klarer CTA-Fuehrung zu Registrierung und Login
- Rollenwahl fuer die Registrierung
- Kandidaten-Registrierung mit Firebase Anonymous Auth und spaeterem Linking auf E-Mail/Passwort
- Unternehmens-Registrierung mit demselben Auth-Ansatz
- Login, Logout und Passwort-Reset
- Geschuetzte Bereiche fuer `candidate`, `company` und `admin`
- Bearbeitbare Kandidaten- und Firmenprofile
- GitHub-Pages-geeignete Angular-Konfiguration mit Hash-Routing
- PWA-Grundlagen mit Manifest und Angular Service Worker

## Was aktuell noch nicht vollstaendig umgesetzt ist

- Job-Post-Erstellung und Job-Post-Listen sind nur vorbereitet
- Bewerbungsansichten sind nur vorbereitet
- Admin-Bereiche sind nur vorbereitet
- Es gibt noch keine sichtbare Kandidaten- oder Firmen-Suche
- Es gibt keine ausgebauten Review-Workflows im Frontend

## Abgeleitete Produktgrenzen aus dem Code

- Die App ist aktuell klar frontend-only angelegt.
- Firebase wird direkt aus Angular heraus verwendet.
- Es gibt keine eigene Backend-Schicht im Repository.
- Das Datenmodell ist bereits auf Rollen, Profile und spaetere Job-Features vorbereitet, aber nur teilweise im UI nutzbar.
