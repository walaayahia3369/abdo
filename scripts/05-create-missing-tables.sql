-- Create contact_settings table
CREATE TABLE IF NOT EXISTS contact_settings (
    id SERIAL PRIMARY KEY,
    hero_title VARCHAR(255) DEFAULT 'تواصل معنا',
    hero_subtitle VARCHAR(255) DEFAULT 'نحن هنا لمساعدتك',
    hero_description TEXT DEFAULT 'لديك استفسار أو تحتاج لمساعدة؟ فريقنا المتخصص جاهز لخدمتك',
    form_title VARCHAR(255) DEFAULT 'أرسل لنا رسالة',
    form_description VARCHAR(255) DEFAULT 'املأ النموذج أدناه وسنتواصل معك في أقرب وقت ممكن',
    info_title VARCHAR(255) DEFAULT 'معلومات التواصل',
    info_description VARCHAR(255) DEFAULT 'يمكنك التواصل معنا من خلال الطرق التالية',
    map_title VARCHAR(255) DEFAULT 'موقعنا على الخريطة',
    map_embed_url TEXT DEFAULT '',
    office_hours VARCHAR(255) DEFAULT 'الأحد - الخميس: 9:00 ص - 6:00 م',
    response_time VARCHAR(255) DEFAULT 'نرد على جميع الاستفسارات خلال 24 ساعة',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create site_settings table if not exists
CREATE TABLE IF NOT EXISTS site_settings (
    id SERIAL PRIMARY KEY,
    hero_title VARCHAR(255) DEFAULT 'حلول الأمان المتقدمة',
    hero_subtitle TEXT DEFAULT 'نقدم أحدث تقنيات الأمان والمنازل الذكية لحماية ممتلكاتك وتوفير الراحة والأمان',
    featured_section_title VARCHAR(255) DEFAULT 'المنتجات المميزة',
    featured_section_subtitle TEXT DEFAULT 'أحدث وأفضل منتجاتنا في مجال الأمان والتقنيات الذكية',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Update contact_info table to include whatsapp if not exists
ALTER TABLE contact_info ADD COLUMN IF NOT EXISTS whatsapp VARCHAR(50) DEFAULT '+966 50 123 4567';

-- Update contact_info table to include working_hours if not exists  
ALTER TABLE contact_info ADD COLUMN IF NOT EXISTS working_hours VARCHAR(255) DEFAULT 'السبت - الخميس: 9:00 ص - 6:00 م';

-- Insert default data
INSERT INTO contact_settings (id) VALUES (1) ON CONFLICT (id) DO NOTHING;
INSERT INTO site_settings (id) VALUES (1) ON CONFLICT (id) DO NOTHING;

-- Update contact_info with default whatsapp if null
UPDATE contact_info SET whatsapp = '+966 50 123 4567' WHERE whatsapp IS NULL;
UPDATE contact_info SET working_hours = 'السبت - الخميس: 9:00 ص - 6:00 م' WHERE working_hours IS NULL;
