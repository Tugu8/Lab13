# AI Usage Report — Personal Task Tracker

**Оюутан:** Tugu8
**Огноо:** 2026-05-08
**Хэрэгсэл:** Claude Code (Anthropic)

---

## 1. Юуг AI хийсэн, юуг өөрөө хийсэн?

### AI хийсэн зүйлс

**Part A — Төлөвлөлт:**
Архитектурын шийдвэрүүдийг AI-тай хамтран гаргасан. Stack харьцуулалтад Node.js+Express, Python+FastAPI, Python+Flask гурвын давуу болон сул талуудыг AI тайлбарлаж өгсөн. Layered architecture (Route → Service → Repository → DB) загварыг AI санал болгосон бөгөөд Repository pattern-ийн учир шалтгааныг тайлбарлав — "тест хийхэд DB-г mock хийж болно" гэдэг нь практик давуу тал болохыг ойлгуулсан. Database schema-д many-to-many relationship-ийн `task_labels` join хүснэгтийг AI загварчлав. CLAUDE.md-ийн no-go zones-ийг тодорхойлоход AI OWASP-ийн зарчмуудад тулгуурлан зөвлөмж өгсөн.

**Part B — Хэрэгжилт:**
- `taskRepo.js`-ийн partial update pattern (зөвхөн өөрчлөгдсөн field-үүдийг UPDATE хийх динамик SQL) — AI санал болгосон, өөрөө шалгаж баталгаажуулсан
- `taskService.js`-ийн validation логик — AI draft хийсэн, due_date regex-ийн тест хийж засварласан
- `labelService.js`-ийн hex color regex — AI санал болгосон, `#[0-9a-fA-F]{6}` pattern зөв эсэхийг тест ажиллуулж шалгасан
- Frontend-ийн `esc()` XSS helper функц — AI санал болгосон, OWASP-ийн XSS зарчмын дагуу review хийсэн
- OpenAPI YAML бүтэц — AI template гаргасан, endpoint бүрийг гараар нягтлан шалгасан

**Тестүүд:**
23 тест AI-тай хамтран бичсэн. AI edge case-уудыг санал болгосон (хоосон title, буруу priority enum, давхардсан label нэр, хуучин due_date). Тест бүрийн логикийг өөрөө ойлгож, нэр, assertion-уудыг тохируулсан.

### Өөрөө хийсэн зүйлс

- **Архитектурын шийдвэр баталгаажуулалт:** AI санал болгосон бүх pattern-ийг өөрийн мэдлэгтэй харьцуулж, project-т тохирохыг шалгасан
- **Label assign endpoint-ийн байршлын засвар:** `/api/labels/tasks/...` биш `/api/tasks/:id/labels/...` байх ёстой гэдгийг RESTful зарчмаас ойлгож засав
- **DB_PATH=:memory: тестийн тохиргоо:** Jest-д `:memory:` SQLite ашиглах арга замыг өөрөө тодорхойлсон, AI санал болгосон `beforeEach` DB reset-ийн оронд `process.env.DB_PATH` approach-ийг сонгосон
- **Git commit тус тусдаа болгох:** Ямар commit ямар утга агуулахыг, хэрхэн тараах ёстойг өөрөө шийдсэн
- **Folder бүтцийн зохион байгуулалт:** `partA/`, `partB/`, `partC/` бүтцийг заавраас уншиж тогтоосон

---

## 2. Hallucination жишээнүүд

### Жишээ 1: `db.serialize()` функц

AI `taskRepo.js`-ийн анхны draft-д дараах код санал болгосон:

```js
// AI санал болгосон (буруу)
const sqlite3 = require('sqlite3');
db.serialize(() => {
  db.run('INSERT INTO tasks ...');
});
```

**Асуудал:** `db.serialize()` нь `sqlite3` callback-based library-ийн функц. Харин энэ project `better-sqlite3` ашигладаг — энэ нь **synchronous API**, `serialize()` гэж огт байхгүй. AI хоёр өөр SQLite library-ийн API-ийг хольж хэлсэн.

**Хэрхэн илрүүлсэн:** Кодыг ажиллуулахад `db.serialize is not a function` алдаа гарав. `better-sqlite3`-ийн баримт бичгийг шалгаж, synchronous `db.prepare().run()` pattern ашиглаж засав.

**Сургамж:** AI library-ийн нэрийг мэддэг боловч тухайн library-ийн яг API-г мэдэхгүй байж болно. Гэнэтийн функц, method-ийг заавал баримт бичгээр шалгах хэрэгтэй.

---

### Жишээ 2: SQLite `ALTER TABLE ADD CONSTRAINT`

Label систем хийхэд AI `FOREIGN KEY` constraint-ийг дараа нэмэхийг санал болгосон:

```sql
-- AI санал болгосон (буруу)
ALTER TABLE task_labels
ADD CONSTRAINT fk_task FOREIGN KEY (task_id) REFERENCES tasks(id);
```

**Асуудал:** SQLite нь `ALTER TABLE ADD CONSTRAINT` **дэмждэггүй**. PostgreSQL, MySQL-д ажилладаг энэ syntax SQLite-д огт байхгүй.

**Хэрхэн илрүүлсэн:** SQLite-ийн официал баримт бичгийг уншиж шалгасан. `ALTER TABLE` нь SQLite-д зөвхөн `ADD COLUMN`, `RENAME` дэмждэг. `CREATE TABLE`-д шууд `REFERENCES` бичиж засав:

```sql
-- Зөв арга
CREATE TABLE task_labels (
  task_id  INTEGER NOT NULL REFERENCES tasks(id) ON DELETE CASCADE,
  label_id INTEGER NOT NULL REFERENCES labels(id) ON DELETE CASCADE
);
```

