// --- DOM Elements ---
const authWrapper = document.querySelector('.auth-wrapper');
const loginTrigger = document.querySelector('.login-trigger');
const registerTrigger = document.querySelector('.register-trigger');
const langButtons = document.querySelectorAll('.lang-btn');

// --- Auth Switcher ---
if (registerTrigger) {
    registerTrigger.addEventListener('click', (e) => {
        e.preventDefault();
        authWrapper.classList.add('toggled');
    });
}

if (loginTrigger) {
    loginTrigger.addEventListener('click', (e) => {
        e.preventDefault();
        authWrapper.classList.remove('toggled');
    });
}

// --- Constants ---
const OWNER_EMAIL = 'aniedituz@gmail.com';
const OWNER_PASS = '12345599Aka';

// --- Translations ---
const translations = {
    uz: {
        // Navbar
        nav_home: "Bosh sahifa",
        nav_features: "Xususiyatlar",
        nav_about: "Biz haqimizda",
        nav_services: "Xizmatlar",
        nav_support: "Qo'llab-quvvatlash",
        nav_login: "Kirish",

        // Hero
        hero_title: "Alya_Kujou.Uz saytiga xush kelibsiz",
        hero_subtitle: "Raqamli tajribangiz uchun ilg'or platforma. Xavfsiz, Tez va Go'zal.",
        hero_cta: "Boshlash",
        latest_posts_title: "So'nggi Yangiliklar",

        // Support Page
        support_title: "24/7 Qo'llab-quvvatlash",
        support_subtitle: "Har qanday vaqtda sizga yordam berishga tayyormiz",
        channel_chat_title: "Jonli Chat",
        channel_chat_desc: "Darhol javob oling. O'rtacha javob vaqti: 2 daqiqa",
        channel_email_title: "Email",
        channel_email_desc: "support@alyakujou.com orqali murojaat qiling",
        channel_phone_title: "Telefon",
        channel_phone_desc: "+998 90 123 45 67 raqamiga qo'ng'iroq qiling",
        channel_ai_title: "AI Yordamchi",
        channel_ai_desc: "Alya AI har doim sizning xizmatingizda",
        chat_demo_title: "Jonli Chat Demo",
        chat_demo_status: "Online - O'rtacha javob vaqti 2 daqiqa",
        faq_title: "Tez-tez so'raladigan savollar",

        // Auth
        login_title: "Kirish",
        login_label: "Foydalanuvchi nomi",
        password_label: "Parol",
        login_btn: "Kirish",
        no_account: "Hisobingiz yo'qmi?",
        signup_link: "Ro'yxatdan o'tish",
        welcome_back: "XUSH KELIBSZ!",
        signup_title: "Ro'yxatdan o'tish",
        email_label: "Email",
        signup_btn: "Ro'yxatdan o'tish",
        has_account: "Sizda hisob bormi?",
        login_link: "Kirish",
        welcome: "XUSH KELIBSZ!",
        social_text: "Yoki quyidagilar orqali kiring",

        // Footer
        footer_desc: "Raqamli kelajagingiz shu yerda boshlanadi",
        footer_links_title: "Havolalar",
        footer_link1: "Bosh sahifa",
        footer_link2: "Xususiyatlar",
        footer_link3: "Biz haqimizda",
        footer_link4: "Kirish",
        footer_social_title: "Ijtimoiy tarmoqlar",
        footer_rights: "Barcha huquqlar himoyalangan.",
        footer_dev: "Dasturchi",
        site_version: "Versiya: 1.0 Beta",

        // Features Page
        features_hero_title: "Alya Xususiyatlari",
        features_hero_subtitle: "Bizning platformamiz sizga taklif qiladigan barcha afzalliklar",
        feature_ai_title: "Sun'iy Intellekt",
        feature_ai_desc: "Kuchli AI yordamchi har doim yordamga tayyor",
        feature_security_title: "Xavfsizlik",
        feature_security_desc: "Barcha ma'lumotlaringiz eng yuqori darajada himoyalangan",
        feature_speed_title: "Tezlik",
        feature_speed_desc: "Eng ilg'or texnologiyalar orqali maksimal tezlik",
        feature_support_title: "Qo'llab-quvvatlash",
        feature_support_desc: "24/7 professional qo'llab-quvvatlash xizmati",
        feature_offline_title: "Offlayn",
        feature_offline_desc: "Hech qanday internet ulanishisiz ham ishlashingiz mumkin",
        feature_free_title: "Bepul",
        feature_free_desc: "Barcha xizmatlardan bepul foydalaning",
        features_cta: "Boshlash",
        features_title: "Bizning Afzalliklarimiz",
        stat_users: "Foydalanuvchilar",
        stat_uptime: "Faoliyat",
        stat_support: "Qo'llab-quvvatlash",

        // About Page
        about_hero_title: "Biz Haqimizda",
        about_hero_subtitle: "Alya_Kujou.Uz - Raqamli kelajak uchun platforma",
        about_story_title: "Bizning Hikoyamiz",
        about_story_content: "Alya_Kujou.Uz 2025-yilda Aniedituz tomonidan yaratilgan. Maqsadimiz - sun'iy intellekt texnologiyalarini hamma uchun ochiq qilish.",
        about_mission_title: "Bizning Vazifamiz",
        about_mission_content: "Har bir foydalanuvchiga kuchli, xavfsiz va qulay sun'iy intellekt vositasini taqdim etish.",
        about_vision_title: "Kelajak",
        about_vision_content: "Sun'iy intellektni kundalik hayotning ajralmas qismiga aylantirish.",
        team_title: "Jamoa",
        team_member1: "Aniedituz - Asoschi va Bosh Dasturchi",
        team_member2: "StormDev - UI/UX Dizayner",
        team_member3: "OpenAI - Texnik Maslahatchi",

        // Services Page
        services_hero_title: "Bizning Xizmatlarimiz",
        services_hero_subtitle: "Sizning biznesingiz uchun to'liq yechimlar",
        service1_title: "AI Yechimlar",
        service1_desc: "Shaxsiy AI yordamchi yaratish",
        service2_title: "Veb Dasturlar",
        service2_desc: "Zamonaviy veb ilovalar ishlab chiqish",
        service3_title: "Telegram Botlar",
        service3_desc: "Professional Telegram botlar yaratish",
        service4_title: "Ma'lumotlar Tahlili",
        service4_desc: "Katta hajmdagi ma'lumotlarni tahlil qilish",
        service5_title: "Suno'niy Intellekt",
        service5_desc: "Sun'iy intellekt asosidagi yechimlar",
        service6_title: "Texnik Yordam",
        service6_desc: "24/7 texnik qo'llab-quvvatlash",

        // Admin Panel
        admin_welcome: "Xush kelibsiz, Administrator",
        admin_subtitle: "Platforma statistikasi va sozlamalari",
        stat_users: "Foydalanuvchilar",
        stat_active: "Faol Foydalanuvchilar",
        stat_posts: "Postlar",
        stat_uptime: "Faoliyat",
        stat_support: "Qo'llab-quvvatlash",
        section_dashboard: "Boshqaruv paneli",
        section_users: "Foydalanuvchilar",
        section_posts: "Postlar",
        section_settings: "Sozlamalar",
        section_analytics: "Analitika",
        section_transactions: "Tranzaksiyalar",
        section_security: "Xavfsizlik",
        dashboard_title: "Umumiy Statistika",
        recent_activity: "Oxirgi Faoliyatlar",
        user_management: "Foydalanuvchi Menejmenti",
        post_management: "Post Menejmenti",
        system_settings: "Tizim Sozlamalari",
        analytics_title: "Analitika Hisobotlari",
        transactions_title: "To'lov Tranzaksiyalari",
        security_title: "Xavfsizlik Sozlamalari"
    },
    ru: {
        // Navbar
        nav_home: "Главная",
        nav_features: "Особенности",
        nav_about: "О нас",
        nav_services: "Услуги",
        nav_support: "Поддержка",
        nav_login: "Вход",

        // Hero
        hero_title: "Добро пожаловать в Alya_Kujou.Uz",
        hero_subtitle: "Передовая платформа для вашего цифрового опыта. Безопасно, Быстро и Красиво.",
        hero_cta: "Начать",

        // Support Page
        support_title: "Поддержка 24/7",
        support_subtitle: "Мы готовы помочь вам в любое время",
        channel_chat_title: "Живой Чат",
        channel_chat_desc: "Получите мгновенный ответ. Среднее время: 2 минуты",
        channel_email_title: "Электронная почта",
        channel_email_desc: "Свяжитесь с нами через support@alyakujou.com",
        channel_phone_title: "Телефон",
        channel_phone_desc: "Звоните нам по номеру +998 90 123 45 67",
        channel_ai_title: "AI Помощник",
        channel_ai_desc: "Alya AI всегда к вашим услугам",
        chat_demo_title: "Демо Живого Чата",
        chat_demo_status: "Онлайн - Среднее время ответа 2 минуты",
        faq_title: "Часто задаваемые вопросы",

        // Auth
        login_title: "Вход",
        login_label: "Имя пользователя",
        password_label: "Пароль",
        login_btn: "Войти",
        no_account: "Нет аккаунта?",
        signup_link: "Регистрация",
        welcome_back: "С ВОЗВРАЩЕНИЕМ!",
        signup_title: "Регистрация",
        email_label: "Email",
        signup_btn: "Зарегистрироваться",
        has_account: "У вас есть аккаунт?",
        login_link: "Войти",
        welcome: "ДОБРО ПОЖАЛОВАТЬ!",
        social_text: "Или через соцсети",

        // Footer
        footer_desc: "Ваше цифровое будущее начинается здесь",
        footer_links_title: "Ссылки",
        footer_link1: "Главная",
        footer_link2: "Особенности",
        footer_link3: "О нас",
        footer_link4: "Вход",
        footer_social_title: "Социальные сети",
        footer_rights: "Все права защищены.",
        footer_dev: "Разработчик",
        site_version: "Версия: 1.0 Beta",

        // Features Page
        features_hero_title: "Особенности Alya",
        features_hero_subtitle: "Все преимущества, которые предлагает наша платформа",
        feature_ai_title: "Искусственный Интеллект",
        feature_ai_desc: "Мощный ИИ-помощник всегда готов помочь",
        feature_security_title: "Безопасность",
        feature_security_desc: "Все ваши данные защищены на самом высоком уровне",
        feature_speed_title: "Скорость",
        feature_speed_desc: "Максимальная скорость благодаря передовым технологиям",
        feature_support_title: "Поддержка",
        feature_support_desc: "Профессиональная служба поддержки 24/7",
        feature_offline_title: "Офлайн",
        feature_offline_desc: "Вы можете работать без подключения к интернету",
        feature_free_title: "Бесплатно",
        feature_free_desc: "Пользуйтесь всеми сервисами бесплатно",
        features_cta: "Начать",
        features_title: "Наши Преимущества",

        // About Page
        about_hero_title: "О Нас",
        about_hero_subtitle: "Alya_Kujou.Uz - Платформа для цифрового будущего",
        latest_posts_title: "Последние Обновления",
        about_story_title: "Наша История",
        about_story_content: "Alya_Kujou.Uz была создана Aniedituz в 2025 году. Наша цель - сделать технологии искусственного интеллекта доступными для всех.",
        about_mission_title: "Наша Миссия",
        about_mission_content: "Предоставить каждому пользователю мощный, безопасный и удобный инструмент искусственного интеллекта.",
        about_vision_title: "Будущее",
        about_vision_content: "Сделать искусственный интеллект неотъемлемой частью повседневной жизни.",
        team_title: "Команда",
        team_member1: "Aniedituz - Основатель и Главный Разработчик",
        team_member2: "StormDev - UI/UX Дизайнер",
        team_member3: "OpenAI - Технический Консультант",

        // Services Page
        services_hero_title: "Наши Услуги",
        services_hero_subtitle: "Полные решения для вашего бизнеса",
        service1_title: "ИИ Решения",
        service1_desc: "Создание персонального ИИ-помощника",
        service2_title: "Веб Приложения",
        service2_desc: "Разработка современных веб-приложений",
        service3_title: "Telegram Боты",
        service3_desc: "Создание профессиональных Telegram ботов",
        service4_title: "Анализ Данных",
        service4_desc: "Анализ больших объемов данных",
        service5_title: "Искусственный Интеллект",
        service5_desc: "Решения на основе искусственного интеллекта",
        service6_title: "Техническая Поддержка",
        service6_desc: "Техническая поддержка 24/7",

        // Admin Panel
        admin_welcome: "Добро пожаловать, Администратор",
        admin_subtitle: "Статистика платформы и настройки",
        stat_users: "Пользователи",
        stat_active: "Активные Пользователи",
        stat_posts: "Посты",
        stat_uptime: "Активность",
        stat_support: "Поддержка",
        section_dashboard: "Панель управления",
        section_users: "Пользователи",
        section_posts: "Посты",
        section_settings: "Настройки",
        section_analytics: "Аналитика",
        section_transactions: "Транзакции",
        section_security: "Безопасность",
        dashboard_title: "Общая Статистика",
        recent_activity: "Последняя Активность",
        user_management: "Управление Пользователями",
        post_management: "Управление Постами",
        system_settings: "Настройки Системы",
        analytics_title: "Аналитические Отчеты",
        transactions_title: "Платежные Транзакции",
        security_title: "Настройки Безопасности"
    },
    en: {
        // Navbar
        nav_home: "Home",
        nav_features: "Features",
        nav_about: "About",
        nav_services: "Services",
        nav_support: "Support",
        nav_login: "Login",
        latest_posts_title: "Latest Updates",

        // Hero
        hero_title: "Welcome to Alya_Kujou.Uz",
        hero_subtitle: "The advanced platform for your digital experience. Secure, Fast, and Beautiful.",
        hero_cta: "Get Started",
        latest_posts_title: "Latest Updates",

        // Support Page
        support_title: "24/7 Support",
        support_subtitle: "We are ready to help you at any time",
        channel_chat_title: "Live Chat",
        channel_chat_desc: "Get an instant response. Average time: 2 mins",
        channel_email_title: "Email",
        channel_email_desc: "Contact us via support@alyakujou.com",
        channel_phone_title: "Phone",
        channel_phone_desc: "Call us at +998 90 123 45 67",
        channel_ai_title: "AI Assistant",
        channel_ai_desc: "Alya AI is always at your service",
        chat_demo_title: "Live Chat Demo",
        chat_demo_status: "Online - Average response time 2 mins",
        faq_title: "Frequently Asked Questions",

        // Auth
        login_title: "Login",
        login_label: "Username",
        password_label: "Password",
        login_btn: "Login",
        no_account: "Don't have an account?",
        signup_link: "Sign Up",
        welcome_back: "WELCOME BACK!",
        signup_title: "Register",
        email_label: "Email",
        signup_btn: "Register",
        has_account: "Already have an account?",
        login_link: "Sign In",
        welcome: "WELCOME!",
        social_text: "Or social media",

        // Footer
        footer_desc: "Your digital future starts here",
        footer_links_title: "Links",
        footer_link1: "Home",
        footer_link2: "Features",
        footer_link3: "About Us",
        footer_link4: "Login",
        footer_social_title: "Social Networks",
        footer_rights: "All rights reserved.",
        footer_dev: "Developer",
        site_version: "Version: 1.0 Beta",

        // Features Page
        features_hero_title: "Alya Features",
        features_hero_subtitle: "All advantages our platform offers you",
        feature_ai_title: "Artificial Intelligence",
        feature_ai_desc: "Powerful AI assistant always ready to help",
        feature_security_title: "Security",
        feature_security_desc: "All your data is protected at the highest level",
        feature_speed_title: "Speed",
        feature_speed_desc: "Maximum speed through advanced technologies",
        feature_support_title: "Support",
        feature_support_desc: "Professional 24/7 support service",
        feature_offline_title: "Offline",
        feature_offline_desc: "You can work without internet connection",
        feature_free_title: "Free",
        feature_free_desc: "Use all services for free",
        features_cta: "Get Started",
        features_title: "Our Advantages",
        stat_users: "Users",
        stat_uptime: "Uptime",
        stat_support: "Support",

        // About Page
        about_hero_title: "About Us",
        about_hero_subtitle: "Alya_Kujou.Uz - Platform for Digital Future",
        about_story_title: "Our Story",
        about_story_content: "Alya_Kujou.Uz was created by Aniedituz in 2025. Our goal is to make artificial intelligence technologies accessible to everyone.",
        about_mission_title: "Our Mission",
        about_mission_content: "To provide every user with a powerful, secure and convenient artificial intelligence tool.",
        about_vision_title: "Future",
        about_vision_content: "To make artificial intelligence an integral part of everyday life.",
        team_title: "Team",
        team_member1: "Aniedituz - Founder and Lead Developer",
        team_member2: "StormDev - UI/UX Designer",
        team_member3: "OpenAI - Technical Consultant",

        // Services Page
        services_hero_title: "Our Services",
        services_hero_subtitle: "Complete solutions for your business",
        service1_title: "AI Solutions",
        service1_desc: "Creating personal AI assistant",
        service2_title: "Web Applications",
        service2_desc: "Developing modern web applications",
        service3_title: "Telegram Bots",
        service3_desc: "Creating professional Telegram bots",
        service4_title: "Data Analysis",
        service4_desc: "Analyzing large volumes of data",
        service5_title: "Artificial Intelligence",
        service5_desc: "Solutions based on artificial intelligence",
        service6_title: "Technical Support",
        service6_desc: "24/7 technical support",

        // Admin Panel
        admin_welcome: "Welcome, Administrator",
        admin_subtitle: "Platform statistics and settings",
        stat_users: "Users",
        stat_active: "Active Users",
        stat_posts: "Posts",
        stat_uptime: "Uptime",
        stat_support: "Support",
        section_dashboard: "Dashboard",
        section_users: "Users",
        section_posts: "Posts",
        section_settings: "Settings",
        section_analytics: "Analytics",
        section_transactions: "Transactions",
        section_security: "Security",
        dashboard_title: "General Statistics",
        recent_activity: "Recent Activity",
        user_management: "User Management",
        post_management: "Post Management",
        system_settings: "System Settings",
        analytics_title: "Analytics Reports",
        transactions_title: "Payment Transactions",
        security_title: "Security Settings"
    }
};

