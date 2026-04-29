# CLAUDE.md — Personal Task Tracker

## Project товч
Personal Task Tracker — Node.js + Express + SQLite REST API, vanilla JS frontend.

## Build & Run командууд

```bash
# Суурилуулах
cd partB && npm install

# Development горим (auto-restart)
npm run dev

# Production горим
npm start

# Тест ажиллуулах
npm test

# Тест + coverage
npm run test:coverage

# OpenAPI spec шалгах
npm run validate:api
```

## Folder бүтэц
```
partB/src/
├── index.js          # Entry point
├── app.js            # Express app, middleware
├── db/database.js    # SQLite connection + schema
├── routes/           # Express routers
├── services/         # Business logic
├── repositories/     # DB queries
└── public/           # Frontend HTML/CSS/JS
```

## Кодны дүрэм (Conventions)

### Ерөнхий
- Node.js 18+ ашиглана
- `require()` (CommonJS), ES modules биш
- Мөр дуусгах: LF (Unix)
- Indent: 2 space
- Файлын нэр: camelCase (taskService.js)

### API дүрэм
- Бүх endpoint `/api/` угтвартай
- JSON response: `{ data, error, meta }` бүтэц
- HTTP status code зөв ашиглах (200, 201, 400, 404, 500)
- Error message Монгол эсвэл Англи (аль нэг нь тогтмол)

### Database
- Schema migration: `db/database.js`-д `initSchema()` функцад
- Raw SQL ашиглана (ORM биш)
- Prepared statement ЗААВАЛ ашиглана (SQL injection хориглоно)

### Тест
- Файлын нэр: `*.test.js`
- `describe` + `it` бүтэц
- DB тест: in-memory SQLite (`:memory:`)
- Тест бүр бие даасан байх (state хуваалцахгүй)

## No-go Zones (хориглосон зүйлс)

- ❌ `eval()` ашиглахгүй
- ❌ SQL query-д string concatenation ашиглахгүй (prepared statements ЗААВАЛ)
- ❌ `console.log` production code-д орхихгүй (logger ашиглана)
- ❌ Hardcoded нууц (API key, password) source code-д байхгүй
- ❌ `.env` файлыг git-д commit хийхгүй
- ❌ `node_modules/` commit хийхгүй
- ❌ `DROP TABLE` migration-д ашиглахгүй
- ❌ Synchronous file I/O (fs.readFileSync) route handler-т ашиглахгүй

## AI ашиглалтын дүрэм
- AI үүсгэсэн кодыг review хийлгүй merge хийхгүй
- Prepared statement байгааг ЗААВАЛ шалгана
- AI санал болгосон dependency-г `npm audit`-аар шалгана
- Commit body-д AI ашигласан эсэхийг зарлана

## Slash commands
- `/review` — security + robustness шалгалт
- `/test` — edge case-тэй тест үүсгэх
- `/docs` — JSDoc + README хэсэг
- `/commit` — Conventional Commits message
- `/security` — OWASP Top 10 шалгалт
- `/refactor` — pattern-аар refactor
