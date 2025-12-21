// Admin Panel Logic for Alya AI
document.addEventListener('DOMContentLoaded', () => {
    // Auth Check
    const role = localStorage.getItem('alya_user_role');
    if (role !== 'owner' && role !== 'admin') {
        window.location.href = 'login.html';
        return;
    }

    const API_BASE = '';
    let lastMessageId = 0;

    // UI Elements
    const aiStatusToggle = document.getElementById('aiStatusToggle');
    const aiStatusLabel = document.getElementById('aiStatusLabel');
    const chatMessages = document.getElementById('adminChatMessages');
    const chatInput = document.getElementById('adminChatInput');
    const chatSendBtn = document.getElementById('adminChatSend');
    const knowledgeEditor = document.getElementById('knowledgeEditor');
    const saveKnowledgeBtn = document.getElementById('saveKnowledgeBtn');

    // Console & Presence Elements
    const adminPresenceToggle = document.getElementById('adminPresenceToggle');
    const adminPresenceText = document.getElementById('adminPresenceText');
    const systemConsole = document.getElementById('systemConsole');
    const clearConsoleBtn = document.getElementById('clearConsoleBtn');

    // New Knowledge UI Elements
    const addKnowledgeBtn = document.getElementById('addKnowledgeBtn');
    const kbKeywords = document.getElementById('kbKeywords');
    const kbResponse = document.getElementById('kbResponse');
    const knowledgeListBody = document.getElementById('knowledgeListBody');
    const toggleAdvancedKB = document.getElementById('toggleAdvancedKB');
    const advancedKnowledgeArea = document.getElementById('advancedKnowledgeArea');
    const simpleKnowledgeForm = document.getElementById('simpleKnowledgeForm');
    const knowledgeListArea = document.getElementById('knowledgeListArea');

    const defaultConfig = {
        isOnline: false,
        isAdminOnline: false,
        geminiApiKey: '',
        siteName: 'Alya_Kujou.Uz AI',
        adminEmail: 'aniedituz@gmail.com',
        googleClientId: '',
        googleClientSecret: '',
        maintenance: false,
        knowledge: [],
        fallbacks: []
    };

    let config = { ...defaultConfig };

    // Navigation Logic
    const navItems = document.querySelectorAll('.nav-links-admin a');
    const sections = document.querySelectorAll('.page-section');

    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            const sectionId = item.getAttribute('data-section');
            if (!sectionId) return;
            e.preventDefault();

            navItems.forEach(nav => nav.classList.remove('active'));
            item.classList.add('active');

            sections.forEach(sec => {
                sec.style.display = 'none';
                if (sec.id === `section-${sectionId}`) {
                    sec.style.display = 'block';
                    if (sectionId === 'users') renderUserList();
                    if (sectionId === 'posts') renderPostList();
                }
            });
        });
    });

    // Logout Logic
    const logoutBtn = document.getElementById('logoutBtnAdmin');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            if (confirm('Tizimdan chiqmoqchimisiz?')) {
                localStorage.removeItem('alya_user_role');
                localStorage.removeItem('alya_user_email');
                localStorage.removeItem('alya_user_name');
                localStorage.removeItem('alya_user_photo');
                localStorage.removeItem('alya_auth_token');
                window.location.href = 'index.html';
            }
        });
    }

    async function renderUserList() {
        const userTableBody = document.getElementById('userListTableBody');
        if (!userTableBody) return;

        try {
            const token = localStorage.getItem('alya_auth_token');
            const response = await fetch('/api/users', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const users = await response.json();

            userTableBody.innerHTML = '';
            users.forEach(user => {
                const row = document.createElement('tr');
                const initial = user.name ? user.name.charAt(0).toUpperCase() : '?';
                const avatarContent = user.photo ?
                    `<img src="${user.photo}" style="width:30px; height:30px; border-radius:50%; border:1px solid #00d4ff;">` :
                    `<div class="user-avatar" style="background:${user.role === 'owner' || user.role === 'admin' ? '#ffd700' : '#888'}; color:#000; width:30px; height:30px; font-size:12px;">${initial}</div>`;

                row.innerHTML = `
                    <td>
                        <div class="user-cell">
                            ${avatarContent}
                            <span>${user.name || 'No Name'}</span>
                        </div>
                    </td>
                    <td style="color: #00d4ff; font-family: monospace;">${user.email}</td>
                    <td><span style="color: ${user.role === 'owner' || user.role === 'admin' ? '#ffd700' : '#ccc'}">${user.role.toUpperCase()}</span></td>
                    <td><span class="status online">Active</span></td>
                    <td><i class="fa-solid fa-ellipsis-vertical" style="color:#666; cursor:pointer;"></i></td>
                `;
                userTableBody.appendChild(row);
            });
        } catch (error) {
            console.error("Foydalanuvchilarni yuklashda xato:", error);
            logToConsole("Foydalanuvchilarni yuklashda xato!", "error");
        }
    }

    function loadAll() {
        // Load from localStorage instead of API
        const savedConfig = localStorage.getItem('alya_admin_config');
        if (savedConfig) {
            config = { ...defaultConfig, ...JSON.parse(savedConfig) };
        }

        const savedKnowledge = localStorage.getItem('alya_admin_knowledge');
        if (savedKnowledge) {
            config.knowledge = JSON.parse(savedKnowledge);
        }

        const savedMessages = localStorage.getItem('alya_admin_messages');
        if (savedMessages) {
            const messages = JSON.parse(savedMessages);
            chatMessages.innerHTML = '';
            messages.forEach(msg => {
                addMessageToChat(msg.text, msg.sender === 'user' ? 'user' : 'admin');
                if (msg.id > lastMessageId) lastMessageId = msg.id;
            });
        }

        syncUI();
    }

    function syncUI() {
        aiStatusToggle.checked = !!config.isOnline;
        updateStatusLabel(config.isOnline);
        adminPresenceToggle.checked = !!config.isAdminOnline;
        updatePresenceUI(config.isAdminOnline);
        knowledgeEditor.value = JSON.stringify(config.knowledge, null, 2);
        renderKnowledgeList();

        const siteNameInput = document.getElementById('setting-site-name');
        const adminEmailInput = document.getElementById('setting-admin-email');
        const geminiApiKeyInput = document.getElementById('setting-gemini-api-key');
        const maintenanceInput = document.getElementById('setting-maintenance');

        if (siteNameInput) siteNameInput.value = config.siteName || '';
        if (adminEmailInput) adminEmailInput.value = config.adminEmail || '';
        if (geminiApiKeyInput) geminiApiKeyInput.value = config.geminiApiKey || '';
        if (maintenanceInput) maintenanceInput.checked = !!config.maintenance;
    }

    function init() {
        loadAll();

        // Knowledge Management Logic
        if (addKnowledgeBtn) {
            addKnowledgeBtn.addEventListener('click', () => {
                const keywords = kbKeywords.value.split(',').map(s => s.trim()).filter(s => s);
                const response = kbResponse.value.trim();

                if (keywords.length === 0 || !response) {
                    alert('Iltimos, kalit so\'zlar va javobni to\'ldiring!');
                    return;
                }

                // Save to localStorage instead of API
                const newEntry = {
                    id: Date.now(),
                    patterns: keywords,
                    response: response,
                    isLearned: false
                };

                // Add to knowledge base
                config.knowledge.push(newEntry);

                // Save to localStorage
                localStorage.setItem('alya_admin_knowledge', JSON.stringify(config.knowledge));

                kbKeywords.value = '';
                kbResponse.value = '';
                logToConsole(`New Knowledge added: ${keywords.join(', ')}`);
                loadAll(); // Refresh
            });
        }

        if (toggleAdvancedKB) {
            toggleAdvancedKB.addEventListener('click', () => {
                const isAdvanced = advancedKnowledgeArea.style.display === 'flex';
                if (isAdvanced) {
                    advancedKnowledgeArea.style.display = 'none';
                    simpleKnowledgeForm.style.display = 'block';
                    knowledgeListArea.style.display = 'block';
                    toggleAdvancedKB.textContent = 'Advanced JSON';
                } else {
                    advancedKnowledgeArea.style.display = 'flex';
                    simpleKnowledgeForm.style.display = 'none';
                    knowledgeListArea.style.display = 'none';
                    toggleAdvancedKB.textContent = 'Simple Mode';
                }
            });
        }

        aiStatusToggle.addEventListener('change', async (e) => {
            config.isOnline = e.target.checked;
            updateStatusLabel(config.isOnline);
            await saveConfig('isOnline', config.isOnline);
            logToConsole(`AI Status changed to: ${config.isOnline ? 'Online' : 'Offline'}`);
        });

        adminPresenceToggle.addEventListener('change', async (e) => {
            config.isAdminOnline = e.target.checked;
            updatePresenceUI(config.isAdminOnline);
            await saveConfig('isAdminOnline', config.isAdminOnline);
            logToConsole(`Admin Presence changed to: ${config.isAdminOnline ? 'Online' : 'Offline'}`);
        });

        clearConsoleBtn.addEventListener('click', () => {
            systemConsole.innerHTML = '<div style="color: #666;">[SYSTEM] Console cleared.</div>';
        });

        saveKnowledgeBtn.addEventListener('click', () => {
            try {
                const newKnowledge = JSON.parse(knowledgeEditor.value);
                // Save to localStorage instead of API
                config.knowledge = newKnowledge;
                localStorage.setItem('alya_admin_knowledge', JSON.stringify(newKnowledge));
                alert('Bilimlar bazasi saqlandi!');
                loadAll(); // Refresh UI
            } catch (err) {
                alert('Xatolik: ' + err.message);
            }
        });

        const saveSettingsBtn = document.getElementById('save-settings-btn');
        if (saveSettingsBtn) {
            saveSettingsBtn.addEventListener('click', async () => {
                const siteName = document.getElementById('setting-site-name').value;
                const adminEmail = document.getElementById('setting-admin-email').value;
                const geminiApiKey = document.getElementById('setting-gemini-api-key').value;
                const maintenance = document.getElementById('setting-maintenance').checked;

                await Promise.all([
                    saveConfig('siteName', siteName),
                    saveConfig('adminEmail', adminEmail),
                    saveConfig('geminiApiKey', geminiApiKey),
                    saveConfig('maintenance', maintenance)
                ]);

                alert('Sozlamalar saqlandi!');
            });
        }

        // Posts Logic
        const addPostBtn = document.getElementById('addPostBtn');
        if (addPostBtn) {
            addPostBtn.addEventListener('click', async () => {
                const titleInput = document.getElementById('postTitle');
                const contentInput = document.getElementById('postContent');
                const title = titleInput.value.trim();
                const content = contentInput.value.trim();

                if (!title || !content) {
                    alert('Iltimos, sarlavha va matnni to\'ldiring!');
                    return;
                }

                try {
                    const token = localStorage.getItem('alya_auth_token');
                    const response = await fetch('/api/posts', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        },
                        body: JSON.stringify({
                            title,
                            content,
                            author: localStorage.getItem('alya_user_name') || 'Admin'
                        })
                    });

                    if (response.ok) {
                        titleInput.value = '';
                        contentInput.value = '';
                        // logToConsole is a function in admin.js
                        if (typeof logToConsole === 'function') logToConsole(`New Post published: ${title}`);
                        renderPostList();
                        alert('Post muvaffaqiyatli chop etildi!');
                    } else {
                        const err = await response.json();
                        alert(`Xatolik: ${err.error}`);
                    }
                } catch (error) {
                    console.error("Post creation error:", error);
                }
            });
        }

        // Database Explorer Logic
        const executeBtn = document.getElementById('executeBtn');
        const clearSqlBtn = document.getElementById('clearSqlBtn');
        const sqlQueryInput = document.getElementById('sqlQueryInput');
        const sqlResultsContainer = document.getElementById('sqlResultsContainer');
        const queryStatus = document.getElementById('queryStatus');

        if (executeBtn) {
            executeBtn.addEventListener('click', async () => {
                const query = sqlQueryInput.value.trim();
                if (!query) return;

                executeBtn.disabled = true;
                executeBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Executing...';
                sqlResultsContainer.innerHTML = '<div style="text-align: center; color: #555; padding: 40px;">So\'rov yuborilmoqda...</div>';
                queryStatus.textContent = '';

                try {
                    const token = localStorage.getItem('alya_auth_token');
                    const response = await fetch('/api/admin/query', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        },
                        body: JSON.stringify({ query })
                    });

                    const data = await response.json();

                    if (response.ok) {
                        queryStatus.textContent = `${data.command} muvaffaqiyatli! (${data.rowCount} qator)`;
                        renderSqlResult(data);
                    } else {
                        sqlResultsContainer.innerHTML = `<div style="padding: 20px; color: #ff3333; background: rgba(255,51,51,0.1); border-radius: 8px;"><strong>Xato:</strong> ${data.error}</div>`;
                    }
                } catch (error) {
                    console.error("SQL Execution error:", error);
                    sqlResultsContainer.innerHTML = `<div style="padding: 20px; color: #ff3333; background: rgba(255,51,51,0.1); border-radius: 8px;"><strong>Server xatosi:</strong> ${error.message}</div>`;
                } finally {
                    executeBtn.disabled = false;
                    executeBtn.innerHTML = '<i class="fa-solid fa-bolt"></i> Execute Query';
                }
            });
        }

        if (clearSqlBtn) {
            clearSqlBtn.addEventListener('click', () => {
                sqlQueryInput.value = '';
                sqlResultsContainer.innerHTML = '<div style="text-align: center; color: #555; padding: 40px;">Hali hech qanday so\'rov bajarilmadi.</div>';
                queryStatus.textContent = '';
            });
        }

        function renderSqlResult(data) {
            if (!data.rows || data.rows.length === 0) {
                if (data.command === 'SELECT') {
                    sqlResultsContainer.innerHTML = '<div style="text-align: center; color: #666; padding: 40px; font-style: italic;">No rows returned.</div>';
                } else {
                    sqlResultsContainer.innerHTML = `
                        <div style="text-align: center; padding: 40px;">
                            <div style="font-size: 2rem; color: #00ff88; margin-bottom: 10px;"><i class="fa-solid fa-circle-check"></i></div>
                            <div style="color: #00ff88; font-weight: bold; text-transform: uppercase; letter-spacing: 1px;">${data.command} Successful</div>
                            <div style="color: #888; font-size: 13px; margin-top: 5px;">${data.rowCount} rows affected</div>
                        </div>`;
                }
                return;
            }

            let html = '<table><thead><tr>';
            data.fields.forEach(field => {
                html += `<th>${field}</th>`;
            });
            html += '</tr></thead><tbody>';

            data.rows.forEach(row => {
                html += '<tr>';
                data.fields.forEach(field => {
                    const val = row[field];
                    let displayVal = val;
                    if (val === null) {
                        displayVal = '<span style="color: #555; font-style: italic;">NULL</span>';
                    } else if (typeof val === 'object') {
                        displayVal = `<span title="${JSON.stringify(val).replace(/"/g, '&quot;')}">{Object}</span>`;
                    }
                    html += `<td>${displayVal}</td>`;
                });
                html += '</tr>';
            });
            html += '</tbody></table>';

            sqlResultsContainer.innerHTML = html;
        }

        chatSendBtn.addEventListener('click', sendMessage);
        chatInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') sendMessage(); });

        setInterval(pollMessages, 3000);
        logToConsole('Alya Admin Panel SQL Integration Active.');
    }

    function pollMessages() {
        // Offline functionality - no polling needed
        return;
    }

    function saveConfig(key, value) {
        try {
            // Save to localStorage instead of API
            config[key] = value;
            localStorage.setItem('alya_admin_config', JSON.stringify(config));
        } catch (e) { }
    }

    function sendMessage() {
        const text = chatInput.value.trim();
        if (!text) return;

        addMessageToChat(text, 'admin');
        logToConsole(`Admin reply sent: ${text}`, 'admin');
        chatInput.value = '';

        // Save to localStorage instead of API
        const message = {
            id: Date.now(),
            sender: 'admin',
            text: text,
            timestamp: new Date().toISOString()
        };

        // Save message to localStorage
        let messages = [];
        const savedMessages = localStorage.getItem('alya_admin_messages');
        if (savedMessages) {
            messages = JSON.parse(savedMessages);
        }
        messages.push(message);
        localStorage.setItem('alya_admin_messages', JSON.stringify(messages));

        lastMessageId = message.id;
    }

    function addMessageToChat(text, sender) {
        const div = document.createElement('div');
        div.className = `msg-row ${sender}`;
        div.innerHTML = `
            <div class="msg-bubble ${sender}">
                ${text}
            </div>
            <span class="msg-time">${new Date().toLocaleTimeString()}</span>
        `;
        chatMessages.appendChild(div);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function updatePresenceUI(isOnline) {
        adminPresenceText.textContent = isOnline ? 'Online' : 'Offline';
        adminPresenceText.style.color = isOnline ? '#00ff88' : '#ff3333';
    }

    function renderKnowledgeList() {
        if (!knowledgeListBody) return;
        knowledgeListBody.innerHTML = '';

        if (config.knowledge.length === 0) {
            knowledgeListBody.innerHTML = '<div style="text-align: center; color: #555; padding: 40px;">Bilimlar bazasi bo\'sh.</div>';
            return;
        }

        config.knowledge.forEach(item => {
            const row = document.createElement('div');
            row.className = 'kb-row';
            row.style.display = 'grid';
            row.style.gridTemplateColumns = '1.5fr 3fr 80px';
            row.style.padding = '12px 15px';
            row.style.borderBottom = '1px solid rgba(255,255,255,0.05)';
            row.style.fontSize = '13px';
            row.style.alignItems = 'center';

            row.innerHTML = `
                <div style="color: var(--primary); font-weight: 500;">${item.patterns.join(', ')}</div>
                <div style="color: #ccc; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; padding-right: 15px;">${item.response}</div>
                <div style="text-align: right;">
                    <button class="delete-kb-btn" data-id="${item.id}" style="background: rgba(255,51,51,0.1); color: #ff3333; border: 1px solid rgba(255,51,51,0.2); padding: 5px 10px; border-radius: 5px; cursor: pointer; font-size: 11px;">
                        <i class="fa-solid fa-trash-can"></i>
                    </button>
                </div>
            `;
            knowledgeListBody.appendChild(row);
        });

        // Add Delete Event Listeners
        document.querySelectorAll('.delete-kb-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = parseInt(btn.getAttribute('data-id'));
                if (confirm('Ushbu bilimni bazadan o\'chirishga isonchingiz komilmi?')) {
                    // Delete from localStorage instead of API
                    let knowledge = [];
                    const savedKnowledge = localStorage.getItem('alya_admin_knowledge');
                    if (savedKnowledge) {
                        knowledge = JSON.parse(savedKnowledge);
                    }

                    // Filter out the knowledge entry with the given ID
                    knowledge = knowledge.filter(item => item.id !== id);

                    // Save updated knowledge back to localStorage
                    localStorage.setItem('alya_admin_knowledge', JSON.stringify(knowledge));

                    logToConsole(`Knowledge ID ${id} deleted.`);
                    loadAll();
                }
            });
        });
    }

    async function renderPostList() {
        const postsList = document.getElementById('postsList');
        if (!postsList) return;

        try {
            const token = localStorage.getItem('alya_auth_token');
            const response = await fetch('/api/posts'); // GET /api/posts is not protected in my server.js logic currently, but good to be consistent if it were. Actually I didn't protect GET /api/posts, only POST/DELETE.
            const posts = await response.json();

            postsList.innerHTML = '';

            if (posts.length === 0) {
                postsList.innerHTML = '<div style="text-align: center; color: #555; padding: 40px;">Hozircha postlar yo\'q.</div>';
                return;
            }

            posts.forEach(post => {
                const postItem = document.createElement('div');
                postItem.style.background = 'rgba(255, 255, 255, 0.03)';
                postItem.style.border = '1px solid rgba(0, 212, 255, 0.1)';
                postItem.style.padding = '20px';
                postItem.style.borderRadius = '12px';
                postItem.style.position = 'relative';

                const date = new Date(post.created_at).toLocaleDateString();

                postItem.innerHTML = `
                    <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 10px;">
                        <h4 style="color: var(--primary); font-size: 18px;">${post.title}</h4>
                        <button class="delete-post-btn" data-id="${post.id}" style="background: rgba(255,51,51,0.1); color: #ff3333; border: 1px solid rgba(255,51,51,0.2); padding: 5px 10px; border-radius: 5px; cursor: pointer; font-size: 11px;">
                            <i class="fa-solid fa-trash-can"></i>
                        </button>
                    </div>
                    <p style="color: #ccc; font-size: 14px; line-height: 1.6; margin-bottom: 15px;">${post.content}</p>
                    <div style="font-size: 12px; color: #666; display: flex; gap: 15px;">
                        <span><i class="fa-solid fa-user"></i> ${post.author}</span>
                        <span><i class="fa-solid fa-calendar"></i> ${date}</span>
                    </div>
                `;
                postsList.appendChild(postItem);
            });

            // Delete logic
            document.querySelectorAll('.delete-post-btn').forEach(btn => {
                btn.addEventListener('click', async () => {
                    const id = btn.getAttribute('data-id');
                    const token = localStorage.getItem('alya_auth_token');
                    if (confirm('Ushbu postni o\'chirishga isonchingiz komilmi?')) {
                        try {
                            const delResponse = await fetch(`/api/posts/${id}`, {
                                method: 'DELETE',
                                headers: { 'Authorization': `Bearer ${token}` }
                            });
                            if (delResponse.ok) {
                                logToConsole(`Post ID ${id} deleted.`);
                                renderPostList();
                            }
                        } catch (err) {
                            console.error("Post delete error:", err);
                        }
                    }
                });
            });

        } catch (e) {
            console.error("Failed to load posts", e);
            logToConsole("Postlarni yuklashda xato!", "error");
        }
    }

    function logToConsole(message, type = 'system') {
        const div = document.createElement('div');
        const time = new Date().toLocaleTimeString();
        let color = '#00d4ff';
        if (type === 'user') color = '#ffbb00';
        if (type === 'admin') color = '#00ff88';

        div.style.marginBottom = '5px';
        div.innerHTML = `<span style="color: #555;">[${time}]</span> <span style="color: ${color}">[${type.toUpperCase()}]</span> ${message}`;
        systemConsole.appendChild(div);
        systemConsole.scrollTop = systemConsole.scrollHeight;
    }

    function updateStatusLabel(isOnline) {
        aiStatusLabel.textContent = isOnline ? 'Online (Auto-Reply ON)' : 'Offline (Manual Only)';
        aiStatusLabel.style.color = isOnline ? '#00ff88' : '#ff3333';
    }

    init();

    // Mobile Toggle
    const mobileToggle = document.getElementById('adminMobileToggle');
    const adminSidebar = document.getElementById('adminSidebar');
    if (mobileToggle && adminSidebar) {
        mobileToggle.addEventListener('click', () => {
            adminSidebar.classList.toggle('active');
            const icon = mobileToggle.querySelector('i');
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-xmark');
        });
    }
});

