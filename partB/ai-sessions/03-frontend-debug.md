# AI Session 03 — Frontend & XSS Prevention

**Огноо:** 2026-05-06
**Хэрэгсэл:** Claude (Anthropic)
**Зорилго:** Vanilla JS frontend, XSS хамгаалалт

---

## Session агуулга

**Хэрэглэгч:**
> Vanilla JS-ээр task жагсаалт render хийхдээ innerHTML ашиглаж болох уу?

**Claude (товч):**
> `innerHTML`-д хэрэглэгчийн оролтыг шууд оруулвал XSS эрсдэлтэй. `esc()` helper функц ашиглан `&`, `<`, `>`, `"` тэмдэгтүүдийг HTML entity болгон хөрвүүлэх хэрэгтэй. Эсвэл `textContent` ашиглах боломжтой ч template literal-тай хослуулахад `esc()` илүү уян хатан.

**Хэрэглэгч:**
> Filter хийхэд URLSearchParams хэрхэн ашиглах вэ?

**Claude (товч):**
> ```js
> const params = new URLSearchParams();
> if (search) params.set('search', search);
> fetch('/api/tasks?' + params)
> ```
> Хоосон утгуудыг `set` хийхгүй байх нь query string-ийг цэвэр байлгана.

**Шийдвэр:** `esc()` helper функц бүх user input-д ашигласан. Filter нь URLSearchParams-аар хоосон параметрүүдийг автоматаар хасдаг.

---

## Тэмдэглэл

- AI эхлээд `DOMPurify` library санал болгосон — энэ нь external dependency нэмдэг. Vanilla JS-ийн `esc()` helper нь энэ project-ийн хэмжээнд хангалттай бөгөөд dependency-гүй. AI-ийн санал болгосон dependency-г `npm audit`-аар шалгасны дараа зайлсхийх шийдвэр гаргасан.
- Modal-ийн `editingId` state: AI `data-id` attribute ашиглахыг санал болгосон, гэхдээ module-level хувьсагч илүү энгийн бөгөөд DOM-тай хамааралгүй.
