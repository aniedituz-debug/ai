-- ALYA_KUJOU.UZ - Database Schema & Sample Data

-- 1. Foydalanuvchilar jadvali
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    password TEXT NOT NULL,
    role TEXT DEFAULT 'user',
    photo TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Yangiliklar (Posts) jadvali
CREATE TABLE IF NOT EXISTS posts (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    author TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. TEST MA'LUMOTLARINI QO'SHISH (Optional)
-- Eslatma: Parollarni server orqali (bcrypt) qo'shish tavsiya etiladi.
-- Quyida 'parol123' uchun bcrypt hash namunalari keltirilgan.

-- Birinchi Adminni qo'shish (Password: parol123)
-- INSERT INTO users (name, email, password, role) 
-- VALUES ('Aniedituz', 'admin@alya.uz', '$2b$10$7R.dZ.p.YpY8O.O.O.O.O.O.O.O.O.O.O.O.O.O.O.O.O.O', 'owner');

-- Namuna postlarni qo'shish
INSERT INTO posts (title, content, author) VALUES 
('Xush kelibsiz!', 'Alya Kujou loyihasining yangi PostgreSQL bazasi muvaffaqiyatli ishga tushdi.', 'Admin'),
('Yangi AI imkoniyatlari', 'Endi bizning AI yordamchimiz yanada aqlli va tezroq javob beradi.', 'Alya'),
('Cloud Storage ishga tushdi', 'Foydalanuvchilarimiz uchun 5GB bepul bulutli xotira xizmati yo''lga qo''yildi.', 'Aniedituz');

-- 4. FOYDALI QUERY'LAR
-- Barcha foydalanuvchilarni ko'rish: SELECT * FROM users;
-- Oxirgi 5 ta yangilikni ko'rish: SELECT * FROM posts ORDER BY created_at DESC LIMIT 5;
-- Foydalanuvchi rolini o'zgartirish: UPDATE users SET role = 'admin' WHERE email = 'user@example.com';
