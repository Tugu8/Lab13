# Self-Evaluation

## 1. Хэрэв шалгалт өнөөдөр болбол би энэ кодыг өөрөө бичиж чадах уу?

**Хэсэгчлэн — тайлбартай.**

**Чадах зүйлс:**
- Express router бүтэц, middleware — курсд үзсэн, ойлгосон
- SQLite `CREATE TABLE`, `INSERT`, `SELECT` үндсэн query-ууд
- Validation логик (if/else шалгалт)
- REST API зарчим (status code, JSON response бүтэц)
- Jest `describe/it/expect` тестийн бүтэц

**Хүндрэлтэй байх зүйлс:**
- Partial update-ийн динамик SQL (`fields`, `params` массив pattern) — AI-аас сурсан, ойлгосон ч гараар бичихэд алдаа гаргаж болно
- `INSERT OR IGNORE` many-to-many pattern — SQL-ийн нарийн detail, гараар санахад хэцүү
- OpenAPI 3.0 YAML бүтэц — `$ref`, `allOf`, `components` зэрэг syntax мартаж болно

**Чадахгүй байх зүйлс:**
- 300 мөрийн OpenAPI spec-ийг цаг дарамтгүйгээр гараар бичих — маш их boilerplate

---

## 2. Дахин хийнэ гэвэл юуг өөрөөр хийх вэ?

**Эхнээс AI session log хөтлөх.** Энэ удаад session дуусаад нь retroactive бичсэн — дараагийн удаа chat хийж байхдаа тэмдэглэх нь илүү үнэн, дэлгэрэнгүй болно.

**Label assign endpoint-ийг зөв газарт эхнээс байрлуулах.** `/api/labels/tasks/...` гэж эхэлж, дараа `/api/tasks/:id/labels/...` руу шилжүүлсэн — энэ нь нэмэлт засвар, commit болсон. RESTful зарчмыг эхнээс баримтлах байсан.

**AI-д илүү нарийн spec өгөх.** "Task CRUD хий" гэхийн оронд "title 255 тэмдэгтээс хэтрэхгүй, due_date nullable, partial update хий" гэж нарийн зааж өгөхөд AI-ийн анхны draft илүү зөв гарна, засвар бага болно.

**Feature branch ашиглах.** Бүх commit master-т шууд орсон. `feature/labels`, `feature/stats` гэх мэт branch ашигласан бол git history илүү цэвэр болох байсан.

---

## 3. Энэ туршлагаас юу сурсан бэ?

**"Verify, don't trust" зарчим практикт.** AI-ийн санал болгосон `db.serialize()`, `ALTER TABLE ADD CONSTRAINT` хоёр hallucination-ийг баримт бичгээр шалгаж засав. "AI хэлсэн учраас зөв" гэж итгэсэн бол тест ажиллахгүй байх байсан. Шалгах зан үйл нь AI ашиглалтын хамгийн чухал хэсэг.

**AI нь хурдасгагч, орлуулагч биш.** Boilerplate, template, жишээ code-ийг AI маш хурдан гаргадаг. Гэхдээ project-ийн context, шаардлагын нарийн ойлголт хүний дотор л байна. AI-ийн санал болгосон `DOMPurify`, `Redis cache`-ийг татгалзсан нь project-ийн хэмжээг ойлгосноос.

**Spec → Generate → Review → Integrate workflow ажилладаг.** CLAUDE.md-д convention тогтоосон нь AI-ийн санал болгосон кодыг шалгахад хэмжүүр болсон — "prepared statement байна уу?", "console.log үлдсэн үү?" гэж тодорхой шалгах боломжтой болсон.

**Commit-ийг жижиг хийх нь мэдлэгийг гүнзгийрүүлнэ.** Нэг feature — нэг commit гэсэн дүрэм баримталснаар юу хийснээ тодорхой тайлбарлах шаардлага гарсан. Энэ нь кодоо ойлгосон эсэхийг шалгах арга болсон.
