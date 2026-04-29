# ADR-001: Stack сонголт — Node.js + Express + SQLite

## Статус
Баталгаажсан (Accepted)

## Огноо
2025-04-29

## Контекст
Personal Task Tracker апп хийхийн тулд backend framework болон database сонгох шаардлагатай болсон. Бие даалтын шаардлагын дагуу AI-тай хамтран 3 өөр stack-ийг харьцуулж нэгийг сонгосон.

Шаардлагууд:
- REST API + minimal frontend
- SQLite мэдээллийн сан (хөнгөн, file-based)
- Unit + integration тест бичих боломжтой
- OpenAPI 3.0 spec
- 2 долоо хоногт ажиллах хэмжээний scope

## Шийдвэр
**Node.js 18 + Express 4 + better-sqlite3 + Jest** stack-ийг сонгосон.

## Харьцуулсан хувилбарууд

### Хувилбар 1: Node.js + Express ✅ (Сонгосон)
- JavaScript-ийн нэгдсэн орчин (frontend + backend)
- better-sqlite3: synchronous, энгийн API
- Jest + Supertest: тест бичихэд хялбар
- npm ecosystem: хэрэгтэй library бүх зүйл бэлэн

### Хувилбар 2: Python + FastAPI
- OpenAPI автомат үүснэ — давуу тал
- Гэхдээ: Python venv тохируулалт нэмэлт цаг зарцуулна
- Frontend-тэй нэгтгэхэд нэмэлт алхам хэрэгтэй

### Хувилбар 3: Python + Flask
- Хамгийн энгийн framework
- Гэхдээ: async дэмжлэг сул, OpenAPI нэмэлт тохиргоо хэрэгтэй
- Validation автомат биш

## Үр дагавар

### Эерэг:
- Frontend + backend нэг хэлээр бичнэ → context switch бага
- Express middleware ecosystem баялаг
- SQLite synchronous API → async/await complexity бага
- Jest нь coverage, mock, spy бүгдийг дэмжинэ

### Сөрөг / Эрсдэл:
- OpenAPI spec гараар бичих хэрэгтэй (swagger-jsdoc ашиглана)
- Node.js-ийн callback pattern анхны мэдлэгтэнд хэцүү байж болно
- SQLite concurrent write-д хязгаарлалттай (энэ project-т хамаагүй)

## AI-тай хийсэн ярилцлагын дүгнэлт
Claude-тай stack харьцуулах чатад: "энэ хэмжээний CRUD апп-д FastAPI-ийн async давуу тал тийм их илрэхгүй, харин JavaScript-ийн нэгдсэн орчин илүү практик давуу тал өгнө" гэж тодорхойлогдсон.
