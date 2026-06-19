# SkillStart Color System

## Purpose

This document defines the official color concept for SkillStart.

SkillStart must look:

- professional
- trustworthy
- modern
- focused on growth
- suitable for apprentices, graduates and companies

SkillStart must not look:

- like a gaming platform
- like a social media app
- like a generic job board
- like a government portal
- childish or overly playful

---

## Brand Direction

SkillStart is a career platform for apprentices after graduation.

The visual identity should communicate:

- trust
- competence
- potential
- growth
- clarity
- professional opportunity

The color system uses:

- Indigo for trust, technology and professionalism
- Teal for growth, progress and opportunity
- Neutral slate tones for readability and structure

---

## Core Colors

| Token | Hex | Usage |
|---|---:|---|
| `primary` | `#4F46E5` | Main brand color, primary buttons, company-related highlights |
| `secondary` | `#14B8A6` | Growth accent, candidate-related highlights, positive emphasis |
| `background` | `#F8FAFC` | Main app background |
| `surface` | `#FFFFFF` | Cards, forms, panels, modals |
| `text` | `#0F172A` | Main text |
| `text-secondary` | `#475569` | Secondary text, descriptions, helper text |
| `border` | `#CBD5E1` | Borders, dividers, input outlines |
| `muted` | `#E2E8F0` | Disabled states, subtle surfaces |
| `success` | `#22C55E` | Approved states, successful actions |
| `warning` | `#F59E0B` | Pending states, incomplete profiles, warnings |
| `error` | `#EF4444` | Errors, rejected states, destructive actions |

---

## Primary Color

### Indigo

```text
#4F46E5
```

Use for:

- primary calls to action
- company area highlights
- navigation active states
- important links
- key brand elements

Meaning:

- professional
- technical
- trustworthy
- modern

---

## Secondary Color

### Teal

```text
#14B8A6
```

Use for:

- candidate skill highlights
- growth indicators
- badges for certificates and projects
- positive profile elements
- progress markers

Meaning:

- growth
- development
- opportunity
- movement

---

## Neutral Colors

### Background

```text
#F8FAFC
```

Use for:

- page background
- app shell background
- public landingpage background

### Surface

```text
#FFFFFF
```

Use for:

- cards
- forms
- panels
- modals
- profile sections

### Main Text

```text
#0F172A
```

Use for:

- headings
- body text
- important labels

### Secondary Text

```text
#475569
```

Use for:

- descriptions
- metadata
- helper text
- secondary labels

---

## Status Colors

### Success

```text
#22C55E
```

Use for:

- approved profiles
- approved job posts
- successful form submissions
- completed steps

### Warning

```text
#F59E0B
```

Use for:

- pending review
- incomplete profiles
- needs changes
- quality warnings

### Error

```text
#EF4444
```

Use for:

- rejected profiles
- rejected job posts
- validation errors
- destructive actions

---

## Role Color Usage

SkillStart has two major product roles.

### Candidate

Use teal accents for candidate-related UI.

Examples:

- candidate profile badges
- skills
- certificates
- IPA projects
- career goals
- application progress

Primary accent:

```text
#14B8A6
```

### Company

Use indigo accents for company-related UI.

Examples:

- job posts
- company profiles
- employer dashboard
- candidate search
- publishing actions

Primary accent:

```text
#4F46E5
```

Admin UI should stay neutral and functional. Do not create a strong admin-specific brand color unless explicitly requested.

---

## Gradients

Use gradients sparingly.

Recommended hero gradient:

```css
background: linear-gradient(
  135deg,
  #4F46E5 0%,
  #14B8A6 100%
);
```

Use for:

- landingpage hero
- important marketing sections
- subtle decorative elements

Do not use gradients for:

- normal buttons
- forms
- dense dashboard UI
- status indicators

---

## Buttons

### Primary Button

```text
Background: #4F46E5
Text:       #FFFFFF
Hover:      darker indigo
```

Use for:

- register
- login
- save
- submit
- publish
- apply

### Secondary Button

```text
Background: #FFFFFF
Border:     #CBD5E1
Text:       #0F172A
Hover:      #F8FAFC
```

Use for:

- cancel
- back
- secondary navigation
- optional actions

### Candidate Action Button

Use teal only when the action is strongly candidate-specific.

```text
Background: #14B8A6
Text:       #FFFFFF
```

Examples:

- add skill
- add project
- complete profile section

---

## Cards

Default card:

```text
Background: #FFFFFF
Border:     #E2E8F0
Text:       #0F172A
```

Card rules:

- Use white cards on light background.
- Avoid heavy shadows.
- Prefer subtle borders.
- Use rounded corners consistently.
- Keep cards readable on mobile.

---

## Forms

Input default:

```text
Background: #FFFFFF
Border:     #CBD5E1
Text:       #0F172A
Placeholder:#94A3B8
```

Input focus:

```text
Border:     #4F46E5
Ring:       soft indigo
```

Validation error:

```text
Border:     #EF4444
Message:    #EF4444
```

---

## Review Status Mapping

| Review Status | Color |
|---|---:|
| `draft` | `#475569` |
| `pending` | `#F59E0B` |
| `approved` | `#22C55E` |
| `rejected` | `#EF4444` |
| `needs_changes` | `#F59E0B` |

---

## Tailwind Token Mapping

Use these tokens in Tailwind configuration or equivalent CSS variables.

```js
theme: {
  extend: {
    colors: {
      primary: '#4F46E5',
      secondary: '#14B8A6',
      background: '#F8FAFC',
      surface: '#FFFFFF',
      text: '#0F172A',
      'text-secondary': '#475569',
      border: '#CBD5E1',
      muted: '#E2E8F0',
      success: '#22C55E',
      warning: '#F59E0B',
      error: '#EF4444'
    }
  }
}
```

---

## CSS Variable Mapping

If CSS variables are used, define them like this:

```css
:root {
  --color-primary: #4F46E5;
  --color-secondary: #14B8A6;
  --color-background: #F8FAFC;
  --color-surface: #FFFFFF;
  --color-text: #0F172A;
  --color-text-secondary: #475569;
  --color-border: #CBD5E1;
  --color-muted: #E2E8F0;
  --color-success: #22C55E;
  --color-warning: #F59E0B;
  --color-error: #EF4444;
}
```

---

## Accessibility Rules

- Text must meet WCAG contrast requirements.
- Do not place teal text on white for important body text unless contrast is verified.
- Do not communicate status by color alone.
- Always combine status colors with text labels or icons.
- Buttons must have visible focus states.
- Links must be visually distinguishable from normal text.

---

## Usage Rules for Agents

When implementing SkillStart UI:

- Use this color system.
- Do not invent new brand colors.
- Do not replace indigo and teal with another palette.
- Do not use random Tailwind default colors unless mapped to this system.
- Use neutral colors for layout and structure.
- Use role colors consistently:
  - teal for candidates
  - indigo for companies
- Use status colors only for actual status feedback.

If a design prompt conflicts with this document:

1. Follow explicit user instructions.
2. Follow the active prompt.
3. Follow this color system.
4. Follow existing project conventions.
