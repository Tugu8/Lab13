Perform an OWASP Top 10 security audit of the specified file or the entire partB/src directory.

Check each category:

1. **A01 Broken Access Control** — are routes protected? Can users access other users' data?
2. **A02 Cryptographic Failures** — any sensitive data stored in plaintext?
3. **A03 Injection** — SQL injection via prepared statements? Command injection?
4. **A04 Insecure Design** — business logic flaws, missing rate limiting?
5. **A05 Security Misconfiguration** — CORS too open? Error messages leaking internals?
6. **A06 Vulnerable Components** — run `npm audit` and report findings
7. **A07 Auth Failures** — (N/A for this project — no auth)
8. **A08 Integrity Failures** — are dependencies pinned? package-lock.json present?
9. **A09 Logging Failures** — are security events logged? No sensitive data in logs?
10. **A10 SSRF** — does the app make outbound requests? If yes, are URLs validated?

Output format:
```
[A03 CRITICAL] src/repositories/taskRepo.js:42 — string concatenation in SQL query
[A05 WARNING] src/app.js:15 — stack trace exposed in error response
[A06 INFO] 2 low-severity npm audit findings
```

End with a summary: total CRITICAL / WARNING / INFO count.
