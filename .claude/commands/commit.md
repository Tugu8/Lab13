Generate a Conventional Commits formatted commit message for the current staged changes.

Format:
```
<type>(<scope>): <short description>

<body — what changed and why, optional>

Co-Authored-By: Claude <noreply@anthropic.com>
```

Types:
- `feat` — new feature
- `fix` — bug fix
- `docs` — documentation only
- `test` — adding or updating tests
- `refactor` — code change that neither fixes a bug nor adds a feature
- `chore` — build process, dependency updates

Scope examples: `tasks`, `labels`, `db`, `api`, `frontend`, `auth`

Rules:
- Subject line ≤72 characters
- Use imperative mood ("add" not "added")
- If AI generated this code, include `Co-Authored-By: Claude <noreply@anthropic.com>` in the footer
- Do NOT include issue references unless the user provides one

Show the message ready to copy-paste into `git commit -m "..."`.
