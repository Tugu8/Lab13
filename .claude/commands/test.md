Generate comprehensive unit tests for the current file or specified function.

Follow the testing pyramid:
- Unit tests for individual functions (service layer, repository layer)
- Integration tests for API endpoints using Supertest
- Use in-memory SQLite (`:memory:`) for DB tests

Test structure:
```js
describe('ComponentName', () => {
  it('should do X when Y', async () => { ... });
});
```

Cover these edge cases:
- Happy path (valid input)
- Empty / null input
- Invalid types (string where number expected)
- Boundary values (very long strings, negative numbers)
- Not found (404 cases)
- Duplicate data (unique constraint violations)
- Database errors (simulate with mocks if needed)

Each test must be independent — use beforeEach to reset state.
Use `expect().toMatchObject()` for partial object matching.
