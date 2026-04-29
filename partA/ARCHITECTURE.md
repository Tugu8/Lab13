# Architecture — Personal Task Tracker

## Давхаргын бүтэц (Layered Architecture)

```mermaid
graph TD
    A[Browser / HTML+JS Frontend] -->|HTTP REST| B[Express.js API Layer]
    B --> C[Route Handlers]
    C --> D[Service Layer]
    D --> E[Repository Layer]
    E --> F[(SQLite Database)]

    subgraph "API Layer"
        C
        D
        E
    end
```

## Data Flow диаграм

```mermaid
sequenceDiagram
    participant U as User (Browser)
    participant R as Express Router
    participant S as TaskService
    participant DB as SQLite

    U->>R: POST /api/tasks (title, due, priority, labels)
    R->>S: createTask(data)
    S->>DB: INSERT INTO tasks ...
    DB-->>S: task row
    S-->>R: task object
    R-->>U: 201 Created { task }

    U->>R: GET /api/tasks?priority=high&search=meeting
    R->>S: getTasks(filters)
    S->>DB: SELECT ... WHERE ...
    DB-->>S: rows[]
    S-->>R: tasks[]
    R-->>U: 200 OK { tasks[] }
```

## Module бүтэц

```mermaid
graph LR
    A[index.js] --> B[app.js]
    B --> C[routes/tasks.js]
    B --> D[routes/labels.js]
    C --> E[services/taskService.js]
    D --> F[services/labelService.js]
    E --> G[repositories/taskRepo.js]
    F --> H[repositories/labelRepo.js]
    G --> I[db/database.js]
    H --> I
    I --> J[(tasks.db)]
```

## Module тайлбар

| Module | Файл | Үүрэг |
|--------|------|-------|
| Entry point | `index.js` | Server эхлүүлэх, port listen |
| App config | `app.js` | Express middleware, routes холбох |
| Task routes | `routes/tasks.js` | CRUD endpoints |
| Label routes | `routes/labels.js` | Label CRUD |
| Task service | `services/taskService.js` | Бизнесийн логик, validation |
| Label service | `services/labelService.js` | Label логик |
| Task repo | `repositories/taskRepo.js` | DB query-ууд |
| Label repo | `repositories/labelRepo.js` | Label DB query |
| Database | `db/database.js` | SQLite connection, schema init |

## Database Schema

```mermaid
erDiagram
    TASKS {
        integer id PK
        text title
        text description
        text status
        text priority
        text due_date
        datetime created_at
        datetime updated_at
    }
    LABELS {
        integer id PK
        text name
        text color
    }
    TASK_LABELS {
        integer task_id FK
        integer label_id FK
    }
    TASKS ||--o{ TASK_LABELS : has
    LABELS ||--o{ TASK_LABELS : belongs
```
