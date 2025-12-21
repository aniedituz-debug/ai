# PostgreSQL (Neon) Database Guide

Ushbu qo'llanma Neon bazasini boshqarish va SQL so'rovlarini tushuntiradi.

## 1. Local Development (Kompyuterda ulanish)

Siz Netlify'ga deploy qilmasdan ham local ravishda bazaga ulanishingiz mumkin. Buning uchun:
1. Loyihangizda `.env` fayli borligiga ishonch hosil qiling (men uni yaratdim).
2. `npm run start` buyrug'ini bering. Server `.env` dagi `DATABASE_URL` orqali Neon'ga ulanadi.

## 2. Bazani boshqarish (GUI Dasturlar)

Bazadagi ma'lumotlarni ko'rish va o'zgartirish uchun quyidagi dasturlarni tavsiya qilaman:
- **DBeaver** (Bepul va juda kuchli) - [Yuklab olish](https://dbeaver.io/)
- **TablePlus** (Chiroyli va tezkor) - [Yuklab olish](https://tableplus.com/)

**Sozlash:**
Dasturni oching, "New Connection" bosing va PostgreSQL tanlang. Keyin `DATABASE_URL` dagi ma'lumotlarni kiriting:
- **Host:** ep-hidden-resonance-ae8c383k-pooler.c-2.us-east-2.aws.neon.tech
- **User:** neondb_owner
- **Password:** npg_rSEptYyN8Z6d
- **Database:** neondb
- **Port:** 5432
- **SSL:** Enabled (shart!)

## 3. SQL Namunalar

### Jadvallarni ko'rish
```sql
SELECT * FROM users;
SELECT * FROM posts;
```

### Yangi post qo'shish
```sql
INSERT INTO posts (title, content, author) 
VALUES ('Salom Dunyo', 'Bu Neon bazasidagi birinchi post!', 'Admin');
```

### Postni sarlavha bo'yicha qidirish
```sql
SELECT * FROM posts WHERE title ILIKE '%salom%';
```

### Foydalanuvchi ma'lumotlarini yangilash
```sql
UPDATE users SET role = 'admin' WHERE email = 'test@example.com';
```

### Postni o'chirish
```sql
DELETE FROM posts WHERE id = 1;
```

---
**Eslatma:** Parolni o'zgartirganingizdan so'ng `.env` faylidagi URL ni ham yangilashni unutmang!