// --- Language Switcher ---
function setLanguage(lang) {
    localStorage.setItem('preferred_lang', lang);
    langButtons.forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
    });

    document.querySelectorAll('[data-key]').forEach(element => {
        const key = element.getAttribute('data-key');
        if (translations[lang] && translations[lang][key]) {
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = translations[lang][key];
            } else {
                element.textContent = translations[lang][key];
            }
        }
    });
}

// --- Toast Notifications ---
function showToast(message, type = 'info') {
    let toastContainer = document.querySelector('.toast-container');
    if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.className = 'toast-container';
        document.body.appendChild(toastContainer);
    }
    const toast = document.createElement('div');
    toast.className = `toast-item ${type}`;
    const icon = type === 'success' ? 'fa-check-circle' : (type === 'error' ? 'fa-circle-exclamation' : 'fa-info-circle');
    toast.innerHTML = `<i class="fa-solid ${icon}"></i><span>${message}</span><div class="toast-progress"></div>`;
    toastContainer.appendChild(toast);
    setTimeout(() => {
        toast.classList.add('removing');
        setTimeout(() => toast.remove(), 500);
    }, 4000);
}

// --- User Registry ---
function registerUserInRegistry(email, name, role, photo = '') {
    try {
        if (!email || !name || !role) throw new Error("Foydalanuvchi ma'lumotlari to'liq emas");
        const registry = JSON.parse(localStorage.getItem('alya_user_registry')) || [];
        const userIndex = registry.findIndex(u => u.email && u.email.toLowerCase() === email.toLowerCase());
        const userData = { email, name, role, photo, lastActive: new Date().toISOString() };
        if (userIndex > -1) {
            registry[userIndex] = userData;
        } else {
            registry.push(userData);
        }
        localStorage.setItem('alya_user_registry', JSON.stringify(registry));
    } catch (error) {
        console.error("Error registering user:", error);
    }
}

