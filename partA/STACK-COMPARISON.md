# Stack Харьцуулалт

## Харьцуулсан 3 stack

| Шалгуур | Node.js + Express | Python + FastAPI | Python + Flask |
|---------|-------------------|------------------|----------------|
| **Хурд (runtime)** | Маш хурдан (non-blocking I/O) | Хурдан (async) | Дунд |
| **Суралцах хялбар** | Дунд | Дунд | Хялбар |
| **OpenAPI auto-gen** | Гараар (swagger-jsdoc) | Автомат (built-in) | Нэмэлт library |
| **SQLite дэмжлэг** | better-sqlite3 (сайн) | aiosqlite | flask-sqlalchemy |
| **Test ecosystem** | Jest + Supertest | pytest + httpx | pytest + flask test |
| **Frontend нэгтгэх** | Нэг runtime (хялбар) | Тусдаа server | Тусдаа server |
| **Deployment** | Node хэрэгтэй | Python хэрэгтэй | Python хэрэгтэй |
| **Community** | Маш том | Том, өсөж байгаа | Том |
| **TypeScript дэмжлэг** | Шууд | Зөвхөн type hints | Зөвхөн type hints |

## Дэлгэрэнгүй дүн шинжилгээ

### 1. Node.js + Express
**Давуу тал:**
- Frontend болон backend нэг хэлээр (JavaScript) — context switch бага
- Non-blocking I/O — олон хүсэлтийг зэрэг боловсруулна
- npm ecosystem маш баялаг
- Express нь хамгийн өргөн хэрэглэгддэг Node framework

**Сул тал:**
- Callback / Promise hell болж болно
- OpenAPI spec гараар бичих хэрэгтэй
- Python-тай харьцуулахад syntax илүү verbose

### 2. Python + FastAPI
**Давуу тал:**
- OpenAPI/Swagger автоматаар үүснэ
- Async/await цэвэр syntax
- Pydantic-аар автомат validation
- Маш сайн документаци

**Сул тал:**
- Python environment тохируулах (venv, pip)
- Frontend-тэй нэгтгэхэд нэмэлт алхам
- Node.js-тэй харьцуулахад runtime хурд бага

### 3. Python + Flask
**Давуу тал:**
- Хамгийн энгийн, ойлгомжтой
- Маш уян хатан (minimal framework)
- Суралцахад хамгийн хялбар

**Сул тал:**
- Async дэмжлэг сул
- OpenAPI нэмэлт тохиргоо шаардана
- FastAPI-тай харьцуулахад validation бага автомат

## Сонгосон Stack: Node.js + Express

### Шалтгаан:
1. **JavaScript нэгдсэн орчин** — Frontend болон backend хоёулаа JS, нэг хэлний мэдлэг хангалттай
2. **Судалсан технологи** — Express.js нь курсын хичээлүүдэд хамгийн их дурдагдсан
3. **SQLite интеграци** — `better-sqlite3` нь synchronous API-тай, энгийн project-д тохиромжтой
4. **Jest ecosystem** — Unit test болон integration test нэг framework-д
5. **Хурдан эхлэх** — `npm init` → `npm install` → ажиллана, тохиргоо бага

### AI-тай хийсэн харьцуулалтын дүгнэлт:
Claude-тай stack харьцуулсан чатын дагуу Node.js + Express нь энэ хэмжээний project-д хамгийн тэнцвэртэй сонголт гэж тодорхойлогдсон. FastAPI нь OpenAPI auto-gen давуу талтай ч Python орчин тохируулах нэмэлт зардал бий. Flask хэтэрхий minimal.
