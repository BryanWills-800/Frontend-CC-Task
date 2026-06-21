# Security Notes

## Current Status

This project currently uses a demo authentication model.

Known limitations:

- User data is stored in a local JSON file.
- Passwords are stored in plain text.
- The auth cookie stores encoded credential data by requirement.
- There is no rate limiting.
- There is no CSRF protection for state-changing routes.
- Account deletion is immediate after client confirmation.

## Why This Matters

Encoded data is not encrypted. Anyone who can read the raw cookie value can decode it. HTTP-only helps protect the cookie from client-side JavaScript access, but it does not make credential data safe to store in the cookie.

## Recommended Production Direction

For a production app:

- Store users in a database.
- Hash passwords with a modern password hashing function.
- Store only an opaque session ID in the cookie.
- Keep session data server-side.
- Add CSRF protection.
- Add rate limiting to login and signup.
- Add audit records for account deletion.
- Require re-authentication before destructive account actions.

## Minimum Safer Demo Improvements

If this stays a demo but continues to evolve:

- Stop storing passwords in cookies.
- Add a generated session ID.
- Add a small server-side session store.
- Add clearer account deletion warnings.
- Add tests around cookie clearing and protected route redirects.

