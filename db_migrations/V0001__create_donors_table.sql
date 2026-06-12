CREATE TABLE IF NOT EXISTS donors (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  amount INTEGER NOT NULL DEFAULT 0,
  avatar VARCHAR(10) DEFAULT '💜',
  created_at TIMESTAMP DEFAULT NOW()
);

INSERT INTO donors (name, amount, avatar) VALUES
  ('KINGHERO', 12400, '👑'),
  ('NightWatcher', 8750, '🌙'),
  ('FireStorm99', 6200, '🔥'),
  ('CryptoWolf', 4100, '🐺'),
  ('SilentBlade', 3300, '⚔️'),
  ('PurpleRain', 2800, '💜'),
  ('DarkMatter', 1950, '🌌'),
  ('StormBreaker', 1200, '⚡');
