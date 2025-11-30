# Contribution Summary

This repository implements a Student Wellness frontend (React + Vite).

What I implemented during the review:

- A mock API (`src/services/mockApi.js`) used when `VITE_USE_MOCK=true` for offline/frontend-only development.
- Unified API service (`src/services/api.js`) that delegates to mock or real backend depending on `VITE_USE_MOCK`.
- Client-side routing with `react-router-dom` and protected routes (`src/components/ProtectedRoute.jsx`).
- Login and Register pages with client-side validation and loading/error states (`src/pages/Login.jsx`, `src/pages/Register.jsx`).
- Admin and Student dashboards, resource & program managers that perform CRUD via the API service.
- Improved navigation (`src/components/Nav.jsx`) with links and role-aware navigation.
- Added NotFound page and improved app routing in `src/App.jsx`.
- Small UX improvements: disabled submit buttons on invalid input, simple client-side validation, loading indicators.

How to run:

1. Frontend only (mock):
   - cd frontend
   - npm install
   - npm run dev
   - Ensures `frontend/.env` has `VITE_USE_MOCK=true`.

2. Full stack (backend + frontend):
   - Start backend (instructions in repo root or use in-memory Mongo via provided flags)
   - Set `VITE_USE_MOCK=false` and `VITE_API_URL=http://localhost:5000` in `frontend/.env`, restart frontend.

Notes for contributors

- Keep API calls centralized in `src/services/api.js`.
- Components should be small and focused; extract repeated UI (cards, buttons) if needed.
- Add tests for services and components where possible.

Suggested commit message structure

- feat(auth): add login/register with validation
- feat(routing): add react-router and protected routes
- feat(api): add mock API and unified api service
- fix(mock): normalize API paths between mock and real backend
- docs: add CONTRIBUTING.md and usage notes

Thank you for reviewing — reach out if you'd like me to continue improving styles, accessibility, or tests.
