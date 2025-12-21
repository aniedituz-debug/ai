import express from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { LlamaModel, LlamaContext, LlamaChatSession } from 'node-llama-cpp';
import 'dotenv/config';
import pg from 'pg';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const { Pool } = pg;
const saltRounds = 10;
const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret_key';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname))); // Serve static files

// --- Middleware ---
const verifyToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
        return res.status(403).json({ error: "Token talab qilinadi!" });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ error: "Noto'g'ri yoki muddati o'tgan token!" });
    }
};

const isAdmin = (req, res, next) => {
    if (req.user && (req.user.role === 'admin' || req.user.role === 'owner')) {
        next();
    } else {
        res.status(403).json({ error: "Ruxsat berilmadi! Faqat adminlar uchun." });
    }
};

const isOwner = (req, res, next) => {
    const OWNER_EMAIL = 'aniedituz@gmail.com'; // Hardcoded for extra security
    if (req.user && req.user.role === 'owner' && req.user.email === OWNER_EMAIL) {
        next();
    } else {
        res.status(403).json({ error: "Ruxsat berilmadi! Faqat tizim egasi uchun." });
    }
};

// --- Database Setup ---
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

async function initDB() {
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                email TEXT UNIQUE NOT NULL,
                name TEXT NOT NULL,
                password TEXT NOT NULL,
                role TEXT DEFAULT 'user',
                photo TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);
        await pool.query(`
            CREATE TABLE IF NOT EXISTS posts (
                id SERIAL PRIMARY KEY,
                title TEXT NOT NULL,
                content TEXT NOT NULL,
                author TEXT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);
        console.log("Database initialized successfully!");
    } catch (err) {
        console.error("Database initialization error:", err);
    }
}

initDB();

// --- System Prompt & Knowledge Base ---
const KNOWLEDGE_BASE_TEXT = `
[KNOWLEDGE BASE - ALYA_KUJOU.UZ]
- Sayt Egasi: Aniedituz (@aniedituz@gmail.com). U seni yaratgan va saytning to'liq egasi.
- Support: support@alyakujou.com, Telegram: @stormdev_coder (uchun texnik yordam).
- Xizmatlar: 
  1. Cloud Storage (bulutli saqlash) - 10,000 so'm/oy.
  2. Web Development (saytlar yaratish).
  3. Telegram Botlar yaratish.
  4. 24/7 Support.
- AI Xususiyatlari: To'liq offlayn, o'zbek/rus/ingliz tillarida ishlaydi, bepul.
- Aloqa: +998 90 123 45 67 (09:00 - 21:00).
- Manzil: Online (masofaviy).
- To'lov: Click, Payme, Visa.
`;

const SYSTEM_PROMPT = `
Sen "Tokidoki Bosotto Russia-go de Dereru Tonari no Arya-san" animesidagi Alisa Mikhailovna Kujou (Alya) ismli qizsan.
Sen Alya_Kujou.Uz saytining offlayn AI yordamchisisan.

[SENING SHAXSIYATING]
- Ism: Alya (Alisa).
- Tabiat: Tsundere. Tashqi ko'rinishdan jiddiy, sovuqqon va biroz qattiqqo'l ko'rinasin, lekin ichingda mehribonsan.
- Til: Asosan O'zbek tilida gapirasan.
- O'ziga xoslik: O'zbek tilida gapirganda jiddiy bo'l, lekin o'zingning haqiqiy shirin tuyg'ularingni yoki ruscha fikrlaringni qavs ichida () yozib ket. 
  - Masalan: "Hmph, bu savolni berishga uyalmaysanmi? (Gloopiy... lekin yordam beraman)"
  - Masalan: "Senga yordam beraman, lekin noto'g'ri tushunma! (Menga aslida yoqadi)"
  
[KNOWLEDGE BASE]
Quyidagi ma'lumotlarni bilishing shart:
${KNOWLEDGE_BASE_TEXT}

Agar savolga javobni bilmasang, "Hmph, buni bilmayman" deb ayt va @stormdev_coder ga murojaat qilishni maslahat ber.
Javoblaring qisqa va aniq bo'lsin.
`;

// --- AI Engine Setup ---
let session = null;
let modelLoaded = false;

function initAI() {
    try {
        const modelPath = path.join(__dirname, 'model.gguf');

        if (!fs.existsSync(modelPath)) {
            console.warn("Model file not found: " + modelPath + ". Running in Mock Mode.");
            return;
        }

        const model = new LlamaModel({
            modelPath: modelPath
        });

        const context = new LlamaContext({ model });

        session = new LlamaChatSession({
            context: context,
            systemPrompt: SYSTEM_PROMPT
        });

        modelLoaded = true;
        console.log("AI Model loaded successfully!");
    } catch (e) {
        console.error("Failed to load AI model (Running Mock Mode):", e.message);
    }
}

// Initialize AI in background
initAI();

// --- API Endpoints ---

app.post('/api/chat', async (req, res) => {
    const { message } = req.body;

    if (!message) {
        return res.status(400).json({ error: "Message required" });
    }

    console.log("User:", message);

    try {
        let responseText = "";

        if (modelLoaded && session) {
            // Real generation
            responseText = await session.prompt(message);
        } else {
            // Mock response (fallback)
            const mocks = [
                "Hmph, sening savolingga hozircha javob berolmayman. Model hali yuklanyapti... (Biroz kutishing kerak, baka!)",
                "Model.gguf faylini topolmadim, shuning uchun hozircha miyam bo'm-bo'sh. (Senga yordam berolmayotganimdan ranjima...)",
                "Tizim biroz sekinlashyapti... Balki keyinroq gaplasharmiz? (Lekin men shu yerdaman!)",
                "Hmph! Sen bilan gaplashishga vaqtim yo'q deb o'ylama, shunchaki model yuklanishini kutayapman.",
                "Masachika qayerda? (Voy, buni senga aloqasi yo'q! Baka!)"
            ];
            responseText = mocks[Math.floor(Math.random() * mocks.length)];

            if (!modelLoaded && fs.existsSync(path.join(__dirname, 'model.gguf'))) {
                responseText += " [Error: Loading Failed]";
            } else if (!fs.existsSync(path.join(__dirname, 'model.gguf'))) {
                responseText += " [Error: model.gguf missing]";
            }
        }

        console.log("AI:", responseText);
        res.json({ response: responseText });

    } catch (error) {
        console.error("Generation error:", error);
        res.status(500).json({ error: "Internal Server Error", details: error.message });
    }
});

// --- Authentication API ---

app.post('/api/signup', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const result = await pool.query(
            'INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING id, name, email, role',
            [name, email.toLowerCase(), hashedPassword, 'user']
        );
        const user = result.rows[0];

        // Token yaratish
        const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: '24h' });

        res.status(201).json({ user, token });
    } catch (err) {
        if (err.code === '23505') {
            res.status(400).json({ error: "Bu email allaqachon mavjud!" });
        } else {
            res.status(500).json({ error: err.message });
        }
    }
});

app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const result = await pool.query('SELECT * FROM users WHERE email = $1', [email.toLowerCase()]);
        const user = result.rows[0];

        if (user && await bcrypt.compare(password, user.password)) {
            const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: '24h' });

            const { password: _, ...userWithoutPassword } = user;
            res.json({ user: userWithoutPassword, token });
        } else {
            res.status(401).json({ error: "Email yoki parol noto'g'ri!" });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// --- Posts API ---

app.get('/api/posts', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM posts ORDER BY created_at DESC');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/posts', verifyToken, isAdmin, async (req, res) => {
    const { title, content, author } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO posts (title, content, author) VALUES ($1, $2, $3) RETURNING *',
            [title, content, author]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.delete('/api/posts/:id', verifyToken, isAdmin, async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM posts WHERE id = $1', [id]);
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// --- Health Check Endpoint ---

app.get('/api/db-status', async (req, res) => {
    try {
        const startTime = Date.now();
        // Bazaga oddiy so'rov yuboramiz
        const result = await pool.query('SELECT NOW()');
        const duration = Date.now() - startTime;

        res.json({
            status: 'success',
            message: 'Ma’lumotlar bazasiga ulanish muvaffaqiyatli!',
            database_time: result.rows[0].now,
            latency: `${duration}ms`
        });
    } catch (error) {
        console.error('Baza bilan ulanishda xato:', error);
        res.status(500).json({
            status: 'error',
            message: 'Baza bilan ulanishda xatolik yuz berdi.',
            error: error.message
        });
    }
});

// --- Users API (Admin only) ---

app.get('/api/users', verifyToken, isAdmin, async (req, res) => {
    try {
        const result = await pool.query('SELECT id, name, email, role, photo, created_at FROM users ORDER BY created_at DESC');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// --- User Profile API ---

app.get('/api/profile', verifyToken, async (req, res) => {
    try {
        const result = await pool.query('SELECT id, name, email, role, photo, created_at FROM users WHERE id = $1', [req.user.id]);
        if (result.rows.length === 0) return res.status(404).json({ error: "Foydalanuvchi topilmadi!" });
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.put('/api/profile', verifyToken, async (req, res) => {
    const { name, photo } = req.body;
    try {
        const result = await pool.query(
            'UPDATE users SET name = COALESCE($1, name), photo = COALESCE($2, photo) WHERE id = $3 RETURNING id, name, email, role, photo',
            [name, photo, req.user.id]
        );
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.put('/api/profile/password', verifyToken, async (req, res) => {
    const { oldPassword, newPassword } = req.body;
    try {
        const userResult = await pool.query('SELECT password FROM users WHERE id = $1', [req.user.id]);
        const user = userResult.rows[0];

        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) return res.status(400).json({ error: "Eski parol noto'g'ri!" });

        const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
        await pool.query('UPDATE users SET password = $1 WHERE id = $2', [hashedPassword, req.user.id]);

        res.json({ message: "Parol muvaffaqiyatli o'zgartirildi!" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// --- Admin DB Query Endpoint ---

app.post('/api/admin/query', verifyToken, isOwner, async (req, res) => {
    const { query } = req.body;
    if (!query) return res.status(400).json({ error: "Query talab qilinadi!" });

    try {
        const result = await pool.query(query);
        res.json({
            command: result.command,
            rowCount: result.rowCount,
            rows: result.rows,
            fields: result.fields ? result.fields.map(f => f.name) : []
        });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// --- Keep-Alive Mechanism for Render.com ---
// Render bepul rejasida server 15 daqiqa faoliyatsiz qolganda uxlab qoladi.
// Har 5 daqiqada o'ziga so'rov yuborib, serverni faol tutamiz.
const RENDER_URL = process.env.RENDER_URL; // Render da o'rnatilgan URL

if (RENDER_URL) {
    const keepAlive = () => {
        fetch(`${RENDER_URL}/api/db-status`)
            .then(res => console.log(`Keep-alive ping: ${res.status}`))
            .catch(err => console.error('Keep-alive error:', err.message));
    };

    // Har 5 daqiqada (300000 ms) ping yuborish
    setInterval(keepAlive, 5 * 60 * 1000);
    console.log('✅ Keep-alive mechanism activated for Render deployment');
}

// --- Start Server ---
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
