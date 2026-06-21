# SkillStart Agent Rules

## Purpose

SkillStart ist eine Angular- und Firebase-Plattform fuer den Berufseinstieg nach der Lehre. Die Arbeit in diesem Repository muss sich am echten Codezustand orientieren, nicht an Wunscharchitektur oder Annahmen.

## Required Reading Before Non-Trivial Work

Vor jeder nicht-trivialen Aufgabe zuerst die relevanten Dateien lesen:

- [`README.md`](C:\Users\claudio\Documents\SkillStart\README.md)
- [`docs/PROJECT_CONTEXT.md`](C:\Users\claudio\Documents\SkillStart\docs\PROJECT_CONTEXT.md)
- [`docs/PROJECT_STATE.md`](C:\Users\claudio\Documents\SkillStart\docs\PROJECT_STATE.md)
- [`docs/ARCHITECTURE.md`](C:\Users\claudio\Documents\SkillStart\docs\ARCHITECTURE.md)
- [`docs/ROUTES.md`](C:\Users\claudio\Documents\SkillStart\docs\ROUTES.md) bei Routing-Aenderungen
- [`docs/DATA_MODEL.md`](C:\Users\claudio\Documents\SkillStart\docs\DATA_MODEL.md) bei Modell-, Rollen- oder Firestore-Aenderungen
- [`docs/FIREBASE.md`](C:\Users\claudio\Documents\SkillStart\docs\FIREBASE.md) bei Auth-, Firestore-, Rules- oder Deployment-Aenderungen
- [`docs/DESIGN_SYSTEM.md`](C:\Users\claudio\Documents\SkillStart\docs\DESIGN_SYSTEM.md) bei UI-Arbeit
- [`docs/DECISIONS.md`](C:\Users\claudio\Documents\SkillStart\docs\DECISIONS.md) bei Struktur- oder Architekturfragen
- [`docs/TODO.md`](C:\Users\claudio\Documents\SkillStart\docs\TODO.md) fuer bekannte Luecken und Risiken

## Core Behaviour

- Code immer vor Aenderungen inspizieren.
- Nur dokumentieren oder implementieren, was im Repository wirklich existiert.
- Bestehende Platzhalter, Teilimplementierungen und Risiken klar benennen.
- Dokumentation ist Teil der Implementierung, kein optionaler Nachtrag.
- Keine Secrets committen.
- Keine Backend- oder Serverlogik einfuehren, ausser sie wird explizit verlangt.
- `pnpm` fuer Install, Build und Scripts verwenden.
- Normale Git-Befehle verwenden. Kein GitHub CLI, ausser der User verlangt es explizit.

## Branch Workflow

- Fuer jede neue Aufgabe einen neuen Branch erstellen.
- Vor dem Arbeiten `git status` pruefen.
- Bestehende lokale Aenderungen nie stillschweigend verwerfen.
- Nicht direkt in einen fremden oder unklaren Branch hineinfixen, ohne den aktuellen Zustand zu verstehen.

## Documentation Update Rules

Diese Dateien muessen aktualisiert werden, wenn ihr Thema betroffen ist:

- `docs/PROJECT_STATE.md` bei Statusaenderungen, neuen Features, entfallenen Features oder neuen Risiken
- `docs/ARCHITECTURE.md` bei Struktur-, Service-, Guard-, Routing- oder Provider-Aenderungen
- `docs/ROUTES.md` bei neuen, geaenderten oder umgeleiteten Routen
- `docs/DATA_MODEL.md` bei Feld-, Collection-, Rollen- oder Firestore-Modellaenderungen
- `docs/FIREBASE.md` bei Auth-, Firestore-, Environment-, Rules- oder Hosting-Aenderungen
- `docs/DESIGN_SYSTEM.md` bei relevanten UI-System-, Token-, Layout- oder Komponenten-Aenderungen
- `docs/DECISIONS.md` wenn eine neue technische oder produktrelevante Leitentscheidung getroffen wird
- `docs/TODO.md` wenn neue offene Punkte entstehen oder erledigt wurden
- `docs/CHANGELOG_INTERNAL.md` nach jeder abgeschlossenen Aufgabe

Pflicht zur Doku-Aktualisierung besteht insbesondere bei Aenderungen an:

- Routen
- Datenmodell
- Firebase
- Auth
- Rollenlogik
- UI-System
- Deployment
- Business-Logik
- Projektstruktur

## UI Work

Bei UI-, Layout-, Responsive- oder UX-Aufgaben zuerst passende Skills verwenden:

- `cleanui` fuer saubere, nicht-generische UI-Entscheidungen
- `ui-ux-pro-max` fuer staerkere visuelle Richtung und UX-Verfeinerung
- `build-web-apps:frontend-app-builder` fuer groessere Frontend-Umsetzungen oder Redesigns
- `build-web-apps:frontend-testing-debugging` und `Browser` fuer visuelle Pruefung und Regressionstests

UI-Aenderungen muessen das mobile Verhalten und groessere Screens mitdenken.

## Command Rules

- Bevor PowerShell-spezifische Alternativen fuer einfache Datei- oder Textinspektion genutzt werden, pruefen, ob ein Linux-artiger Befehl aus [`docs/linux-compatible-commands.md`](C:\Users\claudio\Documents\SkillStart\docs\linux-compatible-commands.md) geeignet ist.
- Fuer Text- und Dateisuche `rg` bevorzugen.
- Git-Operationen mit normalen Git-Befehlen durchfuehren.

## Final Response Requirements

Die Abschlussantwort nach einer Aufgabe muss enthalten:

- aktuellen Branch
- geaenderte Code-Dateien
- geaenderte Doku-Dateien
- Verhaltensaenderungen
- Build-Ergebnis
- Risiken oder Follow-up
