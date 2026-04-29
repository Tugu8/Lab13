# Personal Task Tracker — Part A (Plan)

## Зорилго
Хэрэглэгч өөрийн өдөр тутмын даалгавруудыг удирдах боломжтой вэб апп.
REST API + vanilla JS frontend, SQLite мэдээллийн сан.

## Build & Run

```bash
cd partB
npm install
npm run dev      # Development (auto-restart)
npm start        # Production
```

## Test ажиллуулах

```bash
npm test
npm run test:coverage
```

## API Spec шалгах

```bash
npm run validate:api
```

## Folder бүтэц

```
partB/
├── src/
│   ├── index.js
│   ├── app.js
│   ├── db/database.js
│   ├── routes/
│   ├── services/
│   ├── repositories/
│   └── public/
└── tests/
```

## Үндсэн feature-ууд
1. Task CRUD (Create, Read, Update, Delete)
2. Due date + Priority удирдлага (high/medium/low)
3. Label/Tag систем (many-to-many)
4. Search & Filter (title, priority, status, label)
5. Task statistics (нийт, дууссан, хоцорсон)

## Tech Stack
- Node.js 18 + Express 4
- SQLite (better-sqlite3)
- Jest + Supertest
- OpenAPI 3.0 (swagger-jsdoc)
