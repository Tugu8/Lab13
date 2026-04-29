# Бие даалт 13 — AI-Assisted Software Construction

**Сэдэв:** Personal Task Tracker  
**Оюутан:** Tugu8  
**Хугацаа:** 2 долоо хоног  

## Хэсгүүд

| Хэсэг | Агуулга | Байдал |
|-------|---------|--------|
| [Part A — Plan](partA/) | Архитектур, stack сонголт, ADR, AI session | Дууссан |
| [Part B — Build](partB/) | Үндсэн implementation, тест, slash commands | Хийгдэж байна |
| [Part C — Reflect](partC/) | AI Usage Report, ADR-002, Self-evaluation | Хийгдэж байна |

## Хурдан эхлэх

```bash
cd partB && npm install && npm run dev
```

## Stack

- **Backend:** Node.js 18 + Express 4
- **Database:** SQLite (better-sqlite3)
- **Frontend:** Vanilla HTML + CSS + JavaScript
- **Testing:** Jest + Supertest
- **API Spec:** OpenAPI 3.0

## Линкүүд

- [Архитектур](partA/ARCHITECTURE.md)
- [Stack харьцуулалт](partA/STACK-COMPARISON.md)
- [ADR-001](partA/adr/0001-stack-decision.md)
- [AI session log](partA/ai-sessions/plan.md)
- [CLAUDE.md](CLAUDE.md)
