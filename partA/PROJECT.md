# Personal Task Tracker — Project Overview

## Сонгосон сэдэв
**2. Personal Task Tracker**

## Зорилго
Хэрэглэгч өөрийн өдөр тутмын даалгавруудыг удирдах боломжтой вэб апп.
Task үүсгэх, засах, устгах, дуусгавар болгох, шүүх, хайх боломжтой.

## Scope (Хамрах хүрээ)
### Багтах зүйлс:
- Task CRUD (Create, Read, Update, Delete)
- Due date тогтоох
- Priority тогтоох (high / medium / low)
- Label / Tag нэмэх
- Search (нэрээр хайх)
- Filter (priority, status, label-аар шүүх)
- REST API (JSON)
- Minimal HTML frontend (vanilla JS)

### Багтахгүй зүйлс:
- Хэрэглэгчийн нэвтрэх систем (authentication)
- Олон хэрэглэгч
- Email notification
- Mobile app

## Технологи Stack
- **Backend:** Node.js + Express.js
- **Database:** SQLite (better-sqlite3)
- **Frontend:** Vanilla HTML + CSS + JavaScript
- **Testing:** Jest + Supertest
- **API Spec:** OpenAPI 3.0

## Онцлог feature-ууд (3–5)
1. Task CRUD — бүрэн үйлдэл
2. Due date + Priority удирдлага
3. Label/Tag систем
4. Search & Filter
5. Task statistics (нийт, дууссан, хоцорсон тоо)
