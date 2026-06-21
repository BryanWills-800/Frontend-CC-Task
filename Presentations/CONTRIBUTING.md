# Contributing

## Local Workflow

1. Install dependencies with `npm install`.
2. Run the app with `npm run dev`.
3. Make focused changes.
4. Verify with `npx tsc --noEmit`.
5. Verify the production build with `npm run build`.

## Code Style

* Prefer existing project patterns.
* Keep client state in React context only when shared by multiple components.
* Keep server-side auth changes in route handlers.
* Use the shared Axios clients from `app/lib/api.ts`.
* Keep route protection in `proxy.ts`.
* Avoid unrelated refactors in feature branches.

## Auth Changes

When changing auth behavior, update:

* Auth route handlers
* `AuthContext`
* Navbar/auth buttons
* `proxy.ts`
* Auth documentation in `Presentations/AUTH\_FLOW.md`
* Manual test cases in `Presentations/TEST\_PLAN.md`

## Dashboard Changes

When changing ISS telemetry behavior, update:

* `app/dashboard/page.tsx`
* `app/dashboard/ControlButtons.tsx`
* `app/dashboard/exportTelemetry.ts`
* API notes in `Presentations/API\_REFERENCE.md`
* Dashboard tests in `Presentations/TEST\_PLAN.md`

