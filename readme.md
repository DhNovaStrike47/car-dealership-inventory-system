# Car Dealership Inventory System

A full-stack car dealership inventory management application built as part of the Incubyte (Ahmedabad) campus placement assessment, following Test-Driven Development (TDD) practices.

## Overview

This application allows users to register and log in, browse and search a vehicle inventory, and purchase vehicles (decreasing stock). Admin users can additionally add, update, delete, and restock vehicles. The backend was built test-first, following a Red-Green-Refactor workflow, with authentication secured via JWT.

## Tech Stack

**Backend**
- Node.js + Express
- MongoDB with Mongoose
- JWT (jsonwebtoken) for authentication
- bcrypt for password hashing
- Jest + Supertest for testing

**Frontend**
- React (Vite)
- Tailwind CSS
- React Router
- Axios

## Project Structure

```
car-dealership-inventory-system/
├── backend/
│   ├── app.js
│   ├── server.js
│   ├── models/
│   ├── controllers/
│   ├── routes/
│   ├── middleware/
│   ├── utils/
│   └── tests/
├── frontend/
│   └── src/
│       ├── api/
│       ├── components/
│       ├── context/
│       └── pages/
├── README.md
└── PROMPTS.md
```

## API Endpoints

**Auth**
- `POST /api/auth/register` — Register a new user
- `POST /api/auth/login` — Log in and receive a JWT

**Vehicles** (protected — requires `Authorization: Bearer <token>`)
- `POST /api/vehicles` — Add a new vehicle
- `GET /api/vehicles` — List all vehicles
- `GET /api/vehicles/search` — Search vehicles by make, model, category, or price range
- `PUT /api/vehicles/:id` — Update a vehicle
- `DELETE /api/vehicles/:id` — Delete a vehicle (admin only)

**Inventory** (protected)
- `POST /api/vehicles/:id/purchase` — Purchase a vehicle (decreases quantity)
- `POST /api/vehicles/:id/restock` — Restock a vehicle (admin only, increases quantity)

## Setup Instructions

### Prerequisites
- Node.js (LTS recommended)
- MongoDB (local instance or MongoDB Atlas connection string)

### Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in `backend/` with:
```
MONGO_URI=mongodb://127.0.0.1:27017/car-dealership
PORT=5000
JWT_SECRET=your_jwt_secret_here
```

Run the backend server:
```bash
npm start
```
Server runs on `http://localhost:5000`.

Run the test suite:
```bash
npm test
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```
Frontend runs on `http://localhost:5173` (default Vite port).

## Testing

The backend was built using Test-Driven Development — tests were written before implementation for each endpoint (Red-Green-Refactor). Test coverage includes:
- User registration and login (success and failure cases)
- JWT authentication middleware (missing/invalid/valid tokens)
- Vehicle CRUD operations
- Vehicle search filtering
- Purchase and restock inventory logic, including admin-only restrictions

Run `npm test` inside `backend/` to execute the full suite.

## My AI Usage

**AI tools used:** Claude (Anthropic), used throughout the backend and frontend development process.

**How I used it:**
- Used Claude to understand the TDD Red-Green-Refactor workflow from the assessment document, since I had no prior experience with Test-Driven Development, JWT authentication, or writing tests with Jest/Supertest.
- Used Claude to generate the initial project structure and boilerplate for the Express backend (app.js/server.js separation, folder structure).
- Worked through each feature (auth, vehicle CRUD, search, purchase/restock) test-first: asked Claude to write a failing test for a feature, ran it to confirm it failed for the right reason, then asked Claude to implement the minimal code to make it pass, and committed at each stage.
- Used Claude extensively for debugging — including diagnosing intermittent MongoDB/Jest connection timeouts, resolving dependency version conflicts (Express/Node/Supertest compatibility issues on Windows), and fixing an npm SSL cipher error that blocked frontend package installation.
- Used Claude to scaffold the React + Tailwind frontend (auth context, login/register forms, dashboard with search and purchase, admin panel).

*
