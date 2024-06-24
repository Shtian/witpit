# The Wit Pit 🧠

Collect and share your knowledge in the WitPit! Supports comments and an OpenAI powered writing assistant.

## Developing

Prerequisites:

- Node.js
- pnpm
- Supabase CLI

Start Supabase:

```bash
supabase start
# or check status
supabase status
```

Enter the details from the status page into `.env.example` and rename it to `.env`. You probably might want to add a real or fake OpenAI API key and Assistant ID to avoid crashing the app.

Reset the DB to run migrations and seed data:

```bash
supabase db reset
```

This will add 10 users to the local database with the username `user{1-10}@example.com` and password `password123`.

Start developing:

```bash

pnpm install

pnpm dev
```

## Building

To create a production version:

```bash
npm run build
```

You can preview the production build with `npm run preview`.