// --- Google Auth ---
let tokenClient;
function initGoogleAuth() {
    try {
        if (typeof google === 'undefined') {
            console.warn("Google API not loaded");
            return;
        }
        const config = JSON.parse(localStorage.getItem('alya_ai_config')) || {};
        const clientId = config.googleClientId || '289663498406-283ocdqes2obidg8es701p625nnpjk7f.apps.googleusercontent.com';

        tokenClient = google.accounts.oauth2.initTokenClient({
            client_id: clientId,
            scope: 'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile',
            callback: (tokenResponse) => {
                if (tokenResponse && tokenResponse.access_token) {
                    fetchUserInfo(tokenResponse.access_token);
                } else {
                    showToast("Google Auth Error: " + (tokenResponse.error || "Unknown"), "error");
                }
            },
        });
    } catch (err) {
        console.error("Google Auth init failed:", err);
    }
}

async function fetchUserInfo(accessToken) {
    try {
        const response = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
            headers: { 'Authorization': `Bearer ${accessToken}` }
        });
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();

        const emailLower = data.email.toLowerCase();
        const isOwner = (emailLower === OWNER_EMAIL.toLowerCase());
        const role = isOwner ? 'owner' : 'user';

        localStorage.setItem('alya_user_email', data.email);
        localStorage.setItem('alya_user_name', data.name);
        localStorage.setItem('alya_user_photo', data.picture || '');
        localStorage.setItem('alya_user_role', role);

        registerUserInRegistry(data.email, data.name, role, data.picture || '');
        showToast("Tizimga kirdingiz!", "success");
        setTimeout(() => window.location.href = 'index.html', 1500);
    } catch (error) {
        showToast(`Xatolik: ${error.message}`, "error");
    }
}

