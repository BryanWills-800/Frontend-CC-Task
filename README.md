# ISS Telemetry Dashboard

A Next.js 16 application for viewing live International Space Station telemetry. The app includes local demo authentication, protected dashboard routes, account deletion, CSV/PDF telemetry exports, and a shared Axios layer for ISS and local auth API calls.

## Features

* Real-time ISS telemetry from `https://api.wheretheiss.at`
* Dashboard polling every 10 seconds
* Current latitude, longitude, altitude, velocity, and timestamp display
* Pagination for telemetry history
* Pause, resume, clear, CSV export, and PDF export controls
* Login, signup, logout, and delete account flows
* Server-side auth cookie management through Next route handlers
* Next 16 `proxy.ts` request gate for protected routes

## Tech Stack

* Next.js 16 App Router
* React 19
* TypeScript
* Tailwind CSS
* Axios
* jsPDF
* Local JSON-backed demo user store

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Available Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
```

## Demo Accounts

Demo users are stored in `data/user.json`. This project is currently designed for local/demo use, not production identity management.

To test the app without creating a new account, open `/login` and use any of these demo credentials:

|Account|Email|Password|
|-|-|-|
|Admin|`admin@example.com`|`password123`|
|Dummy User|`dummy@gmail.com`|`dummy123`|
|User|`user@email.com`|`user`|
|User2|`user2@email.com`|`user2`|

After a successful login, the app should take you directly to `/dashboard`. If you are already logged in and visit `/login` or `/signup`, the app redirects you to `/dashboard` automatically.

The auth cookie intentionally contains encoded email and password data because that behavior is part of the current project requirements. Treat this as a learning/demo implementation. For production, replace it with a real database, password hashing, and opaque session tokens.

## Routing And Auth

* `/` is the public main page.
* `/login` and `/signup` are public auth pages.
* `/dashboard` is protected.
* Authenticated users visiting `/login` or `/signup` are redirected to `/dashboard`.
* Unauthenticated users visiting `/dashboard` are redirected to `/login`.
* Logout clears the server auth cookie, updates client state, switches the navbar back to Login, and redirects to `/`.
* Delete Account removes the logged-in account from the demo user store, clears auth state, and redirects to `/`.

## Project Structure

```text
app/
  api/auth/          Local auth route handlers
  components/        App-specific navigation/auth UI
  context/           AuthContext client state
  dashboard/         ISS telemetry dashboard
  lib/               Shared Axios clients and helpers
components/ui/       Shared UI primitives
data/user.json       Demo user store
public/              Static imagery and icons
types/               Shared TypeScript types
proxy.ts             Next 16 route protection
```

## Documentation

Additional project documents are available in [`Presentations/`](./Presentations). Start with the documentation index:

* [`Presentations/README.md`](./Presentations/README.md)

The folder also includes:

* [`PROJECT\_OVERVIEW.md`](./Presentations/PROJECT_OVERVIEW.md)
* [`SETUP\_GUIDE.md`](./Presentations/SETUP_GUIDE.md)
* [`AUTH\_FLOW.md`](./Presentations/AUTH_FLOW.md)
* [`API\_REFERENCE.md`](./Presentations/API_REFERENCE.md)
* [`TEST\_PLAN.md`](./Presentations/TEST_PLAN.md)
* [`DEPLOYMENT\_NOTES.md`](./Presentations/DEPLOYMENT_NOTES.md)
* [`CONTRIBUTING.md`](./Presentations/CONTRIBUTING.md)
* [`SECURITY\_NOTES.md`](./Presentations/SECURITY_NOTES.md)

## Build Verification

Before opening a pull request or deploying, run:

```bash
npm run build
```

For type-only verification:

```bash
npx tsc --noEmit
```

## License

No license has been added yet. Add a license before publishing this repository for reuse by others.

