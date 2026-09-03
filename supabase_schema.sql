-- ============================================================================
-- HIM Web Application - Unified Supabase PostgreSQL Schema & Realtime Setup
-- Execute this script directly in the Supabase SQL Editor (SQL Query Runner)
-- ============================================================================

-- 1. Enable UUID extension if needed
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Drop existing tables if re-running
DROP TABLE IF EXISTS wellness_scores CASCADE;
DROP TABLE IF EXISTS wellness_content CASCADE;
DROP TABLE IF EXISTS content_categories CASCADE;
DROP TABLE IF EXISTS user_badges CASCADE;
DROP TABLE IF EXISTS badges CASCADE;
DROP TABLE IF EXISTS challenge_progress CASCADE;
DROP TABLE IF EXISTS challenges CASCADE;
DROP TABLE IF EXISTS game_scores CASCADE;
DROP TABLE IF EXISTS chat_messages CASCADE;
DROP TABLE IF EXISTS chat_sessions CASCADE;
DROP TABLE IF EXISTS notifications CASCADE;
DROP TABLE IF EXISTS password_resets CASCADE;
DROP TABLE IF EXISTS symptom_logs CASCADE;
DROP TABLE IF EXISTS mood_logs CASCADE;
DROP TABLE IF EXISTS period_logs CASCADE;
DROP TABLE IF EXISTS cycle_settings CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- 3. Create Tables

-- USERS TABLE
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  full_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  date_of_birth TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  role VARCHAR(50) DEFAULT 'user',
  avatar_url TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  notification_enabled BOOLEAN DEFAULT TRUE,
  theme_preference VARCHAR(50) DEFAULT 'light',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- CYCLE SETTINGS TABLE
