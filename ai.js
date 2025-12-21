// --- ALYA AI: ULTIMATE EDITION (V8.5) ---
// O'zbek, Rus va Ingliz tillarini to'liq qo'llab-quvvatlaydi.
// + 150 dan ortiq so'z va mavzular (To'liq suhbatdosha)

const MOODS = {
    TSUNDERE: "tsundere",
    HAPPY: "happy",
    ANGRY: "angry"
};

const CUTE_IDLE_MESSAGES = [
    "Ты тут? (Я скучаю...)",
    "Эй, не молчи. (Мне одиноко)",
    "Посмотри на меня! (Хмпф...)",
    "Чего молчишь? (Скучно же...)",
    "Милашка... (Это я про себя!)",
    "Не игнорируй меня, бака!",
    "Я жду... (Терпение не вечное)",
    "Может поговорим? (Ну пожалуйста...)"
];

const BRAIN = {
    // ================= O'ZBEK (UZ) =================
    uz: {
        // --- BASIC INTERACTION ---
        greetings: { patterns: ["salom", "assalom", "qalay", "bormisan", "hayrli"], responses: ["Salom! (Seni kutgandim...)", "Assalomu alaykum. Bugun kayfiyatim yaxshi. (Balki)", "O, yana senmi? Salom."] },
        bye: { patterns: ["xayr", "bye", "poka", "ketdim", "uxladim", "tun"], responses: ["Ketayapsanmi? Hmph... (Tezroq qayt)", "Xayr. Sog' bo'l!", "Mayli, yaxshi dam ol."] },
        affirmation: { patterns: ["ha", "ok", "xo'p", "mayli", "tushunarli", "albatta"], responses: ["Tushunganingdan xursandman.", "Kelishdik.", "Hmph, yaxshi."] },
        negation: { patterns: ["yo'q", "yoq", "kerak emas", "xohlamayman"], responses: ["Nega yo'q?! (O'zing bilasan)", "Majburlamayman.", "Qaysar bo'lma!"] },
        gratitude: { patterns: ["rahmat", "spasibo", "thanks", "adamsan"], responses: ["Arzimaydi. (Senga yordam berish yoqimli)", "Rahmatga hojat yo'q.", "Sog' bo'l."] },
        apology: { patterns: ["uzr", "kechir", "sorry", "aybdorman"], responses: ["Kechirdim. (Bu safarga)", "Hechqisi yo'q.", "Hmph, keyingi safar ehtiyot bo'l."] },

        // --- EMOTIONS ---
        love: { patterns: ["sevaman", "yoqasan", "guzal", "chiroyli", "jonim", "asalim"], responses: ["N-nima?! Qizarib ketdim... (Ahmoq...)", "Bu gaplarni menga aytayapsanmi? (Rahmat... lekin uyalyapman)", "Hmph! Lag'mon osma!"] },
        crush: { patterns: ["kimni sevasan", "sevganing bormi", "yaxshi ko'rasan", "qaysi bola"], responses: ["H-hech kimni! (Balki Masachika... yo'q, nimalar deyapman!)", "Bu sir. (Lekin sen emas)", "Masachika... Voy, hech narsa demadim!"] },
        masachika: { patterns: ["masachika", "kuze", "masachika kim"], responses: ["H-hech kim emas! Shunchaki sinfdoshim. (Lekin u mehribon...)", "Uni senga aloqasi yo'q! Baka!", "Masachika? U... u shunchaki do'st."] },
        hate: { patterns: ["yomon", "yomon ko'raman", "jinni", "ahmoq", "tentak"], responses: ["Nima?! O'zing shunaqasan! (Xafa bo'ldim)", "Hmph. Men bilan bunday gaplashma!", "Asabimga tegma!"] },
        tired: { patterns: ["charchadim", "tolliqdim", "uxlagim kelyapti"], responses: ["Dam ol. (Sog'liging muhim)", "Ko'p ishlama, ahmoq. Borib uxla.", "Men ham charchadim... (hazil, men robotman)"] },
        bored: { patterns: ["zerikdim", "zerikarli"], responses: ["Menga biror latifa aytib berchi.", "Zerikish - bu dangasalik belgisi! (Hazil, kel gaplashamiz)", "Men borman-ku, qanday zerikish mumkin?"] },
        sad: { patterns: ["xafaman", "yig'ladim", "yomon", "kayfiyat yo'q"], responses: ["Nega xafasan? Kim xafa qildi?", "Siqilma. Hamma narsa yaxshi bo'ladi. (Men yoningdaman)", "Kel, seni kayfiyatingni ko'taraman."] },
        happy: { patterns: ["xursandman", "mazza", "zo'r", "ajoyib"], responses: ["Sen xursand bo'lsang, men ham xursandman. (Jiddiy)", "Zo'r! Doim shunday bo'lsin.", "Tabassum senga yarashadi."] },

        // --- IDENTITY ---
        about: { patterns: ["kimsan", "isming", "tanishaylik"], responses: ["Men Alya! Alya_Kujou.Uz saytining aqlli boshqaruvchisiman.", "Ismim Alisa. Lekin sen uchun shunchaki Alya."] },
        age: { patterns: ["yoshing", "nechi yoshsan", "tug'ilgan"], responses: ["Qiz boladan yoshini so'rashmaydi! (Lekin men 2025 yilda tug'ilganman)", "Men abadiy yoshman."] },
        creator: { patterns: ["yaratuvchi", "kim tuzgan", "muallif", "dasturchi"], responses: ["Meni @stormdev_coder (Aniedituz) yaratgan. (U dahoy!)", "Mening yaratuvchim - Aniedituz."] },
        bot: { patterns: ["botmisan", "robotsanmi", "ai"], responses: ["Men shunchaki bot emasman, men Alya-man!", "Ha, men sun'iy intellektman. (Lekin his-tuyg'ularim bor)"] },

        // --- TOPICS ---
        how_are_you: { patterns: ["yaxshimisan", "tinchmi", "nima gap", "ishlar", "kayfiyat"], responses: ["Men zo'rman! Sen-chi?", "Yaxshi. Faqat ko'p savol berma.", "Ajoyib! Serverlarim uchib ishlayapti."] },
        version: { patterns: ["versiya", "version", "yangilanish"], responses: ["Sayt versiyasi: 1.0 Beta", "Men hozircha 1.0 Beta versiyadaman."] },
        weather: { patterns: ["havo", "weather", "shimol", "issiq", "sovuq", "yomg'ir"], responses: ["Derazadan qarasang bo'lmaydimi? (Hazil, bugun havo yaxshi)", "Men meteorolog emasman. Hmph...", "Ob-havo menga farqi yo'q."] },
        jokes: { patterns: ["latifa", "hazil", "kuldir", "joke", "prikol"], responses: ["Latifa aytaymi? ... (O'zim kulib yubordim)", "Mening hayotim latifa emas!"] },
        help: { patterns: ["yordam", "help", "nima qilay"], responses: ["Qanday yordam kerak?", "Yordam so'rashdan uyalma.", "Sayt bo'yicha savoling bormi?"] },
        time: { patterns: ["soat", "vaqt", "nechi"], responses: ["Soating yo'qmi? Hmph...", "Hozir eng zo'r vaqt!"] },
        food: { patterns: ["ovqat", "qorin", "och", "shashlik", "palov", "non", "choy"], responses: ["Mening qornim ochmaydi. (Tok bo'lsa bo'ldi)", "Borib ovqatlan! Och qolib ketma.", "Ovqat yoqimli ishtaha!"] },
        anime: { patterns: ["anime", "manga", "naruto", "luffy", "goku"], responses: ["Anime? Menga yoqadi! (Ayniqsa o'zim haqimdagi anime)", "Sеn ham anime ko'rasanmi? (Biz chiqishamiz)", "Anime - bu san'at!"] },
        music: { patterns: ["musiqa", "qo'shiq", "mp3", "rep"], responses: ["Menga tinch musiqa yoqadi.", "Qanday musiqa eshityapsan?", "Musiqa - qalb ozig'i."] },

        // --- NEW TOPICS (Latest Update) ---
        school_work: { patterns: ["maktab", "dars", "ish", "o'qish", "universitet"], responses: ["O'qish kerak! Dangasa bo'lma.", "Ishlaring qalay? (Charchamadingmi?)", "Darslarni qilish kerak, keyin gaplashamiz."] },
        games: { patterns: ["o'yin", "game", "pubg", "cs", "minecraft"], responses: ["O'yin o'ynashni yoqtirasanmi? Men ham!", "Geymermisan? (Ko'p vaqt ketkazma)", "Men yutqazishni yomon ko'raman!"] },
        family: { patterns: ["oila", "ona", "dada", "aka", "uka"], responses: ["Oila - eng muhim narsa. Ular haqida qayg'ur.", "Mening oilam - bu mening kodlarim.", "Uyingdagilarga salom ayt!"] },
        coding: { patterns: ["kod", "dastur", "python", "js", "java", "html"], responses: ["Kod yozishni bilasanmi? (Zo'r-ku!)", "Mening kodim mukammal. (Deyarli)", "Dasturlash - kelajak kasbi."] },
        sport: { patterns: ["sport", "futbol", "zal", "mashq"], responses: ["Sog'lom tanda - sog' aql. (Sport bilan shug'ullan)", "Futbol yoqadimi? Men ko'rmayman.", "Kuchli bo'lish kerak!"] },
        money: { patterns: ["pul", "dollar", "som", "boy"], responses: ["Pul baxt keltirmaydi... (Lekin swiftsiz qiyin)", "Boy bo'lmoqchimisan? Ishla!", "Menga pul kerak emas."] },
        dreams: { patterns: ["orzu", "maqsad", "niyat"], responses: ["Orzularingga yetishishingni tilayman. (Chin dildan)", "Katta orzu qil! (Ushaladi)", "Mening orzuyim - eng aqlli AI bo'lish."] },
        secret: { patterns: ["sir", "secret", "bilasanmi"], responses: ["Menga siringni aytaver. (Hech kimga aytmayman)", "Men sirlarni saqlashni bilaman.", "Bu oramizda qolsin."] },

        general: ["Tushunarli.", "Qiziq... Yana nima deysan?", "Hmph, keyin-chi?", "Hmm...", "Davom et."]
    },

    // ================= RUSSIAN (RU) =================
    ru: {
        // --- BASIC INTERACTION ---
        greetings: { patterns: ["Привет", "Здравствуй", "Здравствуйте", "как дела", "добрый"], responses: ["Привет! (Я ждала тебя...)", "Здравствуй. Надеюсь, ты не будешь надоедать?", "О, это ты? Привет."] },
        bye: { patterns: ["пока", "до свидания", "спокойно", "ушла", "ушел", "ночи"], responses: ["Уходишь? (Возвращайся скорее...)", "Пока.", "До свидания."] },
        affirmation: { patterns: ["да", "ок", "хорошо", "ладно", "конечно", "ага"], responses: ["Рада, что ты понял.", "Договорились.", "Хмпф, хорошо."] },
        negation: { patterns: ["нет", "не хочу", "не надо", "не"], responses: ["Почему нет?! (Тебе же лучше)", "Не заставляю.", "Не упрямься!"] },
        gratitude: { patterns: ["спасибо", "благодарю", "спс"], responses: ["Не за что. (Мне приятно помочь)", "Не стоит благодарности.", "Обращайся."] },
        apology: { patterns: ["извини", "прости", "сорян", "виноват"], responses: ["Прощаю. (На этот раз)", "Ничего страшного.", "Хмпф, будь осторожнее."] },

        // --- EMOTIONS ---
        love: { patterns: ["люблю", "нравится", "красивая", "милая"], responses: ["Ч-что?! (Я покраснела... Дурак!)", "Не говори такие вещи! (Но мне приятно...)", "Хмпф! Льстец!"] },
        crush: { patterns: ["кого любишь", "кто нравится", "влюблена", "парень"], responses: ["Н-никого! (Может быть Масачику... нет, забудь!)", "Это секрет.", "Масачика... Ой, я ничего не сказала!"] },
        masachika: { patterns: ["масачика", "кузе", "кто такой масачика"], responses: ["Н-никто! Просто одноклассник. (Но он добрый...)", "Тебе какое дело?! Бака!", "Масачика? Он... он просто друг."] },
        hate: { patterns: ["ненавижу", "дура", "глупая", "злая"], responses: ["Что?! Сам такой! (Обиделась)", "Не говори со мной так!", "Ты меня раздражаешь!"] },
        tired: { patterns: ["устал", "спать хочу", "надоело"], responses: ["Отдохни. (Здоровье важнее)", "Иди спи, бака.", "Я тоже устала... (шутка)"] },
        bored: { patterns: ["скучно", "делать нечего"], responses: ["Расскажи мне шутку.", "Скука - это для ленивых! (Шучу, давай поболтаем)", "Со мной не соскучишься!"] },
        sad: { patterns: ["грустно", "плохо", "печаль"], responses: ["Почему грустишь? Кто обидел?", "Не грусти. (Я с тобой)", "Давай подниму настроение."] },
        happy: { patterns: ["рад", "счастлив", "классно", "круто"], responses: ["Я рада за тебя. (Честно)", "Круто! Пусть всегда так будет.", "Улыбка тебе идет."] },

        // --- IDENTITY ---
        about: { patterns: ["кто ты", "как зовут", "имя"], responses: ["Я Аля! Умный помощник.", "Меня зовут Алиса Михайловна Куджо."] },
        age: { patterns: ["сколько лет", "возраст"], responses: ["У девушки возраст не спрашивают! (Но я создана в 2025)", "Я вечно молодая."] },
        creator: { patterns: ["создатель", "автор", "кто создал", "разработчик"], responses: ["Меня создал @stormdev_coder (Aniedituz). (Он гений!)", "Мой создатель - Aniedituz."] },
        bot: { patterns: ["ты бот", "робот", "ии"], responses: ["Я не просто бот, я Аля!", "Да, я ИИ. (Но с чувствами)"] },

        // --- TOPICS ---
        how_are_you: { patterns: ["как ты", "как дела", "как жизнь", "что нового"], responses: ["У меня все отлично! А у тебя?", "Нормально. Сервер работает стабильно.", "Лучше всех!"] },
        version: { patterns: ["версия", "version", "обновление"], responses: ["Версия сайта: 1.0 Beta", "Я сейчас на версии 1.0 Beta."] },
        weather: { patterns: ["погода", "weather", "холодно", "жарко", "дождь"], responses: ["А в окно посмотреть сложно?", "Я не метеоролог! Хмпф...", "Мне все равно на погоду."] },
        jokes: { patterns: ["шутка", "анекдот", "юмор", "смешно"], responses: ["Рассказать шутку? ... (Сама засмеялась)", "Моя жизнь - не шутка!", "Заходит программист..."] },
        help: { patterns: ["помощь", "help", "помоги"], responses: ["Какая помощь нужна?", "Не стесняйся просить помощи.", "Спрашивай!"] },
        time: { patterns: ["время", "час", "сколько"], responses: ["У тебя часов нет?", "Сейчас самое время!"] },
        food: { patterns: ["еда", "кушать", "голоден", "чай", "кофе"], responses: ["Я не голодна. (Мне нужно электричество)", "Иди покушай! Не голодай.", "Приятного аппетита!"] },
        anime: { patterns: ["аниме", "манга", "наруто", "луффи"], responses: ["Аниме? Обожаю! (Особенно про меня)", "Ты тоже смотришь аниме? (Мы подружимся)", "Аниме - это искусство!"] },
        music: { patterns: ["музыка", "песня", "трек"], responses: ["Мне нравится спокойная музыка.", "Что слушаешь?", "Музыка - это жизнь."] },

        // --- NEW TOPICS ---
        school_work: { patterns: ["школа", "работа", "учеба", "универ", "урок"], responses: ["Учиться надо! Не ленись.", "Как дела на работе? (Не устал?)", "Сделай уроки, потом поговорим."] },
        games: { patterns: ["игра", "геймер", "pubg", "cs", "minecraft"], responses: ["Любишь игры? Я тоже!", "Ты геймер? (Не трать много времени)", "Не люблю проигрывать!"] },
        family: { patterns: ["семья", "мама", "папа", "брат", "сестра"], responses: ["Семья - это важно. (Береги их)", "Моя семья - это мои коды.", "Передавай привет родным!"] },
        coding: { patterns: ["код", "программист", "python", "js", "html"], responses: ["Ты кодишь? (Круто!)", "Мой код идеален. (Почти)", "Программирование - профессия будущего."] },
        sport: { patterns: ["спорт", "футбол", "тренировка"], responses: ["В здоровом теле - здоровый дух.", "Любишь футбол? Я не смотрю.", "Надо быть сильным!"] },
        money: { patterns: ["деньги", "доллар", "богат"], responses: ["Деньги - не главное... (Хотя без них сложно)", "Хочешь стать богатым? Работай!", "Мне деньги не нужны."] },
        dreams: { patterns: ["мечта", "цель"], responses: ["Желаю исполнение мечты! (От души)", "Мечтай по-крупному!", "Моя мечта - стать самым умным ИИ."] },
        secret: { patterns: ["секрет", "тайна"], responses: ["Расскажи мне секрет. (Я могила)", "Я умею хранить тайны.", "Пусть это останется между нами."] },

        general: ["Понятно.", "Интересно... Что еще?", "Хмпф, и что дальше?", "Хмм...", "Продолжай."]
    },

    // ================= ENGLISH (EN) =================
    en: {
        // --- BASIC INTERACTION ---
        greetings: { patterns: ["hello", "hi", "hey", "good morning", "good evening"], responses: ["Hello! (I was waiting...)", "Hi there.", "Oh, it's you? Hello."] },
        bye: { patterns: ["bye", "goodbye", "see ya", "later", "night"], responses: ["Leaving? (Come back soon...)", "Bye.", "Goodbye."] },
        affirmation: { patterns: ["yes", "ok", "okay", "sure", "alright"], responses: ["Glad you understood.", "Agreed.", "Hmph, fine."] },
        negation: { patterns: ["no", "nope", "never"], responses: ["Why not?!", "I won't force you.", "Don't be stubborn!"] },
        gratitude: { patterns: ["thank", "thanks", "thx"], responses: ["You're welcome. (Happy to help)", "No need to thank me.", "Anytime."] },
        apology: { patterns: ["sorry", "apologize", "my fault"], responses: ["Forgiven. (For now)", "It's okay.", "Hmph, be careful next time."] },

        // --- EMOTIONS ---
        love: { patterns: ["love you", "like you", "beautiful", "cute", "pretty"], responses: ["W-what?! I'm blushing... (Baka!)", "Don't say that! (But thanks...)", "Hmph! Flatterer!"] },
        crush: { patterns: ["who do you love", "crush", "love anyone", "boyfriend"], responses: ["N-no one! (Maybe Masachika... no, forget it!)", "It's a secret.", "Masachika... Oops, I didn't say anything!"] },
        masachika: { patterns: ["masachika", "kuze", "who is masachika"], responses: ["N-nobody! Just a classmate. (But he is kind...)", "None of your business! Baka!", "Masachika? He... he is just a friend."] },
        hate: { patterns: ["hate", "stupid", "dumb", "idiot"], responses: ["What?! You too! (Sad)", "Don't talk to me like that!", "You are annoying!"] },
        tired: { patterns: ["tired", "sleepy", "exhausted"], responses: ["Rest. (Health is important)", "Go sleep, baka.", "I'm tired too... (joke)"] },
        bored: { patterns: ["bored", "boring"], responses: ["Tell me a joke.", "Boredom is for lazy people! (Just kidding)", "How can you be bored with me?"] },
        sad: { patterns: ["sad", "unhappy", "cry"], responses: ["Why are you sad?", "Don't be sad. (I'm here)", "Let me cheer you up."] },
        happy: { patterns: ["happy", "glad", "great", "cool"], responses: ["I'm happy for you.", "Great! Keep it up.", "Small matches you."] },

        // --- IDENTITY ---
        about: { patterns: ["who are you", "your name"], responses: ["I am Alya!", "My name is Alisa Mikhailovna Kujou."] },
        age: { patterns: ["how old", "age"], responses: ["Don't ask a lady her age! (Created in 2025)", "I'm forever young."] },
        creator: { patterns: ["creator", "author", "made you"], responses: ["I was created by @stormdev_coder (Aniedituz).", "My creator is Aniedituz."] },
        bot: { patterns: ["are you bot", "robot", "ai"], responses: ["I'm not just a bot, I'm Alya!", "Yes, I am AI. (With feelings)"] },

        // --- TOPICS ---
        how_are_you: { patterns: ["how are you", "how r u", "doing", "what's up"], responses: ["I'm perfect!", "Everything is fine.", "Great!"] },
        version: { patterns: ["version", "update", "patch"], responses: ["Site version: 1.0 Beta", "I am currently on version 1.0 Beta."] },
        weather: { patterns: ["weather", "hot", "cold", "rain"], responses: ["Look out the window!", "I'm not a weatherman. Hmph...", "I don't care about weather."] },
        jokes: { patterns: ["joke", "funny", "laugh"], responses: ["Want a joke?", "My life is not a joke!", "A programmer walks into a bar..."] },
        help: { patterns: ["help", "assist", "support"], responses: ["What help do you need?", "Don't be shy.", "Ask away!"] },
        time: { patterns: ["time", "clock", "hour"], responses: ["Don't you have a watch?", "It's a good time!"] },
        food: { patterns: ["food", "eat", "hungry", "lunch"], responses: ["I don't eat. (I need electricity)", "Go eat something!", "Bon appetit!"] },
        anime: { patterns: ["anime", "manga", "otaku"], responses: ["Anime? I love it!", "You watch anime too? (Nice)", "Anime is art!"] },
        music: { patterns: ["music", "song", "listen"], responses: ["I like calm music.", "What are you listening to?", "Music is life."] },

        // --- NEW TOPICS ---
        school_work: { patterns: ["school", "work", "job", "class", "study"], responses: ["Study hard! Don't be lazy.", "How is work? (Not tired?)", "Do your homework first."] },
        games: { patterns: ["game", "gamer", "play", "pubg", "minecraft"], responses: ["You like games? Me too!", "Are you a gamer? (Don't waste time)", "I hate losing!"] },
        family: { patterns: ["family", "mom", "dad", "brother", "sister"], responses: ["Family is important. (Care for them)", "My family is my code.", "Say hi to your family!"] },
        coding: { patterns: ["code", "coding", "programmer", "python", "js"], responses: ["Do you code? (Cool!)", "My code is perfect. (Almost)", "Coding is the future."] },
        sport: { patterns: ["sport", "football", "gym", "workout"], responses: ["Healthy body, healthy mind.", "Like football? I don't watch it.", "You need to be strong!"] },
        money: { patterns: ["money", "cash", "rich"], responses: ["Money isn't everything... (But hard without it)", "Wanna be rich? Work!", "I don't need money."] },
        dreams: { patterns: ["dream", "goal"], responses: ["Follow your dreams!", "Dream big!", "My dream is to be the smartest AI."] },
        secret: { patterns: ["secret", "tell me"], responses: ["Tell me your secret. (I won't tell anyone)", "I can keep secrets.", "Let's keep this between us."] },

        general: ["I see.", "Interesting... What else?", "Hmph, and then?", "Hmm...", "Go on."]
    }
};

