# SkillStart Registration Fix

Diese Dateien ersetzen die bestehenden Dateien im Repository.

## Dateien

1. `src/app/core/services/auth-flow.service.ts`
   - Trimmt E-Mail, Firmenname und Kontaktpersonen-Felder zentral vor Registrierung.
   - Verwendet dieselbe getrimmte E-Mail für:
     - Firestore Draft-Write
     - Firebase Auth Email-Linking
     - Firestore `pending -> active` Update
   - Verhindert den Mismatch zwischen `request.auth.token.email` und `users/{uid}.email`.

2. `src/app/features/auth/components/company-register-page/company-register-page.component.ts`
   - Verbessert die Firestore-Fehlermeldung.
   - Navigiert nach erfolgreicher Firmenregistrierung direkt zu `/company/job-posts`.

## Test

```bash
pnpm install
pnpm build
```

Danach im Browser testen:

1. Firma registrieren
2. Prüfen: `users/{uid}.accountStatus` ist `active`
3. Prüfen: Weiterleitung nach `/company/job-posts`
