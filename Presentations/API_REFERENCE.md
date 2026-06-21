# API Reference

## Local Auth API

Base path:

```text
/api/auth
```

The shared Axios client is exported from:

```text
app/lib/api.ts
```

### POST /api/auth/login

Request:

```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

Success:

```json
{
  "isLoggedIn": true,
  "email": "user@example.com"
}
```

Behavior:

- Validates the user against `data/user.json`.
- Sets the `auth-token` cookie.

### POST /api/auth/logout

Success:

```json
{
  "isLoggedIn": false
}
```

Behavior:

- Clears the `auth-token` cookie.

### GET /api/auth/session

Success:

```json
{
  "isLoggedIn": true,
  "email": "user@example.com"
}
```

Logged out:

```json
{
  "isLoggedIn": false,
  "email": null
}
```

Behavior:

- Reads the `auth-token` cookie.
- Returns the decoded email when available.

### DELETE /api/auth/account

Success:

```json
{
  "isLoggedIn": false
}
```

Behavior:

- Requires an auth cookie.
- Removes the logged-in account from `data/user.json`.
- Clears the auth cookie.

## External ISS API

Base URL:

```text
https://api.wheretheiss.at
```

Endpoint used by the dashboard:

```text
GET /v1/satellites/25544
```

The dashboard expects fields including:

```text
timestamp
latitude
longitude
altitude
velocity
```