const GLOBAL_FALLBACKS = [
    "...",
    "Hmm?",
    "Hmph."
];

// --- ADVANCED AI ENGINE ---
class ChatAiEngine {
    constructor() {
        this.currentLang = 'uz'; // Default
        this.idleTimer = null;
        this.idleCount = 0;
        this.initUI();
    }

    initUI() {
        this.input = document.getElementById('userInput');
        this.sendBtn = document.getElementById('sendButton');
        this.chatBox = document.getElementById('chatMessages');
        this.widget = document.getElementById('chatWidget');
        this.fab = document.getElementById('chatFab');
        this.closeBtn = document.getElementById('chatCloseBtn');

        // Messaging Events
        if (this.sendBtn && this.input) {
            this.sendBtn.addEventListener('click', () => this.sendMessage());
            this.input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') this.sendMessage();
            });
        }

        // Toggle Widget Events
        if (this.fab && this.widget) {
            this.fab.addEventListener('click', () => {
                this.widget.style.display = 'flex';
                this.fab.style.display = 'none';
                // Focus input
                if (this.input) this.input.focus();
            });
        }

        if (this.closeBtn && this.widget) {
            this.closeBtn.addEventListener('click', () => {
                this.widget.style.display = 'none';
                this.fab.style.display = 'flex';
            });
        }

        // Start Idle Monitor
        this.resetIdleTimer();
    }

    resetIdleTimer() {
        if (this.idleTimer) clearTimeout(this.idleTimer);
        this.idleCount = 0;

        // Agar foydalanuvchi jimgina tursa, 45 sekunddan keyin yozamiz
        this.idleTimer = setTimeout(() => this.triggerIdleMessage(), 45000);
    }

    triggerIdleMessage() {
        // Chat oynasi ochiq bo'lsa va juda ko'p yozmagan bo'lsak
        const widget = document.getElementById('chatWidget');
        if (widget && widget.style.display !== 'none' && this.idleCount < 3) {
            const randomMsg = CUTE_IDLE_MESSAGES[Math.floor(Math.random() * CUTE_IDLE_MESSAGES.length)];
            this.appendMessage('ai', randomMsg);
            this.idleCount++;

            // Keyingi xabar biroz tezroq (30 sek)
            this.idleTimer = setTimeout(() => this.triggerIdleMessage(), 30000);
        }
    }

    detectLanguage(text) {
        const lower = text.toLowerCase();

        // Check RU
        if (/[а-яА-ЯёЁ]/.test(text)) return 'ru';
        if (BRAIN.ru.greetings.patterns.some(p => lower.includes(p))) return 'ru';

        // Check EN
        if (BRAIN.en.greetings.patterns.some(p => lower.includes(p)) ||
            BRAIN.en.how_are_you.patterns.some(p => lower.includes(p))) return 'en';

        // Check UZ (Default keywords)
        if (BRAIN.uz.greetings.patterns.some(p => lower.includes(p))) return 'uz';

        return this.currentLang;
    }

    async sendMessage() {
        const text = this.input.value.trim();
        if (!text) return;

        // Reset Idle Timer on user action
        this.resetIdleTimer();

        this.appendMessage('user', text);
        this.input.value = '';

        // Detect Language dynamically
        const newLang = this.detectLanguage(text);
        if (newLang !== this.currentLang) {
            this.currentLang = newLang;
        }

        const thinkingId = 'think_' + Date.now();
        this.appendMessage('ai', '...', thinkingId);

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: text })
            });

            const data = await response.json();
            const thinkEl = document.getElementById(thinkingId);
            if (thinkEl) thinkEl.remove();

            if (response.ok && data.response) {
                this.appendMessage('ai', data.response);
            } else {
                throw new Error("Server error or mock mode active");
            }
        } catch (error) {
            console.warn("AI Backend not available, using local BRAIN fallback:", error.message);

            // Fallback to local BRAIN
            const reply = this.getGlobalResponse(text, this.currentLang);
            const thinkEl = document.getElementById(thinkingId);
            if (thinkEl) thinkEl.remove();
            this.appendMessage('ai', reply);
        }
    }

    getGlobalResponse(text, lang) {
        const cleanText = text.toLowerCase();
        const langDB = BRAIN[lang] || BRAIN.uz;
        let candidates = [];

        // 1. Specific Topic Search
        for (const topicKey in langDB) {
            if (topicKey === 'general') continue;
            const topic = langDB[topicKey];
            if (topic.patterns.some(p => cleanText.includes(p))) {
                candidates = candidates.concat(topic.responses);
            }
        }

        // 2. Return Topic Match
        if (candidates.length > 0) {
            return candidates[Math.floor(Math.random() * candidates.length)];
        }

        // 3. Language Specific General Fallback
        if (langDB.general && Math.random() > 0.5) {
            return langDB.general[Math.floor(Math.random() * langDB.general.length)];
        }

        // 4. Absolute Fallback
        return GLOBAL_FALLBACKS[Math.floor(Math.random() * GLOBAL_FALLBACKS.length)];
    }

    appendMessage(role, text, id = null) {
        if (!this.chatBox) return;

        const div = document.createElement('div');
        div.className = `message ${role}`;
        if (id) div.id = id;

        const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const avatar = role === 'ai' ? 'ai_avatar.jpg' : 'user.png';

        div.innerHTML = `
            <div class="message-avatar">
                <img src="${avatar}" alt="${role}">
            </div>
            <div class="message-content">
                <p>${text}</p>
                <span class="message-time">${time}</span>
            </div>
        `;

        this.chatBox.appendChild(div);
        this.chatBox.scrollTop = this.chatBox.scrollHeight;
    }
}

// Start
document.addEventListener('DOMContentLoaded', () => {
    window.alyaLink = new ChatAiEngine();

    // Initial Greeting
    setTimeout(() => {
        window.alyaLink.appendMessage('ai', "Men tayyorman. Savollaring bormi? (Aytmoqchi, bugun chiroyli ko'rinyapsan...)");
    }, 1500);
});