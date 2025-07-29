-- Drop existing tables if they exist
DROP TABLE IF EXISTS products CASCADE;
DROP TABLE IF EXISTS categories CASCADE;
DROP TABLE IF EXISTS site_settings CASCADE;
DROP TABLE IF EXISTS contact_info CASCADE;
DROP TABLE IF EXISTS about_settings CASCADE;
DROP TABLE IF EXISTS team_members CASCADE;
DROP TABLE IF EXISTS services CASCADE;
DROP TABLE IF EXISTS stats CASCADE;
DROP TABLE IF EXISTS faqs CASCADE;
DROP TABLE IF EXISTS contact_settings CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- Create categories table
CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    description TEXT,
    image TEXT,
    product_count INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create products table
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    original_price DECIMAL(10,2),
    image TEXT,
    category VARCHAR(255) NOT NULL,
    brand VARCHAR(255) NOT NULL,
    badge VARCHAR(100),
    rating DECIMAL(3,2) DEFAULT 0,
    reviews INTEGER DEFAULT 0,
    features TEXT[] DEFAULT '{}',
    specifications JSONB DEFAULT '{}',
    in_stock BOOLEAN DEFAULT true,
    stock_quantity INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create site_settings table
CREATE TABLE site_settings (
    id SERIAL PRIMARY KEY,
    hero_title VARCHAR(255) NOT NULL,
    hero_subtitle TEXT,
    featured_section_title VARCHAR(255),
    featured_section_subtitle TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create contact_info table
CREATE TABLE contact_info (
    id SERIAL PRIMARY KEY,
    phone VARCHAR(50),
    email VARCHAR(255),
    address TEXT,
    working_hours VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create about_settings table
CREATE TABLE about_settings (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    subtitle VARCHAR(255),
    description TEXT,
    mission TEXT,
    vision TEXT,
    values TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create team_members table
CREATE TABLE team_members (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    position VARCHAR(255),
    image TEXT,
    bio TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create services table
CREATE TABLE services (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    icon VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create stats table
CREATE TABLE stats (
    id SERIAL PRIMARY KEY,
    label VARCHAR(255) NOT NULL,
    value VARCHAR(100) NOT NULL,
    icon VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create faqs table
CREATE TABLE faqs (
    id SERIAL PRIMARY KEY,
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create contact_settings table
CREATE TABLE contact_settings (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    subtitle VARCHAR(255),
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    role VARCHAR(50) DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert categories
INSERT INTO categories (name, slug, description, image, product_count) VALUES
('كاميرات المراقبة', 'cameras', 'كاميرات مراقبة عالية الجودة للمنازل والمكاتب', '/placeholder.svg?height=200&width=300&text=كاميرات', 6),
('أنظمة الإنذار', 'alarms', 'أنظمة إنذار متطورة للحماية الشاملة', '/placeholder.svg?height=200&width=300&text=إنذار', 4),
('الأقفال الذكية', 'smart-locks', 'أقفال ذكية متقدمة بتقنيات حديثة', '/placeholder.svg?height=200&width=300&text=أقفال', 3),
('المنازل الذكية', 'smart-home', 'حلول المنازل الذكية والتحكم الآلي', '/placeholder.svg?height=200&width=300&text=منازل+ذكية', 3);

-- Insert products
INSERT INTO products (name, description, price, original_price, image, category, brand, badge, rating, reviews, features, specifications, in_stock, stock_quantity) VALUES
('كاميرا مراقبة ذكية 4K', 'كاميرا مراقبة متطورة بدقة 4K ورؤية ليلية فائقة مع تقنيات الذكاء الاصطناعي', 899, 1199, '/placeholder.svg?height=300&width=300&text=كاميرا+4K', 'cameras', 'HikVision', 'مميز', 4.8, 156, ARRAY['دقة 4K فائقة الوضوح', 'رؤية ليلية متقدمة', 'كشف الحركة الذكي', 'تطبيق جوال'], '{"resolution": "4K", "night_vision": "نعم", "storage": "سحابي"}', true, 25),

('نظام إنذار لاسلكي متكامل', 'نظام إنذار لاسلكي متطور مع تقنيات حديثة ومقاومة للتداخل', 1299, 1599, '/placeholder.svg?height=300&width=300&text=نظام+إنذار', 'alarms', 'Ajax', 'جديد', 4.9, 89, ARRAY['تقنية لاسلكية', 'تطبيق ذكي', 'بطارية طويلة المدى', 'مقاوم للتداخل'], '{"wireless": "نعم", "battery_life": "5 سنوات", "range": "2000 متر"}', true, 15),

('قفل ذكي بالبصمة والرقم السري', 'قفل ذكي متعدد الوسائل للحماية القصوى مع فتح بالبصمة والرقم السري', 799, null, '/placeholder.svg?height=300&width=300&text=قفل+ذكي', 'smart-locks', 'Samsung', 'الأكثر مبيعاً', 4.7, 234, ARRAY['فتح بالبصمة', 'رقم سري', 'تطبيق جوال', 'بطارية قابلة للشحن'], '{"fingerprint": "نعم", "passcode": "نعم", "app_control": "نعم"}', true, 18),

('جهاز تحكم ذكي بالمنزل', 'مركز تحكم ذكي لإدارة جميع أجهزة المنزل مع تحكم صوتي', 599, null, '/placeholder.svg?height=300&width=300&text=تحكم+ذكي', 'smart-home', 'Xiaomi', null, 4.6, 178, ARRAY['تحكم صوتي', 'واي فاي مدمج', 'تطبيق شامل', 'توافق مع أليكسا'], '{"voice_control": "نعم", "wifi": "نعم", "compatibility": "أليكسا، جوجل"}', true, 12),

('كاشف دخان ذكي', 'كاشف دخان ذكي للحماية المبكرة من الحرائق مع إنذار صوتي', 299, null, '/placeholder.svg?height=300&width=300&text=كاشف+دخان', 'alarms', 'Nest', 'موصى به', 4.8, 145, ARRAY['كشف مبكر', 'إنذار صوتي', 'إشعارات فورية', 'بطارية 10 سنوات'], '{"battery_life": "10 سنوات", "connectivity": "واي فاي", "alerts": "فورية"}', true, 30),

('نظام إضاءة ذكي LED', 'نظام إضاءة ذكي قابل للتخصيص بالكامل مع 16 مليون لون', 449, null, '/placeholder.svg?height=300&width=300&text=إضاءة+ذكية', 'smart-home', 'Philips', null, 4.5, 267, ARRAY['16 مليون لون', 'تحكم صوتي', 'جدولة تلقائية', 'توفير الطاقة'], '{"colors": "16 مليون", "voice_control": "نعم", "scheduling": "نعم"}', true, 22),

('جرس باب ذكي بالفيديو', 'جرس باب ذكي مع كاميرا عالية الدقة وصوت ثنائي الاتجاه', 699, 899, '/placeholder.svg?height=300&width=300&text=جرس+ذكي', 'cameras', 'Ring', 'عرض خاص', 4.7, 198, ARRAY['فيديو HD', 'صوت ثنائي الاتجاه', 'كشف الحركة', 'تخزين سحابي'], '{"video_quality": "HD", "two_way_audio": "نعم", "storage": "سحابي"}', true, 14),

('مستشعر حركة لاسلكي', 'مستشعر حركة دقيق للكشف المبكر مع تقنية PIR', 199, null, '/placeholder.svg?height=300&width=300&text=مستشعر+حركة', 'alarms', 'Sonoff', null, 4.4, 123, ARRAY['تقنية PIR', 'مدى 8 متر', 'بطارية طويلة', 'مقاوم للماء'], '{"technology": "PIR", "range": "8 متر", "waterproof": "نعم"}', false, 0),

('كاميرا مراقبة خارجية', 'كاميرا مراقبة مقاومة للطقس مع رؤية ليلية ملونة', 1299, 1599, '/placeholder.svg?height=300&width=300&text=كاميرا+خارجية', 'cameras', 'Dahua', 'مميز', 4.6, 87, ARRAY['مقاومة للطقس', 'رؤية ليلية ملونة', 'تسجيل محلي', 'كشف الوجوه'], '{"weatherproof": "IP67", "night_vision": "ملونة", "face_detection": "نعم"}', true, 8),

('نظام أمان متكامل', 'نظام أمان شامل يتضمن كاميرات وأجهزة استشعار وتطبيق', 2499, 2999, '/placeholder.svg?height=300&width=300&text=نظام+متكامل', 'alarms', 'Hikvision', 'حزمة كاملة', 4.9, 45, ARRAY['4 كاميرات', '8 مستشعرات', 'جهاز تسجيل', 'تطبيق شامل'], '{"cameras": "4", "sensors": "8", "dvr": "نعم", "app": "شامل"}', true, 5),

('قفل ذكي بالكارت', 'قفل إلكتروني يعمل بالكارت المغناطيسي والتطبيق', 649, null, '/placeholder.svg?height=300&width=300&text=قفل+كارت', 'smart-locks', 'Yale', null, 4.5, 156, ARRAY['فتح بالكارت', 'تطبيق ذكي', 'سجل الدخول', 'إنذار العبث'], '{"card_access": "نعم", "app_control": "نعم", "access_log": "نعم"}', true, 11),

('مفتاح ذكي للإضاءة', 'مفتاح ذكي للتحكم في الإضاءة عن بعد مع جدولة', 179, null, '/placeholder.svg?height=300&width=300&text=مفتاح+ذكي', 'smart-home', 'Sonoff', null, 4.3, 289, ARRAY['تحكم عن بعد', 'جدولة زمنية', 'توفير الطاقة', 'سهل التركيب'], '{"remote_control": "نعم", "scheduling": "نعم", "easy_install": "نعم"}', true, 35),

('كاميرا مراقبة داخلية دوارة', 'كاميرا مراقبة داخلية بإمكانية الدوران 360 درجة', 399, 499, '/placeholder.svg?height=300&width=300&text=كاميرا+دوارة', 'cameras', 'TP-Link', null, 4.4, 201, ARRAY['دوران 360 درجة', 'تتبع الحركة', 'صوت ثنائي الاتجاه', 'رؤية ليلية'], '{"rotation": "360 درجة", "motion_tracking": "نعم", "night_vision": "نعم"}', true, 19),

('جهاز إنذار ضد السرقة', 'جهاز إنذار محمول ضد السرقة مع صافرة عالية الصوت', 89, null, '/placeholder.svg?height=300&width=300&text=إنذار+سرقة', 'alarms', 'Ajax', null, 4.2, 167, ARRAY['صافرة عالية', 'تفعيل بالحركة', 'بطارية طويلة', 'حجم صغير'], '{"siren": "120 ديسيبل", "motion_activation": "نعم", "battery": "6 أشهر"}', true, 28),

('قفل ذكي بالوجه', 'قفل متطور يعمل بتقنية التعرف على الوجه مع الذكاء الاصطناعي', 1299, 1599, '/placeholder.svg?height=300&width=300&text=قفل+وجه', 'smart-locks', 'Hikvision', 'تقنية متقدمة', 4.8, 92, ARRAY['تعرف على الوجه', 'ذكاء اصطناعي', 'سجل الدخول', 'مقاوم للطقس'], '{"face_recognition": "نعم", "ai": "نعم", "weatherproof": "IP65"}', true, 7),

('كاميرا مراقبة مخفية', 'كاميرا مراقبة صغيرة ومخفية للمراقبة السرية', 249, null, '/placeholder.svg?height=300&width=300&text=كاميرا+مخفية', 'cameras', 'Mini Cam', null, 4.1, 134, ARRAY['حجم صغير', 'تسجيل عالي الجودة', 'بطارية داخلية', 'سهل الإخفاء'], '{"size": "صغير جداً", "recording": "HD", "battery": "داخلية"}', true, 16);

-- Insert site settings
INSERT INTO site_settings (hero_title, hero_subtitle, featured_section_title, featured_section_subtitle) VALUES
('حلول الأمان المتقدمة', 'نقدم أحدث تقنيات الأمان والمنازل الذكية لحماية ممتلكاتك وتوفير الراحة والأمان', 'المنتجات المميزة', 'أحدث وأفضل منتجاتنا في مجال الأمان والتقنيات الذكية');

-- Insert contact info
INSERT INTO contact_info (phone, email, address, working_hours) VALUES
('+966 50 123 4567', 'info@easyoft.com', 'الرياض، المملكة العربية السعودية', 'السبت - الخميس: 9:00 ص - 6:00 م');

-- Insert about settings
INSERT INTO about_settings (title, subtitle, description, mission, vision, values) VALUES
('EazySoft', 'رواد في مجال الأمان والتكنولوجيا الذكية', 'تأسست EazySoft بهدف توفير أحدث حلول الأمان والتكنولوجيا الذكية للمنازل والشركات. نحن نؤمن بأن الأمان والراحة يجب أن يكونا في متناول الجميع.', 'نسعى لتوفير أفضل حلول الأمان والتكنولوجيا الذكية مع خدمة عملاء متميزة', 'أن نكون الشركة الرائدة في مجال الأمان والتكنولوجيا الذكية في المنطقة', 'نقدر الجودة والابتكار وخدمة العملاء المتميزة');

-- Insert team members
INSERT INTO team_members (name, position, image, bio) VALUES
('أحمد محمد', 'مدير تقني', '/placeholder-user.jpg', 'خبير في أنظمة الأمان مع أكثر من 10 سنوات خبرة'),
('سارة أحمد', 'مهندسة أنظمة', '/placeholder-user.jpg', 'متخصصة في تصميم وتطوير الأنظمة الذكية'),
('محمد علي', 'فني تركيب', '/placeholder-user.jpg', 'خبير في تركيب وصيانة أنظمة الأمان');

-- Insert services
INSERT INTO services (title, description, icon) VALUES
('أجهزة البصمة', 'أحدث أجهزة البصمة للحضور والانصراف وأنظمة الأمان', 'Fingerprint'),
('البوابات الإلكترونية', 'بوابات أمان متطورة مع أنظمة تحكم ذكية', 'Shield'),
('كاميرات المراقبة', 'أنظمة مراقبة عالية الجودة مع تقنيات الذكاء الاصطناعي', 'Camera'),
('المنازل الذكية', 'حلول شاملة لأتمتة المنازل والمكاتب', 'Home');

-- Insert stats
INSERT INTO stats (label, value, icon) VALUES
('عميل راضي', '500+', 'users'),
('مشروع مكتمل', '1000+', 'check'),
('سنوات خبرة', '5+', 'calendar'),
('دعم فني', '24/7', 'headphones');

-- Insert FAQs
INSERT INTO faqs (question, answer) VALUES
('كم يستغرق تركيب النظام؟', 'عادة ما يستغرق التركيب من يوم إلى ثلاثة أيام حسب حجم المشروع.'),
('هل تقدمون ضمان على المنتجات؟', 'نعم، نقدم ضمان شامل لمدة سنتين على جميع منتجاتنا.'),
('هل يمكن الحصول على استشارة مجانية؟', 'بالطبع! نقدم استشارة مجانية لجميع عملائنا لاختيار الحل المناسب.'),
('هل تقدمون خدمة الصيانة؟', 'نعم، نقدم خدمة صيانة دورية ودعم فني على مدار الساعة.');

-- Insert contact settings
INSERT INTO contact_settings (title, subtitle, description) VALUES
('تواصل معنا', 'نحن هنا لمساعدتك', 'لديك استفسار أو تحتاج لمساعدة؟ فريقنا المتخصص جاهز لخدمتك');

-- Insert admin user
INSERT INTO users (username, password, email, role) VALUES
('admin', 'admin123', 'admin@easyoft.com', 'admin');

-- Create indexes for better performance
CREATE INDEX idx_products_category ON products(category);
CREATE INDEX idx_products_brand ON products(brand);
CREATE INDEX idx_products_price ON products(price);
CREATE INDEX idx_products_in_stock ON products(in_stock);
CREATE INDEX idx_categories_slug ON categories(slug);

-- Create triggers to update timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_categories_updated_at BEFORE UPDATE ON categories FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_site_settings_updated_at BEFORE UPDATE ON site_settings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_contact_info_updated_at BEFORE UPDATE ON contact_info FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_about_settings_updated_at BEFORE UPDATE ON about_settings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_team_members_updated_at BEFORE UPDATE ON team_members FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_services_updated_at BEFORE UPDATE ON services FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_stats_updated_at BEFORE UPDATE ON stats FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_faqs_updated_at BEFORE UPDATE ON faqs FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_contact_settings_updated_at BEFORE UPDATE ON contact_settings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