// --- Form Handling ---
const signinForm = document.getElementById('signin-form');
if (signinForm) {
    signinForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('signin-email').value.trim();
        const password = document.getElementById('signin-password').value;

        if (!email || !password) {
            showToast("Barcha maydonlarni to'ldiring!", "error");
            return;
        }

        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('alya_auth_token', data.token);
                localStorage.setItem('alya_user_email', data.user.email);
                localStorage.setItem('alya_user_name', data.user.name);
                localStorage.setItem('alya_user_role', data.user.role);
                localStorage.setItem('alya_user_photo', data.user.photo || '');

                showToast(`Xush kelibsiz, ${data.user.name}!`, "success");
                setTimeout(() => window.location.href = 'index.html', 1500);
            } else {
                showToast(data.error || "Kirishda xatolik!", "error");
            }
        } catch (error) {
            console.error("Login xatosi:", error);
            showToast("Server bilan ulanishda xato!", "error");
        }
    });
}

const signupForm = document.querySelector('.credentials-panel.signup form');
if (signupForm) {
    signupForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = document.getElementById('signup-username').value.trim();
        const email = document.getElementById('signup-email').value.trim();
        const password = document.getElementById('signup-password').value;

        if (!name || !email || !password) {
            showToast("Barcha maydonlarni to'ldiring!", "error");
            return;
        }

        try {
            const response = await fetch('/api/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password })
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('alya_auth_token', data.token);
                localStorage.setItem('alya_user_email', data.user.email);
                localStorage.setItem('alya_user_name', data.user.name);
                localStorage.setItem('alya_user_role', data.user.role);

                showToast("Ro'yxatdan o'tdingiz!", "success");
                setTimeout(() => window.location.href = 'index.html', 1500);
            } else {
                showToast(data.error || "Ro'yxatdan o'tishda xatolik!", "error");
            }
        } catch (error) {
            console.error("Signup xatosi:", error);
            showToast("Server bilan ulanishda xato!", "error");
        }
    });
}

