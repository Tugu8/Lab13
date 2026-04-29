Review the current file or recent changes for security vulnerabilities and robustness issues.

Check the following:

**Security (OWASP Top 10):**
- SQL injection: are all queries using prepared statements?
- XSS: is user input sanitized before rendering in HTML?
- No hardcoded secrets (API keys, passwords)
- Input validation at API boundaries

**Robustness:**
- Error handling: are all async operations wrapped in try/catch?
- Are HTTP status codes correct (200, 201, 400, 404, 500)?
- Edge cases: empty input, null values, very long strings
- Are database connections properly closed?

**Code quality:**
- No `eval()` usage
- No `console.log` left in production paths (use logger)
- No synchronous file I/O in route handlers

Report findings as: [CRITICAL] / [WARNING] / [INFO] with file:line references.
