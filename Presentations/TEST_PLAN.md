# Test Plan

## Build And Static Checks

Run:

```bash
npx tsc --noEmit
npm run build
```

Run linting:

```bash
npm run lint
```

## Auth Checks

Verify these flows manually:

- Logged-out user opens `/dashboard` and is redirected to `/login`.
- Logged-in user opens `/login` and is redirected to `/dashboard`.
- Login redirects directly to `/dashboard` without requiring a refresh.
- Logout clears auth state, changes the navbar back to Login, and redirects to `/`.
- Refreshing `/` after logout still shows Login.
- Delete Account removes the user record from `data/user.json`, clears auth state, and redirects to `/`.

## Dashboard Checks

Verify:

- Dashboard loads current ISS telemetry.
- New telemetry records appear every 10 seconds while polling is running.
- Pause stops polling.
- Resume restarts polling.
- Clear removes history and resets pagination.
- CSV export works after telemetry exists.
- PDF export works after telemetry exists.

## Regression Areas

Focus extra testing on:

- Auth cookie behavior after route handler changes
- Client navigation immediately after login
- `proxy.ts` redirect behavior
- JSON parsing and writing in `data/user.json`
- ISS API error handling when the external service is unavailable

