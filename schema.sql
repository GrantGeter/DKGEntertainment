-- DKG Entertainment — Cloudflare D1 Schema

CREATE TABLE IF NOT EXISTS subscribers (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT UNIQUE NOT NULL,
  name TEXT DEFAULT '',
  unsubscribe_token TEXT UNIQUE NOT NULL,
  subscribed_at TEXT DEFAULT (datetime('now')),
  is_active INTEGER DEFAULT 1
);

CREATE TABLE IF NOT EXISTS events (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL DEFAULT '',
  artists TEXT NOT NULL DEFAULT '[]',
  date TEXT NOT NULL DEFAULT '',
  venue TEXT NOT NULL DEFAULT '',
  location TEXT NOT NULL DEFAULT '',
  description TEXT NOT NULL DEFAULT '',
  type TEXT NOT NULL DEFAULT 'Event',
  status TEXT NOT NULL DEFAULT 'upcoming',
  image TEXT NOT NULL DEFAULT '',
  highlight TEXT,
  ticketUrl TEXT NOT NULL DEFAULT ''
);

CREATE TABLE IF NOT EXISTS news (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL DEFAULT '',
  excerpt TEXT NOT NULL DEFAULT '',
  content TEXT NOT NULL DEFAULT '',
  date TEXT NOT NULL DEFAULT '',
  category TEXT NOT NULL DEFAULT 'News',
  image TEXT NOT NULL DEFAULT '',
  author TEXT NOT NULL DEFAULT 'DKG Entertainment'
);

-- Seed events
INSERT OR IGNORE INTO events (id, title, artists, date, venue, location, description, type, status, image, highlight, ticketUrl) VALUES
(1, 'Baby Bash — Live', '["Baby Bash"]', 'Dates TBA', 'Multiple Venues', 'Southwest USA & Beyond', 'Baby Bash hits the road with tour dates coming to cities across the Southwest and beyond. More details dropping soon.', 'Tour', 'upcoming', '/Baby Bash Photos/IMG_8161.jpeg', NULL, ''),
(2, 'UNITED', '["Scarface","Slim Thug","Z-Ro","Lil Keke","Baby Bash"]', '2025', 'TBA', 'TBA', 'DKG Entertainment''s most ambitious event yet. UNITED brings together Scarface, Slim Thug, Z-Ro, Lil Keke, and Baby Bash under one roof — an unprecedented gathering of Southern rap royalty.', 'Festival', 'upcoming', '/Slim Thug Photos/IMG_3219.JPG', 'Multi-City Event — Details Coming Soon', ''),
(3, 'Oil City Tattoo Convention', '["Slim Thug"]', 'June 28, 2025', 'Oil City Tattoo Convention', 'TBA', 'Slim Thug performs live at the Oil City Tattoo Convention. Come out early for the meet and greet.', 'Festival', 'upcoming', '/Slim Thug Photos/IMG_0774.JPG', '4PM Meet & Greet', '');

-- Seed news
INSERT OR IGNORE INTO news (id, slug, title, excerpt, content, date, category, image, author) VALUES
(1, 'baby-bash-tour-announced', 'Baby Bash Announces New Tour Dates for 2025', 'Platinum-selling artist Baby Bash is hitting the road in 2025, bringing his signature West Coast sound to cities across the country.', 'DKG Entertainment is proud to announce Baby Bash will be hitting the road in 2025 with a string of live dates. The platinum-selling recording artist — known worldwide for hits like "Suga Suga" and "Cyclone" — brings his signature energy to stages across the Southwest and beyond. Dates and tickets to be announced soon.', 'March 30, 2025', 'Tours', '/Baby Bash Photos/IMG_8161.jpeg', 'DKG Entertainment'),
(2, 'slim-thug-joins-dkg', 'Slim Thug Joins DKG Entertainment for Upcoming Shows', 'Houston rap legend Slim Thug partners with DKG Entertainment for a series of upcoming performances including the Oil City Tattoo Convention on June 28.', 'DKG Entertainment welcomes Houston rap legend Slim Thug to the roster for a series of upcoming shows. The Boss Hogg Outlawz founder brings his commanding presence and anthemic catalog to the DKG family. First up: the Oil City Tattoo Convention on June 28, 2025, with a 4PM Meet & Greet for fans.', 'June 2025', 'Artist News', '/Slim Thug Photos/IMG_3219.JPG', 'DKG Entertainment'),
(3, 'united-event-announced', 'UNITED: DKG''s Biggest Multi-Artist Event Takes Shape', 'Scarface, Slim Thug, Z-Ro, Lil Keke, and Baby Bash set to converge for UNITED — an unprecedented gathering of Southern rap royalty.', 'DKG Entertainment''s most ambitious event yet is taking shape. UNITED will bring together Scarface, Slim Thug, Z-Ro, Lil Keke, and Baby Bash under one roof for a night that celebrates hip-hop''s most enduring voices. This is more than a concert — it''s a statement about the lasting power of authentic rap music. Details on location, dates, and tickets are coming soon.', '2025', 'Events', '/Zro Photos/4D71F081-FBA6-4B0E-BDB6-A3BEEDEFD627.JPEG', 'DKG Entertainment');
