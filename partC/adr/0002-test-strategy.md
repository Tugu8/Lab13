# ADR-002: Тестийн стратеги — In-memory SQLite vs Mock

## Статус
Баталгаажсан (Accepted)

## Огноо
2026-05-07

## Контекст

Unit test бичихдээ database layer-ийг хэрхэн зохицуулах вэ гэсэн асуулт гарав. Хоёр хандлага байв:

1. **Repository-г mock хийх** — `jest.mock()` ашиглан DB дуудлагуудыг simulate хийх
2. **In-memory SQLite ашиглах** — `DB_PATH=:memory:` тавьж бодит DB-тэй тест хийх

AI-тай хийсэн ярилцлагад mock approach-ийг санал болгосон:
> "Repository-ийг mock хийвэл тест хурдан, тусдаа, predictable болно. Service layer-ийг DB-ээс тусгаарлан тестлэх боломжтой."

Гэхдээ CLAUDE.md-д "DB тест: in-memory SQLite (`:memory:`)" гэж тогтоосон байсан.

## Шийдвэр

**In-memory SQLite (`DB_PATH=':memory:'`) ашиглах** шийдвэр гаргасан.

## Харьцуулалт

### Mock approach
**Давуу тал:**
- Тест маш хурдан (disk I/O байхгүй)
- Service logic-ийг тусгаарлан тестлэнэ
- DB error simulation хялбар

**Сул тал:**
- Mock нь бодит DB-ийн зан авирыг бүрэн дуурайхгүй
- SQL query-ийн алдааг тест илрүүлэхгүй (mock "амжилттай" буцаана)
- Schema migration алдааг mock-тэй тест олохгүй — production-д л гарна

### In-memory SQLite
**Давуу тал:**
- Бодит SQL query ажиллана — `CHECK constraint`, `FOREIGN KEY`, `UNIQUE` бүгд шалгагдана
- `initSchema()` тест бүрт дахин ажиллана — schema өөрчлөлт автоматаар тестлэгдэнэ
- Integration test болон unit test нэг дор хийгдэнэ
- Тест дууссаны дараа memory дотор устана — file үлдэхгүй

**Сул тал:**
- Mock-оос арай удаан (мм секундын зөрүү)
- Бодит DB-ийн зарим онцлог (WAL mode, concurrent write) in-memory-д өөрөөр ажиллана

## Үр дагавар

### Эерэг:
- 23 тест бүгд бодит SQL-тэй ажиллана
- `CHECK(priority IN ('high','medium','low'))` constraint тест-д шалгагдана
- `UNIQUE` label name constraint 409 response тест-д баталгаажна
- `ON DELETE CASCADE` task устгахад label холбоос цэвэрлэгдэх нь тестлэгдэнэ

### Сөрөг / Эрсдэл:
- `closeDb()` тест бүрийн `afterAll`-д дуудахгүй бол memory leak гарна → `afterAll(() => closeDb())` нэмсэн
- Test файл бүр тусдаа `process.env.DB_PATH = ':memory:'` тавих ёстой — мартвал бодит DB бохирдоно

## AI-тай ярилцлагын дүгнэлт

AI mock approach санал болгосон ч CLAUDE.md-д тогтоосон дүрэм болон бодит SQL алдааг илрүүлэх хэрэгцээ давамгайлсан. "Mock тест pass болж, production migration fail болсон" жишээнүүд бодит дэлхийд байдаг — in-memory SQLite нь энэ эрсдэлийг бууруулна.
