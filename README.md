## Scowtt Web App

Elijah Nevel's Scowtt Home Assessment with the features:

- Google Sign-In with NextAuth + Prisma (PostgreSQL)

- Onboarding favorite movie using OpenAI fun facts on refresh.

### Prerequisites

- Node 18+
- PostgreSQL database
- Google Cloud OAuth credentials (Client ID/Secret)
- OpenAI API key

### 1) Environment

Create `.env` in project root:

```
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=replace-with-random-string
NEXT_PUBLIC_BASE_URL=http://localhost:3000

GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-google-client-secret

DATABASE_URL=postgresql://USER:PASSWORD@HOST:5432/DBNAME?schema=public

OPENAI_API_KEY=sk-your-openai-api-key
```

Generate a strong secret (one-time):

```
npx auth secret
```

### 2) Install

```
npm install
```

### 3) Prisma

```
npx prisma generate
npx prisma migrate dev --name init
```

### 4) Google OAuth setup

In Google Cloud Console:

- Configure OAuth consent screen (External) → Publish
- Create OAuth client (Web application)
  - Authorized JavaScript origins: `http://localhost:3000`
  - Authorized redirect URIs: `http://localhost:3000/api/auth/callback/google`
- Put the values into `.env`

### 5) Run

```
npm run dev
```

Open `http://localhost:3000` → Login → Onboarding → Dashboard.

### Routes

- `/login`: Sign in with Google
- `/onboarding`: Ask favorite movie (first-time)
- `/dashboard`: Shows name, email, photo, favorite movie, fun fact (changes on refresh)

### Notes

- Sessions stored in DB via Prisma adapter (run migrations first)
- Images from Google are allowed in `next.config.js`
