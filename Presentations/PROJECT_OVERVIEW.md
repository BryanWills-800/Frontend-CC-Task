# Project Overview

## Purpose

ISS Telemetry Dashboard is a Next.js application that lets users view live International Space Station telemetry after signing in with a local demo account.

The project is useful as a frontend/authentication learning project because it combines:

* Next.js App Router pages
* Next route handlers
* Next 16 `proxy.ts` request protection
* Client auth state through React context
* Axios API clients
* External telemetry polling
* CSV and PDF export workflows

## Primary User Flow

1. A visitor opens `/`.
2. The visitor selects Enter Orbit.
3. If the visitor is logged out, `proxy.ts` redirects `/dashboard` to `/login`.
4. After login, the app creates the server auth cookie and navigates directly to `/dashboard`.
5. The dashboard polls the ISS API every 10 seconds.
6. The user can pause polling, clear history, export telemetry, log out, or delete the account.
7. Logout and delete account both return the user to `/`.

## Important Implementation Notes

* `auth-token` is an HTTP-only cookie set by route handlers, not by direct client-side `document.cookie` writes.
* Local auth API calls use the shared `authApi` Axios instance in `app/lib/api.ts`.
* ISS telemetry calls use the shared `issApi` Axios instance in `app/lib/api.ts`.
* Route protection lives in root `proxy.ts`, not `middleware.ts`, to match the active Next.js version.
* Demo accounts are persisted in `data/user.json`.

## Current Limitations

* The user store is a local JSON file.
* Passwords are stored in plain text in the demo data file.
* The auth cookie contains encoded credential data by project requirement.
* This is not a production authentication system.

