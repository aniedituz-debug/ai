CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =========================
-- USERS
-- =========================
CREATE TABLE users (
    id TEXT PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role TEXT DEFAULT 'user', -- user | admin | owner
    created_at TIMESTAMP DEFAULT NOW()
);

-- =========================
-- PLANS
-- =========================
CREATE TABLE plans (
    id SERIAL PRIMARY KEY,
    name TEXT,
    price_month FLOAT,
    message_limit INT,
    memory_limit INT,
    is_active BOOLEAN DEFAULT true
);

INSERT INTO plans (name, price_month, message_limit, memory_limit) VALUES
('Trial', 0, 1000, 300),
('Basic', 2, 10000, 2000),
('Pro', 5, 100000, 20000);

-- =========================
-- SUBSCRIPTIONS
-- =========================
CREATE TABLE subscriptions (
    user_id TEXT PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    plan_id INT REFERENCES plans(id),
    start_date DATE DEFAULT CURRENT_DATE,
    end_date DATE,
    is_active BOOLEAN DEFAULT true
);

-- =========================
-- USAGE STATS
-- =========================
CREATE TABLE usage_stats (
    user_id TEXT PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    messages_used INT DEFAULT 0,
    last_reset DATE DEFAULT CURRENT_DATE
);

-- =========================
-- AI MEMORY
-- =========================
CREATE TABLE memory (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id TEXT REFERENCES users(id) ON DELETE CASCADE,
    input TEXT,
    output TEXT,
    score FLOAT DEFAULT 1,
    created_at TIMESTAMP DEFAULT NOW()
);

-- =========================
-- LOGS
-- =========================
CREATE TABLE logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id TEXT,
    message TEXT,
    response TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

-- =========================
-- API KEYS
-- =========================
CREATE TABLE api_keys (
    key TEXT PRIMARY KEY,
    user_id TEXT REFERENCES users(id),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT NOW()
);

-- =========================
-- PAYMENTS
-- =========================
CREATE TABLE payments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id TEXT REFERENCES users(id) ON DELETE CASCADE,
    plan_id INT REFERENCES plans(id),
    amount FLOAT,
    currency TEXT DEFAULT 'USD',
    status TEXT DEFAULT 'pending', -- pending | success | failed
    provider TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

-- =========================
-- OWNER (DOIM UNLIMITED)
-- =========================
INSERT INTO users (id, email, password, role)
VALUES (
    'OWNER_ID',
    'owner@alya.ai',
    '54eb64835dh563352',
    'owner'
);

INSERT INTO subscriptions (user_id, plan_id, end_date)
VALUES ('OWNER_ID', 3, '2099-01-01');

INSERT INTO usage_stats (user_id)
VALUES ('OWNER_ID');
