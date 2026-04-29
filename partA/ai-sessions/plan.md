# AI Planning Session Log — Part A

**Огноо:** 2025-04-29  
**Хэрэгсэл:** Claude (Anthropic)  
**Зорилго:** Stack сонголт, архитектур, folder бүтэц тогтоох

---

## Session 1: Сэдэв болон Stack сонголт

**Хэрэглэгч:**
> Бие даалт 13-т Personal Task Tracker хийх гэж байна. Node.js+Express, Python+FastAPI, Python+Flask гурвыг харьцуулаад ямар stack сонгох нь зүйтэй вэ?

**Claude (товч):**
> Гурван stack-ийг шаардлагын дагуу харьцуулье:
> - **Node.js+Express**: Frontend/backend нэг хэл, SQLite интеграци хялбар, Jest ecosystem сайн. OpenAPI гараар бичнэ.
> - **FastAPI**: OpenAPI автомат, Pydantic validation сайн. Python орчин тохируулах нэмэлт алхам бий.
> - **Flask**: Хамгийн энгийн, гэхдээ async сул, validation гараар.
> 
> 2 долоо хоногийн scope-д Node.js+Express хамгийн тэнцвэртэй. Frontend JS бол context switch байхгүй.

**Шийдвэр:** Node.js + Express сонгосон → ADR-001-д тэмдэглэсэн.

---

## Session 2: Архитектур болон Folder бүтэц

**Хэрэглэгч:**
> Node.js+Express+SQLite task tracker-т ямар архитектур, folder бүтэц тохиромжтой вэ? Layered architecture хиймээр байна.

**Claude (товч):**
> Layered architecture: Route → Service → Repository → DB
> 
> ```
> src/
> ├── routes/      # HTTP handlers
> ├── services/    # Business logic
> ├── repositories/ # DB queries
> ├── db/          # SQLite init
> └── public/      # Frontend
> ```
> 
> Repository pattern ашигласнаар тест хийхэд DB-г mock хийж болно. Service layer-т validation болон business rule байна.

**Шийдвэр:** Repository pattern + Service layer архитектур сонгосон → ARCHITECTURE.md-д Mermaid диаграм хэлбэрээр тэмдэглэсэн.

---

## Session 3: Database Schema

**Хэрэглэгч:**
> Task tracker-т ямар database schema хэрэгтэй вэ? Label/tag систем хэрхэн хийх вэ?

**Claude (товч):**
> 3 хүснэгт хэрэгтэй:
> - `tasks`: id, title, description, status, priority, due_date, created_at, updated_at
> - `labels`: id, name, color
> - `task_labels`: task_id, label_id (many-to-many)
> 
> Many-to-many холбоос нь нэг task олон label-тэй, нэг label олон task-д байх боломж өгнө.

**Шийдвэр:** ERD диаграм → ARCHITECTURE.md-д тэмдэглэсэн.

---

## Session 4: CLAUDE.md болон No-go zones

**Хэрэглэгч:**
> CLAUDE.md-д ямар no-go zone, convention тавих нь зүйтэй вэ? Security талаас юу анхаарах хэрэгтэй вэ?

**Claude (товч):**
> Хамгийн чухал no-go zones:
> - Prepared statement ЗААВАЛ — SQL injection хаах
> - `eval()` хориглох
> - Hardcoded нууц (.env ашиглах)
> - `node_modules/`, `.env` → .gitignore-д
> 
> Convention-д: 2 space indent, camelCase файлын нэр, `/api/` prefix, `{ data, error }` response бүтэц.

**Шийдвэр:** CLAUDE.md-д бүгдийг тусгасан.

---

## Нийт дүгнэлт

| Шийдвэр | Эх сурвалж |
|---------|-----------|
| Stack: Node.js+Express | Session 1 + ADR-001 |
| Layered architecture | Session 2 |
| Repository pattern | Session 2 |
| 3-хүснэгт schema | Session 3 |
| Prepared statement дүрэм | Session 4 |
| No-go zones | Session 4 |
