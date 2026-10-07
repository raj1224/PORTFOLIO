# Raj Portfolio Frontend

Production-oriented React + TypeScript frontend wired to the supplied Portfolio API.

## Stack
- React 19 + TypeScript
- Vite
- React Router
- TanStack Query
- Axios with cookie credentials + automatic access-token refresh
- Tailwind CSS v4
- Lucide React

## Run
```bash
cp .env.example .env
npm install
npm run dev
```

Default frontend: `http://localhost:5173`
Backend API: `http://localhost:8000/api/v1`

## Admin
Open `/admin/login` and sign in with the admin account created by the backend.

Protected admin sections:
- `/admin/dashboard`
- `/admin/projects`
- `/admin/skills`
- `/admin/current-status`
- `/admin/profile`

## API mapping
Public:
- GET `/projects`
- GET `/projects/:slug`
- GET `/skills`
- GET `/current-status`
- GET `/github/profile`
- GET `/github/repos`
- GET `/github/contributions`
- GET `/leetcode/dashboard`

Admin:
- Auth login/current-user/refresh/logout
- Project CRUD + thumbnail/screenshots
- Skill CRUD
- Current-status CRUD
- Profile update + avatar/resume upload

## Auth behavior
The frontend sends cookies with every request. If an authenticated request returns 401, Axios attempts `/auth/refresh-token` once and retries the original request. `/auth/current-user` returning 401 before login is treated as an unauthenticated session and does not break the UI.

## Backend limitation handled by the frontend
The supplied backend currently exposes `/profile/me` only as an authenticated route. Therefore public Home content does not depend on that private endpoint; public projects, skills, current-status, GitHub and LeetCode use their actual public API endpoints. Contact uses a mailto flow because the supplied backend has no contact-message endpoint.

## Important
Do not put GitHub tokens, JWT secrets, Cloudinary secrets or other backend secrets in this frontend `.env`. Only `VITE_*` values belong here.