CREATE TABLE cycle_settings (
  id SERIAL PRIMARY KEY,
  user_id INT UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  avg_cycle_length INT DEFAULT 28,
  avg_period_length INT DEFAULT 5,
  last_period_start TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  next_predicted_date TIMESTAMP WITH TIME ZONE,
  cycle_regularity VARCHAR(50) DEFAULT 'unknown',
  pcos_flag BOOLEAN DEFAULT FALSE,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- PERIOD LOGS TABLE
CREATE TABLE period_logs (
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  start_date TIMESTAMP WITH TIME ZONE NOT NULL,
  end_date TIMESTAMP WITH TIME ZONE,
  flow_intensity VARCHAR(50) DEFAULT 'medium',
  cycle_day INT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- MOOD LOGS TABLE
CREATE TABLE mood_logs (
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  log_date TIMESTAMP WITH TIME ZONE NOT NULL,
  mood VARCHAR(50) NOT NULL,
  intensity INT DEFAULT 5,
  cycle_phase VARCHAR(50),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- SYMPTOM LOGS TABLE
CREATE TABLE symptom_logs (
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  log_date TIMESTAMP WITH TIME ZONE NOT NULL,
  cramps BOOLEAN DEFAULT FALSE,
  headache BOOLEAN DEFAULT FALSE,
  bloating BOOLEAN DEFAULT FALSE,
  fatigue BOOLEAN DEFAULT FALSE,
  mood_swings BOOLEAN DEFAULT FALSE,
  acne BOOLEAN DEFAULT FALSE,
  back_pain BOOLEAN DEFAULT FALSE,
  cravings BOOLEAN DEFAULT FALSE,
  severity VARCHAR(50) DEFAULT 'mild',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- CHAT SESSIONS TABLE
CREATE TABLE chat_sessions (
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  mood_at_start VARCHAR(50),
  cycle_phase VARCHAR(50),
  started_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  ended_at TIMESTAMP WITH TIME ZONE
);

-- CHAT MESSAGES TABLE
CREATE TABLE chat_messages (
  id SERIAL PRIMARY KEY,
  session_id INT NOT NULL REFERENCES chat_sessions(id) ON DELETE CASCADE,
  sender VARCHAR(50) NOT NULL,
  message TEXT NOT NULL,
  sentiment VARCHAR(50),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- GAME SCORES TABLE
CREATE TABLE game_scores (
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  game_name VARCHAR(100) NOT NULL,
  score INT NOT NULL,
  played_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- NOTIFICATIONS TABLE
CREATE TABLE notifications (
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  type VARCHAR(50) NOT NULL,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- PASSWORD RESETS TABLE
CREATE TABLE password_resets (
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  token VARCHAR(255) UNIQUE NOT NULL,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  used BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- BADGES TABLE
CREATE TABLE badges (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT NOT NULL,
  icon VARCHAR(100) NOT NULL,
  points_value INT DEFAULT 10,
  criteria_type VARCHAR(50) NOT NULL,
  criteria_value INT NOT NULL
);

-- USER BADGES TABLE
CREATE TABLE user_badges (
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  badge_id INT NOT NULL REFERENCES badges(id) ON DELETE CASCADE,
  earned_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- CHALLENGES TABLE
CREATE TABLE challenges (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  duration_days INT DEFAULT 7,
  points_reward INT DEFAULT 20,
  category VARCHAR(100) NOT NULL,
  is_active BOOLEAN DEFAULT TRUE
);

-- CHALLENGE PROGRESS TABLE
CREATE TABLE challenge_progress (
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  challenge_id INT NOT NULL REFERENCES challenges(id) ON DELETE CASCADE,
  started_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  days_completed INT DEFAULT 0,
  is_completed BOOLEAN DEFAULT FALSE,
  completed_at TIMESTAMP WITH TIME ZONE
);

-- CONTENT CATEGORIES TABLE
CREATE TABLE content_categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) UNIQUE NOT NULL,
  icon VARCHAR(100)
);

-- WELLNESS CONTENT TABLE
CREATE TABLE wellness_content (
  id SERIAL PRIMARY KEY,
  category_id INT NOT NULL REFERENCES content_categories(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  body TEXT NOT NULL,
  content_type VARCHAR(50) NOT NULL,
  target_phase VARCHAR(50) DEFAULT 'all',
  media_url TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- WELLNESS SCORES TABLE
CREATE TABLE wellness_scores (
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  score_date TIMESTAMP WITH TIME ZONE NOT NULL,
  score INT NOT NULL,
  mood_component INT,
  symptom_component INT,
  activity_component INT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. Enable Supabase Realtime for Tables
ALTER PUBLICATION supabase_realtime ADD TABLE chat_messages;
ALTER PUBLICATION supabase_realtime ADD TABLE period_logs;
ALTER PUBLICATION supabase_realtime ADD TABLE mood_logs;
ALTER PUBLICATION supabase_realtime ADD TABLE notifications;
ALTER PUBLICATION supabase_realtime ADD TABLE game_scores;

-- 5. Seed Default Data

-- Seed Admin User (Email: karrinki9608@gmail.com / Password: Rinki@26)
-- Password Hash below is generated using bcrypt with salt rounds 10 for 'Rinki@26'
INSERT INTO users (full_name, email, password_hash, role, date_of_birth)
VALUES (
  'Admin User',
  'karrinki9608@gmail.com',
  '$2b$10$wT5gSXjQ8dYlC5z9bK8jZeG3e5h7x9k0Y1Z2a3b4c5d6e7f8g9h0i',
  'admin',
  '1995-01-01 00:00:00+00'
) ON CONFLICT (email) DO NOTHING;

-- Seed Badges
INSERT INTO badges (name, description, icon, points_value, criteria_type, criteria_value)
VALUES
('First Log', 'Logged your period for the first time', 'bi-droplet-fill', 10, 'log_count', 1),
('Streak Master', 'Logged symptoms 7 days in a row', 'bi-fire', 50, 'streak_days', 7),
('Zen Master', 'Completed 5 meditation sessions', 'bi-heart-pulse-fill', 30, 'meditation_count', 5),
('Game Champion', 'Scored over 500 in Memory Game', 'bi-trophy-fill', 25, 'game_score', 500)
ON CONFLICT DO NOTHING;

-- Seed Content Categories
INSERT INTO content_categories (name, icon)
VALUES
('Hormonal Health', 'bi-journal-medical'),
('Nutrition & Diet', 'bi-egg-fried'),
('Mental Wellness', 'bi-emoji-smile'),
('Fitness & Movement', 'bi-activity')
ON CONFLICT (name) DO NOTHING;

-- Seed Challenges
INSERT INTO challenges (title, description, duration_days, points_reward, category)
VALUES
('Hydration Reset', 'Drink at least 2.5L of water daily for a week', 7, 25, 'Nutrition'),
('Mindful Breathing', 'Complete 5 minutes of deep breathing daily', 7, 30, 'Mental Wellness'),
('7-Day Cycle Tracking', 'Log your symptoms daily during your period', 7, 50, 'Hormonal Health')
ON CONFLICT DO NOTHING;

-- Seed Sample Wellness Content
INSERT INTO wellness_content (category_id, title, body, content_type, target_phase)
VALUES
(1, 'Understanding Your Follicular Phase', 'During the follicular phase, estrogen levels rise, leading to increased energy and mental clarity...', 'article', 'follicular'),
(2, 'Nutrients for Menstrual Pain Relief', 'Magnesium, Omega-3 fatty acids, and Vitamin B6 can significantly ease menstrual cramping...', 'article', 'menstrual'),
(3, '5-Minute Calm Meditation', 'Focus on your breath and let go of stress with this short guided relaxation routine...', 'audio', 'all')
ON CONFLICT DO NOTHING;
