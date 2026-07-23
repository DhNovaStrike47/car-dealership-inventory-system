# AI Prompt History — Car Dealership Inventory System

## Phase 0 — Environment Setup
Prompt: "Set up a Node.js + Express backend project on Windows with Jest and 
Supertest, using these exact pinned versions to avoid compatibility issues: 
express@4.21.2, mongoose@8.9.5, bcrypt@5.1.1, jsonwebtoken@9.0.2, 
dotenv@16.4.7, jest@29.7.0 (dev), supertest@6.3.4 (dev). Create app.js with 
only the Express app and middleware (no .listen()), and server.js that 
imports app.js, connects to MongoDB via mongoose, and starts the server. 
Set testEnvironment to 'node' in Jest config."

## Phase 1 — Auth: Register
Prompt (Red): "Write a failing Jest + Supertest test for POST 
/api/auth/register. It should send username and password, expect 201 with 
a token property, and test that missing fields return 400."

Prompt (Green): "Create a Mongoose User model with username, password, and 
role fields. Implement POST /api/auth/register: hash password with bcrypt, 
save user, sign a JWT, return 201 with token. Make the failing tests pass."

Prompt (Refactor): "Extract password hashing into utils/hashPassword.js and 
JWT signing into utils/generateToken.js. Keep tests green."

## Phase 2 — Auth: Login
Prompt (Red): "Write failing Jest + Supertest tests for POST /api/auth/login: 
successful login returns 200 with a token, wrong password returns 401, 
nonexistent username returns 401."

Prompt (Green): "Implement POST /api/auth/login: find user by username, 
compare password with bcrypt, return a JWT on success, 401 on failure. 
Make the failing tests pass."

## Phase 3 — JWT Auth Middleware
Prompt (Red): "Write failing tests asserting GET /api/vehicles returns 401 
with no token, 401 with an invalid token, and 200 with a valid token."

Prompt (Green): "Create an Express middleware that verifies a JWT from the 
Authorization header, attaches decoded user info to req.user, and calls 
next(), returning 401 if missing/invalid. Create a minimal /api/vehicles 
route protected by this middleware."

Prompt (Refactor): "Add an adminOnly middleware that checks req.user.role 
for later use on admin-restricted routes."

## Note — reverted test DB approach
Initially tried mongodb-memory-server for isolated test databases, but the 
600MB one-time binary download caused repeated timeouts on a slow connection. 
Reverted to connecting tests directly to the real MongoDB instance for 
simplicity, removing dropDatabase() calls to avoid data collisions between 
parallel test files, and running tests with --runInBand.

## Note — test data cleanup
After removing mongodb-memory-server, discovered that repeated test runs 
against the real database caused duplicate-key (500) errors on registration, 
since test users persisted across runs. Fixed by deleting only the known 
test usernames in an afterEach hook, avoiding a full database wipe.

## Phase 4 — Vehicle CRUD
Prompt (Red): "Write failing Jest + Supertest tests for POST /api/vehicles 
(create) and GET /api/vehicles (list), covering success and validation 
failure cases."

Prompt (Green): "Create a Mongoose Vehicle model with make, model, category, 
price, and quantity fields. Implement POST /api/vehicles and GET 
/api/vehicles using a vehicleController, protected by the auth middleware. 
Make the failing tests pass."

Prompt (Red): "Write failing tests for GET /api/vehicles/search filtering 
by make and by price range."

Prompt (Green): "Implement GET /api/vehicles/search using Mongoose query 
filters for make, model, category, and price range via query params."

Prompt (Red): "Write a failing test for PUT /api/vehicles/:id updating a 
vehicle's price."

Prompt (Green): "Implement PUT /api/vehicles/:id using 
findByIdAndUpdate with validation."

Prompt (Red): "Write failing tests for DELETE /api/vehicles/:id: 403 for 
non-admin, 200 for admin."

Prompt (Green): "Implement DELETE /api/vehicles/:id protected by an 
adminOnly middleware checking req.user.role."

## Debugging notes — Phase 4
- Fixed a missing import (updateVehicle) causing "Route.put() requires a 
  callback function" error.
- Diagnosed intermittent MongoDB connection timeouts between test files, 
  traced to setup.js closing and reopening the connection between test 
  files on Windows; fixed by removing the per-file afterAll close and 
  adding --forceExit to the test script instead.
- Fixed a test bug where a delete request was missing its Authorization 
  header, causing an unrelated 401 instead of the expected 200.