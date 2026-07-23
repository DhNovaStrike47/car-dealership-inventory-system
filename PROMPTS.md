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