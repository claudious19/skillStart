# DESIGN_SYSTEM

## Grundausrichtung

Die aktuelle UI ist mobil zuerst gedacht und arbeitet mit hellen Flaechen, klaren Karten, violett-tuerkiser Markenfuehrung und grosszuegigen Abstaenden. Die Landingpage setzt staerker auf Marketingwirkung, waehrend Auth- und Profilseiten auf Klarheit und Formularfuehrung optimiert sind.

## Design-Tokens

Globale Tokens liegen in:

- [`src/styles.css`](C:\Users\claudio\Documents\SkillStart\src\styles.css)

Zentrale Farben:

- `--color-primary: #4f46e5`
- `--color-secondary: #14b8a6`
- `--color-background: #f8fafc`
- `--color-surface: #ffffff`
- `--color-text: #0f172a`
- `--color-text-secondary: #475569`
- `--color-border: #cbd5e1`

Zentrale Radiuswerte:

- `--radius-sm: 0.5rem`
- `--radius-md: 0.75rem`
- `--radius-lg: 1rem`

Zentrale Schatten:

- `--shadow-sm: 0 1px 2px rgba(15, 23, 42, 0.05)`
- `--shadow-md: 0 14px 34px rgba(15, 23, 42, 0.08)`

Desktop-Anpassung ab `1024px`:

- staerkere Border-Farbe
- staerkere Karten- und Layout-Schatten

## Typografie

- Basisschrift: `"Segoe UI", system-ui, -apple-system, BlinkMacSystemFont, sans-serif`
- Hero-Promise auf der Landingpage verwendet bewusst Serif-Kontrast ueber `Georgia, "Times New Roman", serif`

## Wiederverwendete UI-Bausteine

Globale Primitive:

- `.ui-card`
- `.ui-button`
- `.ui-button--primary`
- `.ui-button--secondary`
- `.ui-input`
- `.ui-badge`
- `.status-badge`

Gemeinsame Seitensysteme:

- Auth-Seiten teilen `auth-page.shared.css`
- Kandidaten- und Firmenprofil teilen `profile-page.shared.css`
- Profilseiten arbeiten mit einem zweistufigen Layout aus Hauptformular und ergänzender Seitenleiste
- Profil-Header sind als symmetrische Zwei-Zonen-Komposition aufgebaut: Inhaltsblock links, feste Aktionsspalte rechts
- Profil-Header halten den Titel bewusst etwas schmaler und die Einleitung mit mehr Luft, damit kein Text optisch kollidiert
- Formularfelder in den Profilgittern sind top-aligned, damit die Spalten sauber synchron bleiben
- Pflichtfelder und optionale Felder werden im Kandidatenprofil direkt im Label gekennzeichnet
- `Abschlussjahr` ist im Kandidatenprofil Pflichtfeld
- `Standort` wird im Kandidatenprofil als `Wohnort` angezeigt
- Kommagetrennte Felder im Abschnitt `Stärken und Ziele` bleiben leer speicherbar; Kommas werden nur verarbeitet, wenn Inhalte vorhanden sind
- Stelleninserate verwenden eine eigene ruhige Verwaltungsoberflaeche mit Listen-Cards, klaren Status-Badges und separatem Formularfluss

## Landingpage-System

Eigene Landing-Struktur:

- Header mit Brand, Anchor-Navigation und CTA
- Hero mit Copy und Profil-Panel
- Proof-Band
- Problem-/Warum-Sektion
- Drei-Schritte-Sektion
- Rollen-Sektion
- Final CTA
- Footer

Kennzeichen:

- grosser Gradient-Hero
- Karten fuer Rollen und Problemargumente
- scrollbare Proof-Badges auf kleinen Screens
- Profil-Header setzen Status und Hinweis-Chips untereinander, damit auf Desktop kein Text kollidiert

## Formularsystem

Auth- und Profilformulare verwenden:

- klare Einspalten-Layouts auf Mobile
- Zwei-Spalten-Layouts erst auf groesseren Screens
- gegliederte Abschnittskarten fuer laengere Profile
- Inline-Fehlerfuehrung auf Kandidaten- und Firmenprofil
- Inline-Fehlerfuehrung und sichtbare Pflichtfeldhinweise im Stelleninserat-Formular
- Kommagetrennte Inseratsfelder werden als Listen erfasst und gegen leere Eintraege validiert

## Responsive Verhalten

Mobile zuerst:

- kompakte Karten
- vertikale Formular- und CTA-Stapel
- grosse Touch-Ziele

Desktop:

- breitere Grid-Layouts
- sichtbarere Kartenkonturen und Schatten
- Header- und Hero-Aufteilung in Spalten
- Profil-Header nutzen feste Aktionsbreiten und einen separaten Meta-Bereich, damit Status und Zusatzhinweise nicht in den Fliesstext kippen
- Profil-Header reduzieren die Titelflaeche auf Desktop zugunsten sauberer vertikaler Abstaende
- Profil-Felder richten sich im Grid am oberen Rand aus statt sich strecken zu lassen
- Optionale Nachweisfelder bleiben bewusst leer speicherbar, um den Profilaufbau nicht zu blockieren
- Inseratslisten wechseln von gestapelten Karten auf Mobile zu zweigeteilten Karten mit Aktionsspalte auf groesseren Screens

## Aktuelle UI-Grenzen

- Kein eigenes Komponenten-Designsystem ausserhalb von CSS-Klassen
- Keine dedizierte Navigationsstruktur innerhalb geschuetzter Dashboards
- Platzhalterseiten nutzen noch eine einfachere, vom Kernsystem abweichende Kartenoptik
