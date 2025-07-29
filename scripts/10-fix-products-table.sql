-- إضافة العمود المفقود is_featured إلى جدول المنتجات
ALTER TABLE products ADD COLUMN IF NOT EXISTS is_featured BOOLEAN DEFAULT false;

-- إضافة فهارس لتحسين الأداء
CREATE INDEX IF NOT EXISTS idx_products_is_featured ON products(is_featured);
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_in_stock ON products(in_stock);
CREATE INDEX IF NOT EXISTS idx_categories_slug ON categories(slug);

-- تحديث بعض المنتجات لتكون مميزة
UPDATE products SET is_featured = true WHERE id IN (1, 2, 3, 4, 5, 6, 7, 8);

-- إنشاء جدول إعدادات الموقع إذا لم يكن موجوداً
CREATE TABLE IF NOT EXISTS site_settings (
    id SERIAL PRIMARY KEY,
    hero_title TEXT DEFAULT 'مرحباً بكم في EASYoft',
    hero_subtitle TEXT DEFAULT 'حلول تقنية متطورة لحياة أكثر أماناً وراحة',
    featured_section_title TEXT DEFAULT 'المنتجات المميزة',
    featured_section_subtitle TEXT DEFAULT 'اكتشف أحدث منتجاتنا التقنية عالية الجودة',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- إدراج البيانات الافتراضية لإعدادات الموقع
INSERT INTO site_settings (id, hero_title, hero_subtitle, featured_section_title, featured_section_subtitle)
VALUES (1, 'حلول الأمان المتقدمة', 'نقدم أحدث تقنيات الأمان والمنازل الذكية لحماية ممتلكاتك وتوفير الراحة والأمان', 'المنتجات المميزة', 'أحدث وأفضل منتجاتنا في مجال الأمان والتقنيات الذكية')
ON CONFLICT (id) DO UPDATE SET
    hero_title = EXCLUDED.hero_title,
    hero_subtitle = EXCLUDED.hero_subtitle,
    featured_section_title = EXCLUDED.featured_section_title,
    featured_section_subtitle = EXCLUDED.featured_section_subtitle,
    updated_at = CURRENT_TIMESTAMP;

-- إنشاء جدول معلومات التواصل إذا لم يكن موجوداً
CREATE TABLE IF NOT EXISTS contact_info (
    id SERIAL PRIMARY KEY,
    phone TEXT DEFAULT '+966 50 123 4567',
    email TEXT DEFAULT 'info@easyoft.com',
    address TEXT DEFAULT 'الرياض، المملكة العربية السعودية',
    working_hours TEXT DEFAULT 'الأحد - الخميس: 9:00 ص - 6:00 م',
    whatsapp TEXT DEFAULT '+966 50 123 4567',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- إدراج البيانات الافتراضية لمعلومات التواصل
INSERT INTO contact_info (id, phone, email, address, working_hours, whatsapp)
VALUES (1, '+966 50 123 4567', 'info@easyoft.com', 'الرياض، المملكة العربية السعودية', 'الأحد - الخميس: 9:00 ص - 6:00 م', '+966 50 123 4567')
ON CONFLICT (id) DO UPDATE SET
    phone = EXCLUDED.phone,
    email = EXCLUDED.email,
    address = EXCLUDED.address,
    working_hours = EXCLUDED.working_hours,
    whatsapp = EXCLUDED.whatsapp,
    updated_at = CURRENT_TIMESTAMP;