// --- Navbar and UI ---
function updateNavbarUser() {
    const userEmail = localStorage.getItem('alya_user_email');
    const userName = localStorage.getItem('alya_user_name') || 'User';
    const userRole = localStorage.getItem('alya_user_role');
    const userPhoto = localStorage.getItem('alya_user_photo');

    const loginBtnNav = document.getElementById('loginBtnNav');
    const userProfileNav = document.getElementById('userProfileNav');
    const navUserImg = document.getElementById('navUserImg');
    const navUserName = document.getElementById('navUserName');
    const adminPanelLink = document.getElementById('adminPanelLink');

    if (userEmail && userProfileNav) {
        if (loginBtnNav) loginBtnNav.style.display = 'none';
        userProfileNav.style.display = 'flex';
        if (navUserName) navUserName.textContent = userName;
        if (userPhoto && navUserImg) navUserImg.src = userPhoto;
        if (userRole === 'owner' && adminPanelLink) adminPanelLink.style.display = 'flex';
    } else {
        if (loginBtnNav) loginBtnNav.style.display = 'inline-block';
        if (userProfileNav) userProfileNav.style.display = 'none';
    }
}

// --- Posts Rendering ---
async function renderHomepagePosts() {
    const grid = document.getElementById('homepagePostsGrid');
    if (!grid) return;

    try {
        const response = await fetch('/api/posts');
        const posts = await response.json();

        grid.innerHTML = '';

        if (posts.length === 0) {
            grid.innerHTML = '<div class="posts-loading">Hozircha yangiliklar yo\'q.</div>';
            return;
        }

        posts.forEach(post => {
            const date = new Date(post.created_at).toLocaleDateString();
            const card = document.createElement('div');
            card.className = 'post-card';
            card.innerHTML = `
                <div class="post-header">
                    <h3 class="post-title">${post.title}</h3>
                </div>
                <p class="post-content">${post.content}</p>
                <div class="post-footer">
                    <span class="post-author"><i class="fa-solid fa-user-nib"></i> ${post.author}</span>
                    <span class="post-date">${date}</span>
                </div>
            `;
            grid.appendChild(card);
        });
    } catch (error) {
        console.error("Postlarni yuklashda xato:", error);
        grid.innerHTML = '<div class="posts-loading">Yangiliklarni yuklashda xatolik yuz berdi.</div>';
    }
}

