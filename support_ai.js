class AlyaSupportAI {
    constructor() {
        this.name = "Alya Support AI";
        this.STORAGE_KEY_CONFIG = 'alya_ai_config';
        this.STORAGE_KEY_CONSOLE = 'alya_system_console';
        this.STORAGE_KEY_USER_MSG = 'alya_user_to_admin';
        this.STORAGE_KEY_ADMIN_MSG = 'alya_admin_to_user';

        this.knowledge = [
            { patterns: ["isming", "kimsa"], response: "Mening ismim Alya Support AI. Men sizning texnik va amaliy masalalardagi yordamchingizman." },
            { patterns: ["nima qila olasan", "vazifang"], response: "Men saytdan foydalanish, muammolarni hal qilish va xizmatlarimiz haqida batafsil ma'lumot berishim mumkin." },
            { patterns: ["xizmatlar", "nima qilasizlar"], response: "Biz quyidagi xizmatlarni taqdim etamiz: Cloud Storage (bulutli saqlash), Web Development (veb-saytlar yaratish) va 24/7 Professional Support." },
            { patterns: ["cloud", "saqlash", "bulut"], response: "Bizning Cloud Storage xizmatimiz juda xavfsiz va tezkor. 'Services' bo'limiga o'tib, 'Cloud Storage' tugmasini bossangiz, batafsil ma'lumot olasiz." },
            { patterns: ["web", "dasturlash", "sayt ochish"], response: "Veb-sayt yaratish bo'yicha bizning jamoamiz professional darajada xizmat ko'rsatadi. Murojaat qilsangiz, loyihangizni muhokama qilamiz." },
            { patterns: ["login", "kirish", "akaunt"], response: "Kirish uchun 'Login' tugmasidan foydalaning. Agar ro'yxatdan o'tmagan bo'lsangiz, 'Sign Up' havolasini bosing." },
            { patterns: ["parol", "unutdim", "password"], response: "Xavotir olmang! Login sahifasida 'Password forgotten?' tugmasini bosing. Emailingizga tiklash kodi yuboriladi." },
            { patterns: ["xatolik", "error", "ishlamayapti"], response: "Qanday xatolik yuz berdi? Iltimos, batafsilroq tushuntiring yoki skrinshotni adminlarimizga Telegram orqali yuboring." },
            { patterns: ["admin", "bog'lanish", "telegram", "aloqa"], response: "Asosiy adminimiz va xizmat ko'rsatuvchi: @stormdev_coder. Telegram orqali istalgan vaqtda yozishingiz mumkin." },
            { patterns: ["telefon", "nomer", "call"], response: "Bizning aloqa raqamimiz: +998 90 123 45 67. Ish vaqti: 09:00 dan 21:00 gacha (Haftada 7 kun)." },
            { patterns: ["manzil", "ofis", "qayerda"], response: "Hozirda biz masofaviy (online) xizmat ko'rsatamiz, lekin barcha xizmatlarimiz rasmiy kafolatlangan va xavfsiz." },
            { patterns: ["to'lov", "click", "payme", "visa"], response: "Biz Click, Payme va Visa kartalari orqali to'lovlarni qabul qilamiz. To'lov tizimi to'liq avtomatlashtirilgan." },
            { patterns: ["narx", "qimmat", "arzon", "tarif"], response: "Cloud Storage tariflari oyiga 10,000 so'mdan boshlanadi. Boshqa xizmatlar uchun individual narx hisoblanadi." },
            { patterns: ["vaqt", "soat nechada", "ochiq"], response: "Sayt va AI yordamchi 24/7 ishlaydi. Jonli operatorlarimiz esa har kuni 09:00 dan 21:00 gacha faol." },
            { patterns: ["ish", "vakansiya", "hamkorlik"], response: "Biz doimo iste'dodli dasturchilar va dizaynerlar bilan hamkorlik qilishga tayyormiz. CV yuboring: @stormdev_coder" },
            { patterns: ["xavfsizmi", "garantiya", "ishonch"], response: "Bizning platformamiz SSL sertifikati va zamonaviy firewall tizimlari bilan himoyalangan. Ma'lumotlaringiz 100% xavfsiz." }
        ];

        this.fallbacks = [
            "Bu savol bo'yicha aniq ma'lumotga ega emasman. Iltimos, @stormdev_coder ga murojaat qiling.",
            "Tushunarliroq yozsangiz, sizga yordam bera olaman.",
            "Xizmatlarimiz haqida ko'proq ma'lumot 'Services' sahifasida mavjud.",
            "Kechirasiz, men hozircha o'rganish jarayonidaman."
        ];

        this.config = this.loadConfig();
        this.isOpen = false;
        this.initUI();
    }

    loadConfig() {
        // Always return offline config for offline functionality
        return { isOnline: false, isAdminOnline: false };
    }

    initUI() {
        const widget = document.createElement('div');
        widget.className = 'alya-support-widget';
        widget.innerHTML = `
            <div class="support-toggle" id="supportToggle">
                <i class="fa-solid fa-headset"></i>
                <span class="pulse"></span>
            </div>
            <div class="support-window" id="supportWindow">
                <div class="support-header">
                    <div class="support-ai-info">
                        <div class="support-ai-avatar">A</div>
                        <div>
                            <h4>Alya Support AI</h4>
                            <span class="status-online">Online</span>
                        </div>
                    </div>
                    <button class="support-close" id="supportClose"><i class="fa-solid fa-xmark"></i></button>
                </div>
                <div class="support-messages" id="supportMessages">
                    <div class="s-message bot">Salom! Men Alya Support AI yordamchisiman. Sizga qanday texnik yordam bera olaman?</div>
                </div>
                <div class="support-input-area">
                    <input type="text" id="supportInput" placeholder="Savolingizni yozing...">
                    <button id="supportSend"><i class="fa-solid fa-paper-plane"></i></button>
                </div>
            </div>
        `;
        document.body.appendChild(widget);

        this.toggleBtn = document.getElementById('supportToggle');
        this.window = document.getElementById('supportWindow');
        this.closeBtn = document.getElementById('supportClose');
        this.messagesContainer = document.getElementById('supportMessages');
        this.input = document.getElementById('supportInput');
        this.sendBtn = document.getElementById('supportSend');

        this.toggleBtn.addEventListener('click', () => this.toggleChat());
        this.closeBtn.addEventListener('click', () => this.toggleChat());
        this.sendBtn.addEventListener('click', () => this.sendMessage());
        this.input.addEventListener('keypress', (e) => { if (e.key === 'Enter') this.sendMessage(); });

        this.initDemoChat();
        this.updatePresenceUI();

        window.addEventListener('storage', (e) => {
            if (e.key === this.STORAGE_KEY_CONFIG) {
                this.config = JSON.parse(e.newValue);
                this.updatePresenceUI();
            }
        });
    }

    updatePresenceUI() {
        const label = document.querySelector('.status-online');
        if (label) {
            // Always show offline for offline functionality
            label.textContent = 'Offline';
            label.style.color = '#ff3333';
        }
    }

    toggleChat() {
        this.isOpen = !this.isOpen;
        this.window.classList.toggle('active', this.isOpen);
        if (this.isOpen) this.input.focus();
    }

    sendMessage() {
        const text = this.input.value.trim();
        if (!text) return;
        this.addMessage(text, 'user');
        this.input.value = '';
        this.processInput(text, 'widget');
    }

    initDemoChat() {
        const dInput = document.getElementById('demoChatInput');
        const dSend = document.getElementById('demoChatSend');
        const dMessages = document.getElementById('demoChatMessages');
        if (dInput && dSend && dMessages) {
            dSend.addEventListener('click', () => this.handleDemoMessage(dInput, dMessages));
            dInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') this.handleDemoMessage(dInput, dMessages); });
        }
    }

    handleDemoMessage(inputEl, containerEl) {
        const text = inputEl.value.trim();
        if (!text) return;
        this.addDemoMessage(containerEl, text, 'user');
        inputEl.value = '';
        this.processInput(text, 'demo', containerEl);
    }

    processInput(text, source, container = null) {
        this.logToConsole(`[${source}] User: ${text}`, 'user');
        localStorage.setItem(this.STORAGE_KEY_USER_MSG, JSON.stringify({ text, timestamp: Date.now(), source }));

        // Always use AI response for offline functionality
        setTimeout(() => {
            const response = this.getResponse(text);
            if (source === 'widget') this.addMessage(response, 'bot');
            else this.addDemoMessage(container, response, 'support');
            this.logToConsole(`[${source}] AI: ${response}`, 'ai');
        }, 1000);
    }

    getResponse(text) {
        const lower = text.toLowerCase();
        for (const item of this.knowledge) {
            if (item.patterns.some(p => this.isMatch(lower, p))) return item.response;
        }
        return this.fallbacks[Math.floor(Math.random() * this.fallbacks.length)];
    }

    isMatch(text, pattern) {
        const p = pattern.toLowerCase().trim();
        const t = text.toLowerCase().trim();
        // Escape special regex characters in the pattern
        const escapedPattern = p.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const regex = new RegExp(`(^|\s|[,.!?;])${escapedPattern}($|\s|[,.!?;])`, 'i');
        return regex.test(t);
    }

    addMessage(text, sender) {
        const msg = document.createElement('div');
        msg.className = `s-message ${sender}`;
        msg.textContent = text;
        this.messagesContainer.appendChild(msg);
        this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
    }

    addDemoMessage(container, text, sender) {
        const div = document.createElement('div');
        div.className = `message ${sender}`;
        const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        div.innerHTML = `<div class="message-avatar">${sender === 'support' ? 'A' : 'U'}</div>
                         <div class="message-content"><p>${text}</p><span class="message-time">${time}</span></div>`;
        container.appendChild(div);
        container.scrollTop = container.scrollHeight;
    }

    logToConsole(message, type) {
        localStorage.setItem(this.STORAGE_KEY_CONSOLE, JSON.stringify({ message, type, timestamp: Date.now() }));
    }
}

window.addEventListener('load', () => { if (window.location.pathname.includes('support.html')) new AlyaSupportAI(); });
