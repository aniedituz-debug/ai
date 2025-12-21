# Frontend API Configuration

Netlify da deploy qilgandan keyin, frontend fayllarida API URL ni Render backend URL ga o'zgartirish kerak.

## 1. API Base URL ni sozlash

`style.js` faylining boshiga quyidagi kodni qo'shing:

```javascript
// API Base URL - Production yoki Development
const API_BASE_URL = window.location.hostname === 'localhost' 
    ? 'http://localhost:3000' 
    : 'https://your-render-app.onrender.com'; // Render URL ni bu yerga qo'ying
```

## 2. Barcha fetch so'rovlarini yangilash

### Login (style.js, line ~549)

```javascript
const response = await fetch(`${API_BASE_URL}/api/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
});
```

### Signup (style.js, line ~590)

```javascript
const response = await fetch(`${API_BASE_URL}/api/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password })
});
```

### Posts (style.js, line ~647)

```javascript
const response = await fetch(`${API_BASE_URL}/api/posts`);
```

### AI Chat (ai.js, line ~272)

```javascript
const response = await fetch(`${API_BASE_URL}/api/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message: text })
});
```

### Profile (profile.js)

Barcha `/api/profile` so'rovlarini `${API_BASE_URL}/api/profile` ga o'zgartiring.

---

## Quick Update Script

Quyidagi buyruqni ishlatib, barcha fayllarni avtomatik yangilashingiz mumkin:

```bash
# Windows PowerShell
(Get-Content style.js) -replace "'/api/", "'`${API_BASE_URL}/api/" | Set-Content style.js
(Get-Content ai.js) -replace "'/api/", "'`${API_BASE_URL}/api/" | Set-Content ai.js
(Get-Content profile.js) -replace "'/api/", "'`${API_BASE_URL}/api/" | Set-Content profile.js
```

Yoki qo'lda har bir faylda `/api/` ni `${API_BASE_URL}/api/` ga almashtiring.
