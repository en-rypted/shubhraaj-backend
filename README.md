# shubhraaj-backend

Node.js + Express + MongoDB backend for ShubhRaaj Interiors.

## Features
- Express API with JWT admin auth
- MongoDB via Mongoose
- bcryptjs password hashing
- Environment config via dotenv
- CORS enabled for the frontend

## Endpoints

Public:
- GET `/api/data` – return full website data

Admin (JWT required):
- POST `/api/admin/login` – login, returns `{ token }`
- POST `/api/data` – create/update entire site data
- PATCH `/api/about` – update only about
- PATCH `/api/contact` – update only contact
- PATCH `/api/projects` – replace projects array
- PATCH `/api/testimonials` – replace testimonials array

Seeding:
- POST `/api/admin/seed` – create first admin
  - Headers: `x-seed-secret: <SEED_SECRET>`
  - Body: `{ "username": "admin", "password": "password" }`

## Run locally

1. Copy `.env.example` to `.env` and fill values
```
PORT=5000
MONGO_URI=your-mongodb-atlas-url
JWT_SECRET=supersecretkey123
SEED_SECRET=changeme_to_seed_admin
FRONTEND_URL=http://localhost:5173
```

2. Install dependencies
```
npm install
```

3. Start dev server (with nodemon)
```
npm run dev
```

4. Seed admin
```
POST http://localhost:5000/api/admin/seed
Headers: x-seed-secret: <your SEED_SECRET>
Body: { "username": "admin", "password": "password" }
```

5. Login
```
POST http://localhost:5000/api/admin/login
Body: { "username": "admin", "password": "password" }
```
Use returned token as `Authorization: Bearer <token>` for protected routes.

## Notes
- For production, remove or secure the `/api/admin/seed` route.
- This API returns consistent JSON: `{ success, message, data }`.
