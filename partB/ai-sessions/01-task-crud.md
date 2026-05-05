# AI Session 01 — Task CRUD Implementation

**Огноо:** 2026-05-05
**Хэрэгсэл:** Claude (Anthropic)
**Зорилго:** Task CRUD-ийн Repository, Service, Route давхаргуудыг implement хийх

---

## Session агуулга

**Хэрэглэгч:**
> Task CRUD-ийг Repository → Service → Route гэсэн давхаргаар хэрхэн зохион байгуулах вэ? SQLite prepared statement ашиглах ёстой.

**Claude (товч):**
> Repository давхарга: raw SQL prepared statement-аар. Partial update-д динамик `SET` clause ашиглана — зөвхөн дамжуулсан field-үүдийг update хийнэ.
> Service давхарга: validation (title заавал, priority enum, due_date YYYY-MM-DD формат), 404 guard.
> Route давхарга: HTTP status code зөв ашиглах — 201 POST-д, 404 not found-д.

**Хэрэглэгч:**
> Search + filter-ийг SQL injection-аас хэрхэн хамгаалах вэ?

**Claude (товч):**
> Динамик WHERE clause бүрдүүлж, params массивт утгуудыг оруулаад `db.prepare(sql).all(...params)` дуудна. Хэзээ ч string concatenation ашиглахгүй — бүх утга `?` placeholder-аар орно.

**Шийдвэр:** Repository-д бүх query prepared statement-аар хийгдсэн. `update()` функц зөвхөн өөрчлөгдсөн field-үүдийг update хийдэг partial update pattern ашиглав.

---

## Тэмдэглэл

- AI санал болгосон `db.serialize()` — SQLite3 callback API-ийн функц. `better-sqlite3` synchronous API ашигладаг тул хэрэггүй. Hallucination-г илрүүлж засав.
- `getLabels()` taskRepo-д нэмсэн нь getTasks response-д label-уудыг нэг дор буцаахад тохиромжтой байлаа.
