# Render Deployment Guide

## Render.com ga Backend Deploy qilish

### 1. Render.com da yangi Web Service yarating

1. [Render.com](https://render.com) ga kiring
2. "New +" -> "Web Service" tanlang
3. GitHub repository'ingizni ulang
4. Quyidagi sozlamalarni kiriting:
   - **Name:** alya-backend (yoki istalgan nom)
   - **Environment:** Node
   - **Build Command:** `npm install`
   - **Start Command:** `node server.js`
   - **Plan:** Free

### 2. Environment Variables

Render dashboard da "Environment" bo'limiga quyidagi o'zgaruvchilarni qo'shing:

```
DATABASE_URL=your_postgresql_connection_string
JWT_SECRET=your_secret_key_here
PORT=3000
```

### 3. PostgreSQL Database

Render da bepul PostgreSQL database yarating:
1. "New +" -> "PostgreSQL" tanlang
2. Database yaratilgandan keyin, "Internal Database URL" ni nusxalang
3. Uni `DATABASE_URL` environment variable sifatida qo'shing

---

## Keep-Alive Mechanism

Render bepul rejasida server 15 daqiqa faoliyatsiz qolganda uxlab qoladi. Buni oldini olish uchun `server.js` ga keep-alive mexanizmi qo'shilgan.

### Qanday ishlaydi:

- Har 5 daqiqada server o'ziga `/api/db-status` endpointiga so'rov yuboradi
- Bu server faol turishi uchun zarur
- Faqat production muhitida (Render da) ishlaydi

---

## Frontend Configuration

Netlify da deploy qilgandan keyin, frontend fayllarini Render backend URL ga ulanishi uchun yangilash kerak.

### `style.js` da API URL ni o'zgartiring:

```javascript
const API_BASE_URL = 'https://your-render-app.onrender.com';

// Login request
const response = await fetch(`${API_BASE_URL}/api/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
});
```

---

## Deployment Steps

1. ✅ `server.js` ga keep-alive qo'shildi
2. ⏳ GitHub ga push qiling
3. ⏳ Render.com da Web Service yarating
4. ⏳ Environment variables ni sozlang
5. ⏳ PostgreSQL database yarating va ulang
6. ⏳ Frontend da API URL ni yangilang
7. ⏳ Netlify ga qayta deploy qiling

---

## Monitoring

Render dashboard da:
- **Logs** - Server loglarini ko'ring
- **Metrics** - CPU va Memory ishlatilishini kuzating
- **Events** - Deploy tarixini ko'ring