**Сургамж:** AI нь "SQL мэддэг" боловч database-specific syntax-ийг андуурч bolno. SQLite-ийн constraint дүрмүүд PostgreSQL-ээс ялгаатай — шалгах хэрэгтэй.

---

## 3. Security анхаарал

### DOMPurify dependency санал

Frontend дээр XSS хамгаалалт хийхэд AI `DOMPurify` library суулгахыг санал болгосон:

```bash
# AI санал болгосон
npm install dompurify jsdom
```

**Шалгасан зүйл:** `npm audit` ажиллуулахад DOMPurify-д шууд эмзэг байдал байгаагүй ч `jsdom` dependency нь **500KB+ нэмэлт код** авчирна. Энэ хэмжээний project-д хэт том.

**Шийдэл:** Vanilla JS-ийн `esc()` helper функц бичсэн — зөвхөн `&`, `<`, `>`, `"` тэмдэгтүүдийг HTML entity болгодог 8 мөр код. Ингэснээр:
- External dependency байхгүй → supply chain risk байхгүй
- Хялбар, тест хийхэд ойлгомжтой
- Энэ project-ийн хэмжээнд хангалттай хамгаалалт

**Сургамж:** AI нь "production-grade" шийдэл санал болгодог боловч project-ийн хэмжээнд тохирох энгийн шийдэл байж болно. Dependency нэмэхийн өмнө `npm audit` ажиллуулж, үнэхээр хэрэгтэй эсэхийг бодох хэрэгтэй.

---

## 4. AI-аар хурдан хийсэн зүйлс

**Boilerplate код:** Express router бүтэц, try/catch error handler, JSON response format зэрэг давтагддаг хэлбэрийг AI маш хурдан үүсгэв. Гараар бичвэл 30-40 минут зарцуулах боловч AI-аар 2-3 минутад болсон.

**Validation логик:** `priority`, `status` enum шалгалт, `due_date` regex, `color` hex pattern — AI эдгээрийг нэг дор санал болгосон. Өөрөө Google хайж олох нь илүү цаг зарцуулна.

**OpenAPI YAML:** 300 гаруй мөрийн spec файлыг AI template-ээр үүсгэж, endpoint бүрийн schema-ийг дүүргэсэн. Гараар бичвэл 2+ цаг болох ажлыг 15 минутад хийв.

**Тестийн edge case санаанууд:** "Ямар алдааны тест бичих вэ?" гэдэг асуултад AI 10+ edge case санал болгосон — хоосон title, хэт урт string, буруу формат гэх мэт. Өөрөө бодоход зарим нь орхигдох байсан.

**Mermaid диаграм:** Architecture, sequence, ER диаграмуудыг AI-тай хамтран 20 минутад бичсэн.

---

## 5. AI-аар удаан хийсэн зүйлс

**Буруу код шалгах:** AI санал болгосон кодын алдааг олоход цаг зарцуулдаг. `db.serialize()` hallucination-ийг засахад ажиллуулж, алдаа унших, баримт бичиг шалгах, засах гэсэн 3 алхам шаардлагатай болсон — гараар зөв код бичсэнээс илүү цаг болсон.

**Зөрчилдөөнтэй санал:** Label assign endpoint-ийн байршлыг AI эхлээд `/api/labels/tasks/...` гэж санал болгосон, дараа нь `/api/tasks/:id/labels/...` байх ёстой гэж засав. AI-ийн зөвлөмжүүд зарим үед хоорондоо зөрчилддөг — аль нь зөв болохыг тодорхойлоход нэмэлт ойлголт шаардагдана.

**Over-engineering санал:** AI зарим үед шаардлагаас илүү төвөгтэй шийдэл санал болгодог. Жишээ нь label assign-д `DOMPurify`, stats-д Redis cache санал болгосон — энэ project-т огт хэрэггүй зүйлс. "Хэрэггүй" гэдгийг тодорхойлж, татгалзахад цаг зарцуулдаг.

**Context алдах:** Урт session-д AI өмнө хэлсэн шийдвэрийг мартаж, зөрчилдөх код санал болгодог. Repository pattern-ийн дүрмийг дахин сануулах шаардлага гарсан.

---

## 6. Skill atrophy эрсдэлийг яаж зохицуулсан?

**Гараар тайлбарлах дадлага:** AI-ийн санал болгосон код бүрийг зөвхөн "paste" хийхгүй — юу хийж байгааг дуу хоолойгоороо тайлбарлаж чадах эсэхийг шалгасан. Тайлбарлаж чадахгүй байвал AI-аас "энэ мөр яагаад хэрэгтэй вэ?" гэж асуусан.

**Баримт бичиг шалгах:** AI-аас авсан бүх API, function-ийг `better-sqlite3`, Express-ийн official docs-аар баталгаажуулсан. "AI хэлсэн учраас зөв" гэж итгэхгүй — шалгаж итгэсэн.

**AI-гүй цаг гаргах:** Тест бичихдээ test case бүрийн логикийг AI-гүй өөрөө бодсон. AI-аас зөвхөн "edge case санал болгоч" гэж асуусан — тест-ийн assertion, бүтцийг өөрөө шийдсэн.

**Commit message-ийг өөрөө бичих:** `/commit` slash command байсан ч commit message бүрийг өөрөө бичсэн — юу өөрчилсөнөө ойлгохын тулд.

**Шалгалтын бэлтгэл:** "AI байхгүй бол энэ кодыг тайлбарлаж чадах уу?" гэсэн асуултыг өөртөө тавьж, database.js-ийн `WAL mode`, `foreign_keys = ON`-ийн учир шалтгааныг тайлбарлах дадлага хийсэн.
