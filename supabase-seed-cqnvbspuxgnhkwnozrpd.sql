-- Run this in Supabase SQL Editor for project cqnvbspuxgnhkwnozrpd
-- Dashboard: https://supabase.com/dashboard/project/cqnvbspuxgnhkwnozrpd/sql

-- Schema
CREATE TABLE IF NOT EXISTS exhibitions (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  meaning TEXT DEFAULT '',
  statement JSONB DEFAULT '[]',
  year TEXT DEFAULT '',
  status TEXT DEFAULT 'LIVE',
  edition TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS products (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL,
  price NUMERIC NOT NULL DEFAULT 0,
  description TEXT DEFAULT '',
  details JSONB DEFAULT '{}',
  images JSONB DEFAULT '[]',
  exhibition_id TEXT REFERENCES exhibitions(id) DEFAULT 'nova',
  tags JSONB DEFAULT '[]',
  type TEXT DEFAULT 'Hoodie',
  status TEXT DEFAULT 'active',
  sizes JSONB DEFAULT '["S","M","L","XL"]',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS journal_posts (
  id TEXT PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  excerpt TEXT DEFAULT '',
  date TEXT DEFAULT '',
  reading_time TEXT DEFAULT '',
  tags JSONB DEFAULT '[]',
  body TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS
ALTER TABLE exhibitions ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE journal_posts ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "exhibitions_public_read" ON exhibitions;
CREATE POLICY "exhibitions_public_read" ON exhibitions FOR SELECT USING (true);

DROP POLICY IF EXISTS "products_public_read" ON products;
CREATE POLICY "products_public_read" ON products FOR SELECT USING (true);

DROP POLICY IF EXISTS "products_insert" ON products;
CREATE POLICY "products_insert" ON products FOR INSERT WITH CHECK (true);
DROP POLICY IF EXISTS "products_update" ON products;
CREATE POLICY "products_update" ON products FOR UPDATE USING (true);
DROP POLICY IF EXISTS "products_delete" ON products;
CREATE POLICY "products_delete" ON products FOR DELETE USING (true);

DROP POLICY IF EXISTS "journal_public_read" ON journal_posts;
CREATE POLICY "journal_public_read" ON journal_posts FOR SELECT USING (true);

-- Seed data
INSERT INTO exhibitions (id, title, slug, meaning, statement, year, status, edition) VALUES
  ('nova', 'EXHIBITION 001: NOVA', 'nova', 'A new beginning. The first star of Divergent Studios.', '["NOVA is the ignition of our studio language.","It is a controlled spark—new textures, sharper silhouettes, and a luminous edge.","Every piece is a fragment of a larger installation. Limited, deliberate, and fleeting."]', '2026', 'LIVE', 'Limited run. No restock.')
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, meaning = EXCLUDED.meaning, statement = EXCLUDED.statement, year = EXCLUDED.year, status = EXCLUDED.status, edition = EXCLUDED.edition;

INSERT INTO products (id, name, slug, price, description, details, images, exhibition_id, tags, type, status, sizes) VALUES
  ('nova-hoodie', 'NOVA RELIC HOODIE', 'nova-relic-hoodie', 165, 'A sculpted heavyweight hoodie with dimensional seams and an archival finish. Built to feel like a gallery artifact.', '{"material":"100% brushed cotton fleece","fit":"Oversized, dropped shoulder","weight":"520 GSM","care":"Cold wash, hang dry"}', '[{"id":"hoodie-1","alt":"NOVA hoodie front","tone":"rose"},{"id":"hoodie-2","alt":"NOVA hoodie back","tone":"slate"},{"id":"hoodie-3","alt":"NOVA hoodie detail","tone":"ember"}]', 'nova', '["LIMITED","EXHIBITION 001","NOVA"]', 'Hoodie', 'active', '["S","M","L","XL"]'),
  ('nova-pants', 'NOVA DRIFT PANTS', 'nova-drift-pants', 138, 'Tapered utility trousers with a soft structure and gallery-grade drape. Built for movement through curated spaces.', '{"material":"Cotton nylon blend","fit":"Relaxed taper","weight":"390 GSM","care":"Cold wash, low tumble"}', '[{"id":"pants-1","alt":"NOVA pants front","tone":"slate"},{"id":"pants-2","alt":"NOVA pants back","tone":"ivory"},{"id":"pants-3","alt":"NOVA pants detail","tone":"rose"}]', 'nova', '["LIMITED","EXHIBITION 001","NOVA"]', 'Pants', 'active', '["S","M","L","XL"]'),
  ('nova-accessory', 'NOVA SIGNAL SCARF', 'nova-signal-scarf', 72, 'An abstract knit accessory that reads like a gallery placard. Designed to punctuate the exhibition uniform.', '{"material":"Merino blend knit","fit":"One size","weight":"220 GSM","care":"Hand wash, lay flat"}', '[{"id":"accessory-1","alt":"NOVA scarf","tone":"ember"},{"id":"accessory-2","alt":"NOVA scarf detail","tone":"rose"},{"id":"accessory-3","alt":"NOVA scarf drape","tone":"ivory"}]', 'nova', '["LIMITED","EXHIBITION 001","NOVA"]', 'Accessory', 'active', '["One size"]')
ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, slug = EXCLUDED.slug, price = EXCLUDED.price, description = EXCLUDED.description, details = EXCLUDED.details, images = EXCLUDED.images, exhibition_id = EXCLUDED.exhibition_id, tags = EXCLUDED.tags, type = EXCLUDED.type, status = EXCLUDED.status, sizes = EXCLUDED.sizes;

INSERT INTO journal_posts (id, slug, title, excerpt, date, reading_time, tags, body) VALUES
  ('signal-in-the-noise', 'signal-in-the-noise', 'Signal in the Noise', 'Designing silhouettes that feel like quiet statements inside a loud city.', 'Feb 4, 2026', '4 min read', '["Studio Notes","Process"]', 'NOVA began as a study in restraint. We mapped the quiet zones of a city and translated them into seams and voids.

Each panel is placed to slow the eye, to create a pause in motion. We want every piece to feel like an installation that can move with you.

This is the first chapter of Divergent Studios. A subtle signal, tuned for those who notice.'),
  ('material-memory', 'material-memory', 'Material Memory', 'Why heavyweight cotton changes the way a garment holds light.', 'Feb 2, 2026', '3 min read', '["Materials"]', 'Fabric is memory. The heavier the cloth, the more it remembers each fold. We selected brushed fleece and structured blends to carry form without stiffness.

The result is a quiet architecture—a garment that stores the imprint of every day.'),
  ('plaque-language', 'plaque-language', 'Plaque Language', 'Museum labels inspired the way we communicate every product story.', 'Jan 29, 2026', '5 min read', '["Studio Notes","Story"]', 'We treat every piece like a work of art. The plaque is not decoration—it is context.

In NOVA, each label is a quiet archive: edition, materials, and the feeling we want you to remember.'),
  ('light-study-01', 'light-study-01', 'Light Study 01', 'Experimenting with dark palettes and deep rose highlights.', 'Jan 22, 2026', '2 min read', '["Process"]', 'NOVA is built on black. But the accent—the rose—needed to feel like heat. We tested gradients, metal foils, and woven threads.

The final tone is a low ember: elegant, restrained, and unforgettable.'),
  ('studio-rituals', 'studio-rituals', 'Studio Rituals', 'The routines that keep the studio in alignment.', 'Jan 14, 2026', '3 min read', '["Studio Notes"]', 'We begin each day with silence. The studio is a gallery before it is a workshop.

That quiet informs the collection. We want every visitor to feel a shift when they step in.')
ON CONFLICT (id) DO UPDATE SET slug = EXCLUDED.slug, title = EXCLUDED.title, excerpt = EXCLUDED.excerpt, date = EXCLUDED.date, reading_time = EXCLUDED.reading_time, tags = EXCLUDED.tags, body = EXCLUDED.body;
