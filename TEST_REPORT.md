# Test Report — Car Dealership Inventory System

## How to generate this report

Run the following from inside the `backend/` folder:

```bash
npm test
```

Copy the full terminal output and paste it into the "Test Run Output" section below, then fill in the summary table above it using the final line of that output (e.g. `Tests: 24 passed, 24 total`).

---

## Summary

| Metric | Result |
|---|---|
| Test Suites | [e.g. 2 passed, 2 total] |
| Tests | [e.g. 24 passed, 24 total] |
| Snapshots | 0 total |
| Time | [e.g. ~10s] |
| Test Runner | Jest + Supertest |
| Date Run | [YYYY-MM-DD] |

## Coverage by Feature

| Feature | Endpoint(s) | Test File | Status |
|---|---|---|---|
| User Registration | `POST /api/auth/register` | `tests/auth.test.js` | ✅ |
| User Login | `POST /api/auth/login` | `tests/auth.test.js` | ✅ |
| JWT Auth Middleware | (protects `/api/vehicles`) | `tests/vehicle.test.js` | ✅ |
| Create Vehicle | `POST /api/vehicles` | `tests/vehicle.test.js` | ✅ |
| List Vehicles | `GET /api/vehicles` | `tests/vehicle.test.js` | ✅ |
| Search Vehicles | `GET /api/vehicles/search` | `tests/vehicle.test.js` | ✅ |
| Update Vehicle | `PUT /api/vehicles/:id` | `tests/vehicle.test.js` | ✅ |
| Delete Vehicle (admin only) | `DELETE /api/vehicles/:id` | `tests/vehicle.test.js` | ✅ |
| Purchase Vehicle | `POST /api/vehicles/:id/purchase` | `tests/vehicle.test.js` | ✅ |
| Restock Vehicle (admin only) | `POST /api/vehicles/:id/restock` | `tests/vehicle.test.js` | ✅ |


## Notes

- All backend endpoints were developed using Test-Driven Development (Red-Green-Refactor): each feature's test was written and confirmed failing before the corresponding implementation was written.
- Tests run against [a local MongoDB instance / MongoDB Atlas — specify which] via Mongoose.
- Run with `--runInBand` to avoid parallel test-file connection issues.
