# Setup Guide

## Prerequisites

- Node.js compatible with Next.js 16
- npm

## Install

```bash
npm install
```

## Run Locally

```bash
npm run dev
```

Then open:

```text
http://localhost:3000
```

## Build

```bash
npm run build
```

## Start Production Build

```bash
npm run start
```

## Verify Types

```bash
npx tsc --noEmit
```

## Verify Linting

```bash
npm run lint
```

## Local Data

Demo account records are stored in:

```text
data/user.json
```

Keep this file valid JSON. If editing manually, preserve the array structure:

```json
[
  {
    "name": "Example User",
    "role": "User",
    "email": "user@example.com",
    "password": "password123"
  }
]
```

