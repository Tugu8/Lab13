# AI Session 02 — Label System

**Огноо:** 2026-05-06
**Хэрэгсэл:** Claude (Anthropic)
**Зорилго:** Many-to-many label систем, task-label холбоос

---

## Session агуулга

**Хэрэглэгч:**
> Task-д олон label нэмэх боломжтой байхын тулд many-to-many хэрхэн хэрэгжүүлэх вэ?

**Claude (товч):**
> `task_labels` join хүснэгт ашиглана: `(task_id, label_id)` composite primary key. `ON DELETE CASCADE` тавьснаар task устгагдахад холбогдсон label-уудын мэдээлэл автоматаар цэвэрлэгдэнэ. `INSERT OR IGNORE` давхардлыг зохицуулна.

**Хэрэглэгч:**
> Label нэмэх/хасах endpoint-ийг `/api/tasks/:id/labels/:labelId` гэж хийх нь RESTful мөн үү?

**Claude (товч):**
> Тийм, RESTful. Гэхдээ `/api/labels/tasks/:taskId/labels/:labelId` биш — labels router-д байрлуулах нь зохион байгуулалтын хувьд буруу. `/api/tasks/:id/labels/:labelId` гэж tasks route-д байрлуулах нь илүү тодорхой.

**Хэрэглэгч:**
> Тийм, task routes-д шилжүүлье.

**Шийдвэр:** Label assign/remove endpoint-ийг tasks route-д шилжүүлсэн: `POST /api/tasks/:id/labels/:labelId`, `DELETE /api/tasks/:id/labels/:labelId`.

---

## Тэмдэглэл

- AI эхлээд `FOREIGN KEY` constraint-г schema-д тусдаа `ALTER TABLE`-аар нэмэхийг санал болгосон — SQLite-д `ALTER TABLE ADD CONSTRAINT` дэмжигддэггүй. `CREATE TABLE`-д шууд оруулж засав.
- Color validation: `#rrggbb` hex regex pattern AI-аас авсан, тест хийж зөв ажиллаж байгааг баталгаажуулав.