// --- Initializations ---
document.addEventListener('DOMContentLoaded', () => {
    setLanguage(localStorage.getItem('preferred_lang') || 'uz');
    updateNavbarUser();
    initGoogleAuth();
    renderHomepagePosts();

    // Event Listeners
    document.addEventListener('click', (e) => {
        const langBtn = e.target.closest('.lang-btn');
        if (langBtn) setLanguage(langBtn.dataset.lang);

        const googleBtn = e.target.closest('.google-login');
        if (googleBtn && tokenClient) {
            e.preventDefault();
            tokenClient.requestAccessToken();
        }

        if (e.target.closest('#logoutBtnNav')) {
            e.preventDefault();
            localStorage.removeItem('alya_user_email');
            localStorage.removeItem('alya_user_name');
            localStorage.removeItem('alya_user_role');
            localStorage.removeItem('alya_user_photo');
            window.location.href = 'index.html';
        }
    });

    // Profile Dropdown
    const userProfileNav = document.getElementById('userProfileNav');
    const userDropdownNav = document.getElementById('userDropdownNav');
    if (userProfileNav && userDropdownNav) {
        userProfileNav.addEventListener('click', (e) => {
            e.stopPropagation();
            userDropdownNav.classList.toggle('active');
        });
        document.addEventListener('click', () => userDropdownNav.classList.remove('active'));
    }

    // Mobile Menu
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
        });

        // Close menu when a link is clicked
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });
    }

    // Navbar Scroll
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            navbar.classList.toggle('scrolled', window.scrollY > 50);
        });
    }

    // Password Toggle
    document.querySelectorAll('.toggle-password').forEach(btn => {
        btn.addEventListener('click', () => {
            const input = btn.parentElement.querySelector('input');
            const isPass = input.type === 'password';
            input.type = isPass ? 'text' : 'password';
            btn.classList.toggle('fa-eye', !isPass);
            btn.classList.toggle('fa-eye-slash', isPass);
        });
    });
});