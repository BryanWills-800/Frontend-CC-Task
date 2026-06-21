# Deployment Notes

## Production Build

Run:

```bash
npm run build
```

Then:

```bash
npm run start
```

## Hosting

The project can be hosted on platforms that support Next.js App Router applications.

## Important Auth Note

In production, the auth cookie is configured for safer browser behavior. If the app is served over plain HTTP in a production-like environment, secure cookie behavior can prevent the browser from sending the cookie.

Use HTTPS for production deployments.

## Data Storage

The current app stores users in:

```text
data/user.json
```

This is not a durable production database. A production deployment should replace this with a real database and migration process.

## Recommended Production Upgrades

- Replace plain-text passwords with hashed passwords.
- Replace credential-bearing cookies with opaque session IDs.
- Move user storage into a database.
- Add CSRF protection for state-changing auth routes.
- Add rate limiting to login and signup.
- Add account deletion audit logging if required by the product.

