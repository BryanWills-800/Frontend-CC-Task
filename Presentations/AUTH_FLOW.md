# Auth Flow

## Files

```text
app/api/auth/login/route.ts
app/api/auth/logout/route.ts
app/api/auth/session/route.ts
app/api/auth/account/route.ts
app/context/AuthContext.tsx
app/components/AuthButtons.tsx
app/components/LoginButton.tsx
app/components/LogoutButton.tsx
app/components/DeleteAccountButton.tsx
proxy.ts
```

## Cookie

The app uses:

```text
auth-token
```

The cookie is set server-side by the login route. It uses HTTP-only cookie options and stores an encoded JSON payload containing the logged-in email and password, matching the current project requirement.

## Login

1. The login page collects email and password.
2. `AuthContext.login(email, password)` calls `POST /api/auth/login`.
3. The route validates the user against `data/user.json`.
4. The route sets `auth-token`.
5. The client updates auth state.
6. The login page navigates directly to `/dashboard`.

## Session Check

On mount, `AuthContext` calls:

```text
GET /api/auth/session
```

The session route checks whether the auth cookie exists and returns the current auth state and email.

## Logout

1. The Logout button calls `AuthContext.logout()`.
2. `POST /api/auth/logout` clears the auth cookie.
3. Client auth state becomes logged out.
4. The navbar switches from Logout/Delete Account to Login.
5. The app redirects to `/`.

## Delete Account

1. The Delete Account button asks for confirmation.
2. `AuthContext.deleteAccount()` calls `DELETE /api/auth/account`.
3. The route reads the current auth cookie.
4. The account is removed from `data/user.json`.
5. The auth cookie is cleared.
6. Client auth state becomes logged out.
7. The app redirects to `/`.

## Route Protection

`proxy.ts` controls auth redirects:

- Authenticated users visiting `/login` or `/signup` go to `/dashboard`.
- Logged-out users visiting `/dashboard` or `/iss-tracking` go to `/login`.
- `/` remains public.

