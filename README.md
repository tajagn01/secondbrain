# SecondBrain

A modern, minimal, and responsive “second brain” web app. Save links to videos, tweets, and articles; view them as rich embedded cards; and share your curated brain with a public link.

## Features

- Clean, classic dashboard UI (mobile-first; great on laptop and phone)
- Add new content with title, link, and optional type (auto-detect supported)
- Embedded cards for YouTube and X/Twitter; links fallback for others
- Search and filter saved content
- Delete items with instant React Query cache updates
- Generate a public share link for your brain and view it at `/brain/:shareLink`
- Authentication (Sign Up / Sign In); auth stored in localStorage
- Robust loading/error states; responsive grid and sensible spacing

## Tech Stack

- Frontend: React + Vite, Tailwind CSS, React Router, TanStack React Query, react-tweet
- Backend: Node.js, Express, Mongoose (MongoDB)
- DB: MongoDB (local by default)

## Monorepo Structure

```text
backend/               # Express + Mongoose server
  server.js
  model/
    db.js
    middleware.js
frontend/              # React app (Vite)
  src/
    pages/            # Dashboard, SignIn, SignUp
    components/       # Dashboard widgets, Embed cards, Navbar
    shared/           # Public shared brain page
    ui/               # Reusable UI (Button, Input, Select, Card, Badge, Spinner)
    utils/            # API, auth, content parsing, date helpers
  index.html
  vite.config.js
```

## Requirements

- Node.js 18+
- MongoDB running locally at `mongodb://localhost:27017/second-brain`

## Backend — Setup & Run

1. Install dependencies
```bash
cd backend
npm install
```

2. Start the server
```bash
node server.js
```

- Server runs at `http://localhost:3000`
- CORS is enabled for local development
- Auth uses a simple JWT with a dev secret defined in code (`jwt_password = "123123"`)

### API Endpoints

Base URL: `http://localhost:3000`

- POST `/api/v1/signup`
  - Body: `{ "username": string, "password": string }`
  - Response: `{ message: string }`

- POST `/api/v1/signin`
  - Body: `{ "username": string, "password": string }`
  - Response: `{ token: string }`

- POST `/api/v1/content` (auth required)
  - Headers: `Authorization: <token>` (raw token, not Bearer)
  - Body: `{ title: string, link: string, type?: 'youtube'|'twitter'|'link'|'auto' }`
  - Response: `{ message: string }`

- GET `/api/v1/content` (auth required)
  - Headers: `Authorization: <token>`
  - Response: `{ content: Array<{ _id, title, link, userId, tags? }> }`

- DELETE `/api/v1/content` (auth required)
  - Headers: `Authorization: <token>`
  - Body: `{ contentId: string }`
  - Response: `{ message: string }`

- POST `/api/v1/sharebrain` (auth required)
  - Headers: `Authorization: <token>`
  - Response: `{ shareLink: string }` (slug)

- GET `/api/v1/brain/:shareLink`
  - Response: `{ content: Array<...> }` (public content for that user)

## Frontend — Setup & Run

1. Install dependencies
```bash
cd frontend
npm install
```

2. Start the dev server
```bash
npm run dev
```

- Vite serves at `http://localhost:5173`
- Ensure the backend is running on port 3000 before using the app

### Frontend Notes

- React Query manages data fetching, caching, and optimistic refresh on mutations
- Router guards: unauthenticated users are redirected to `/signin`
- Auth is saved in `localStorage` as `token` and `username`
- The backend expects the raw token in the `Authorization` header

## UI Overview

- Top Navbar: branding, current user, and Logout button
- Dashboard Grid (Home `/`):
  - Add New Content: Title, Type (auto-detect supported), Link; Add button
  - Your Content: search + filter; embedded cards; open/delete actions
  - Share Your Brain: generate a public link; copy to clipboard
- Public Page: `/brain/:shareLink` shows embedded cards with the same style

## Styling & Theming

- Tailwind CSS utility classes
- Classic look: white backgrounds, soft shadows, rounded corners, pastel accents
- Mobile-first responsive layout; graceful scaling to desktop

## Security & Production Considerations

- Replace dev JWT secret with a secure secret via environment variables
- Add password hashing (e.g., bcrypt) and validation for real-world use
- Configure CORS properly for your domains
- Use HTTPS in production

## Troubleshooting

- Tweets not rendering or overflowing:
  - We constrain tweet containers in CSS and apply `overflow-hidden` to cards
  - If a specific URL still misbehaves, open an issue with the URL

- MongoDB connection
  - Ensure MongoDB is running locally on the default port

- Ports already in use
  - Stop previous processes or change ports in `server.js` / Vite config

## Scripts

Backend:
```bash
node server.js
```

Frontend:
```bash
npm run dev       # start dev server
npm run build     # production build
npm run preview   # preview the production build
```

## License

MIT (c) Your Name