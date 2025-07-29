-- Drop existing tables if they exist
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS contact_settings CASCADE;
DROP TABLE IF EXISTS about_settings CASCADE;
DROP TABLE IF EXISTS contact_info CASCADE;
DROP TABLE IF EXISTS site_settings CASCADE;
DROP TABLE IF EXISTS team_members CASCADE;
DROP TABLE IF EXISTS services CASCADE;
DROP TABLE IF EXISTS stats CASCADE;
DROP TABLE IF EXISTS faqs CASCADE;
DROP TABLE IF EXISTS products CASCADE;
DROP TABLE IF EXISTS categories CASCADE;

-- Create users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'user',
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

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
    brand VARCHAR(255),
    badge VARCHAR(100),
    rating DECIMAL(3,2) DEFAULT 0,
    reviews INTEGER DEFAULT 0,
    features JSONB DEFAULT '[]',
    specifications JSONB DEFAULT '{}',
    in_stock BOOLEAN DEFAULT true,
    stock_quantity INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create site_settings table
CREATE TABLE site_settings (
    id SERIAL PRIMARY KEY,
    hero_title VARCHAR(255) DEFAULT 'مرحباً بكم في EASYoft',
    hero_subtitle VARCHAR(255) DEFAULT 'حلول تقنية متطورة',
    featured_section_title VARCHAR(255) DEFAULT 'المنتجات المميزة',
    featured_section_subtitle VARCHAR(255) DEFAULT 'اكتشف أحدث منتجاتنا',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create contact_info table
CREATE TABLE contact_info (
    id SERIAL PRIMARY KEY,
    phone VARCHAR(50) DEFAULT '+966 50 123 4567',
    email VARCHAR(255) DEFAULT 'info@easyoft.com',
    address TEXT DEFAULT 'الرياض، المملكة العربية السعودية',
    working_hours VARCHAR(255) DEFAULT 'الأحد - الخميس: 9:00 ص - 6:00 م',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create about_settings table
CREATE TABLE about_settings (
    id SERIAL PRIMARY KEY,
    hero_title VARCHAR(255) DEFAULT 'من نحن',
    hero_subtitle VARCHAR(255) DEFAULT 'نحن شركة رائدة في مجال التكنولوجيا',
    story_title VARCHAR(255) DEFAULT 'قصتنا',
    story_content TEXT DEFAULT 'بدأت رحلتنا في عام 2020 برؤية واضحة لتقديم حلول تقنية مبتكرة',
    story_content_2 TEXT DEFAULT 'نسعى لتكون الخيار الأول للعملاء في المنطقة',
    mission_title VARCHAR(255) DEFAULT 'مهمتنا',
    mission_content TEXT DEFAULT 'تقديم أفضل الحلول التقنية بأعلى معايير الجودة',
    vision_title VARCHAR(255) DEFAULT 'رؤيتنا',
    vision_content TEXT DEFAULT 'أن نكون الشركة الرائدة في مجال التكنولوجيا',
    values_title VARCHAR(255) DEFAULT 'قيمنا',
    team_title VARCHAR(255) DEFAULT 'فريق العمل',
    stats_title VARCHAR(255) DEFAULT 'إنجازاتنا',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create contact_settings table
CREATE TABLE contact_settings (
    id SERIAL PRIMARY KEY,
    hero_title VARCHAR(255) DEFAULT 'تواصل معنا',
    hero_subtitle VARCHAR(255) DEFAULT 'نحن هنا لمساعدتك',
    hero_description TEXT DEFAULT 'لا تتردد في التواصل معنا لأي استفسار أو طلب خدمة',
    form_title VARCHAR(255) DEFAULT 'أرسل لنا رسالة',
    form_subtitle VARCHAR(255) DEFAULT 'سنقوم بالرد عليك في أقرب وقت ممكن',
    info_title VARCHAR(255) DEFAULT 'معلومات التواصل',
    office_hours VARCHAR(255) DEFAULT 'الأحد - الخميس: 9:00 ص - 6:00 م',
    response_time VARCHAR(255) DEFAULT 'نرد خلال 24 ساعة',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create team_members table
CREATE TABLE team_members (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(255) NOT NULL,
    position VARCHAR(255) NOT NULL,
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
    number VARCHAR(50) NOT NULL,
    value VARCHAR(50) NOT NULL,
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

-- Insert default admin user
INSERT INTO users (email, password, role, name) VALUES
('admin@easyoft.com', 'admin123', 'admin', 'مدير النظام');

-- Insert categories
INSERT INTO categories (name, slug, description, image, product_count) VALUES
('كاميرات المراقبة', 'security-cameras', 'أحدث كاميرات المراقبة عالية الدقة', '/placeholder.svg?height=300&width=400', 6),
('أنظمة الإنذار', 'alarm-systems', 'أنظمة إنذار متطورة للحماية الشاملة', '/placeholder.svg?height=300&width=400', 4),
('الأقفال الذكية', 'smart-locks', 'أقفال ذكية بتقنيات حديثة', '/placeholder.svg?height=300&width=400', 3),
('المنازل الذكية', 'smart-homes', 'حلول المنازل الذكية المتكاملة', '/placeholder.svg?height=300&width=400', 3);

-- Insert products
INSERT INTO products (name, description, price, original_price, image, category, brand, badge, rating, reviews, features, specifications, in_stock, stock_quantity) VALUES
-- Security Cameras
('كاميرا مراقبة 4K الذكية', 'كاميرا مراقبة عالية الدقة 4K مع تقنية الذكاء الاصطناعي', 899.00, 1199.00, '/placeholder.svg?height=300&width=400', 'security-cameras', 'TechVision', 'الأكثر مبيعاً', 4.8, 156, 
'["دقة 4K فائقة الوضوح", "رؤية ليلية متطورة", "كشف الحركة الذكي", "تسجيل سحابي", "مقاوم للماء IP67"]',
'{"الدقة": "3840×2160 (4K)", "زاوية الرؤية": "110 درجة", "الرؤية الليلية": "حتى 30 متر", "التخزين": "سحابي + بطاقة SD", "الاتصال": "WiFi + Ethernet"}',
true, 25),

('كاميرا مراقبة خارجية مقاومة للطقس', 'كاميرا مراقبة خارجية بدقة عالية ومقاومة لجميع الظروف الجوية', 649.00, 799.00, '/placeholder.svg?height=300&width=400', 'security-cameras', 'SecureGuard', 'جديد', 4.6, 89, 
'["مقاومة للطقس IP66", "دقة Full HD", "رؤية ليلية ملونة", "كشف الحركة", "تطبيق جوال"]',
'{"الدقة": "1920×1080 (Full HD)", "زاوية الرؤية": "90 درجة", "الرؤية الليلية": "حتى 25 متر", "التخزين": "بطاقة SD حتى 128GB", "الاتصال": "WiFi"}',
true, 18),

('كاميرا مراقبة داخلية دوارة', 'كاميرا مراقبة داخلية بإمكانية الدوران 360 درجة والتحكم عن بعد', 449.00, NULL, '/placeholder.svg?height=300&width=400', 'security-cameras', 'SmartEye', NULL, 4.4, 67, 
'["دوران 360 درجة", "تتبع الحركة التلقائي", "صوت ثنائي الاتجاه", "تنبيهات فورية", "سهولة التركيب"]',
'{"الدقة": "1920×1080 (Full HD)", "زاوية الرؤية": "360 درجة", "الصوت": "ثنائي الاتجاه", "التخزين": "سحابي + محلي", "الاتصال": "WiFi"}',
true, 32),

('نظام كاميرات مراقبة متكامل 8 قنوات', 'نظام مراقبة متكامل يشمل 8 كاميرات عالية الدقة مع جهاز تسجيل', 2899.00, 3499.00, '/placeholder.svg?height=300&width=400', 'security-cameras', 'ProSecurity', 'عرض خاص', 4.9, 234, 
'["8 كاميرات عالية الدقة", "جهاز تسجيل 2TB", "مراقبة عن بعد", "تنبيهات ذكية", "تركيب مجاني"]',
'{"عدد الكاميرات": "8 كاميرات", "الدقة": "1920×1080 لكل كاميرا", "التخزين": "2TB قابل للتوسيع", "المراقبة": "عبر الإنترنت والجوال", "الضمان": "3 سنوات"}',
true, 12),

('كاميرا مراقبة بالطاقة الشمسية', 'كاميرا مراقبة تعمل بالطاقة الشمسية مثالية للمناطق النائية', 1299.00, NULL, '/placeholder.svg?height=300&width=400', 'security-cameras', 'EcoWatch', 'صديق للبيئة', 4.5, 78, 
'["تعمل بالطاقة الشمسية", "بطارية تدوم 30 يوم", "مقاومة للطقس", "اتصال 4G", "لا تحتاج كهرباء"]',
'{"الطاقة": "لوح شمسي + بطارية ليثيوم", "الدقة": "1920×1080", "الاتصال": "4G/WiFi", "البطارية": "تدوم حتى 30 يوم", "التركيب": "سهل بدون أسلاك"}',
true, 15),

('كاميرا مراقبة مخفية', 'كاميرا مراقبة صغيرة ومخفية للمراقبة السرية', 299.00, 399.00, '/placeholder.svg?height=300&width=400', 'security-cameras', 'StealthCam', NULL, 4.2, 45, 
'["حجم صغير جداً", "تسجيل عالي الدقة", "بطارية طويلة المدى", "كشف الحركة", "سهولة الإخفاء"]',
'{"الحجم": "3×3×1 سم", "الدقة": "1280×720", "البطارية": "تدوم 6 ساعات", "التخزين": "بطاقة micro SD", "الوزن": "50 جرام"}',
true, 28),

-- Alarm Systems
('نظام إنذار لاسلكي متكامل', 'نظام إنذار لاسلكي شامل مع أجهزة استشعار متعددة', 1599.00, 1899.00, '/placeholder.svg?height=300&width=400', 'alarm-systems', 'AlarmTech', 'الأكثر مبيعاً', 4.7, 198, 
'["لاسلكي بالكامل", "أجهزة استشعار متعددة", "تطبيق جوال", "تنبيهات فورية", "سهولة التركيب"]',
'{"المكونات": "وحدة تحكم + 6 أجهزة استشعار", "المدى": "حتى 100 متر", "البطارية": "تدوم سنة كاملة", "الاتصال": "WiFi + GSM", "التنبيهات": "جوال + إيميل + صوت"}',
true, 22),

('جهاز إنذار ضد السرقة للمنازل', 'جهاز إنذار متطور للحماية من السرقة مع تقنيات ذكية', 899.00, NULL, '/placeholder.svg?height=300&width=400', 'alarm-systems', 'HomeSafe', 'جديد', 4.5, 87, 
'["كشف الحركة الذكي", "أجهزة استشعار للأبواب والنوافذ", "صافرة إنذار قوية", "تحكم عن بعد", "نسخ احتياطي للبطارية"]',
'{"قوة الصوت": "120 ديسيبل", "أجهزة الاستشعار": "4 للأبواب + 2 للحركة", "البطارية الاحتياطية": "12 ساعة", "المدى": "50 متر", "التحكم": "ريموت كنترول + تطبيق"}',
true, 19),

('نظام إنذار الحريق الذكي', 'نظام إنذار حريق ذكي مع أجهزة استشعار الدخان والحرارة', 1299.00, 1599.00, '/placeholder.svg?height=300&width=400', 'alarm-systems', 'FireGuard', 'ضروري', 4.8, 156, 
'["كشف الدخان والحرارة", "تنبيهات فورية", "اتصال بالدفاع المدني", "اختبار دوري تلقائي", "بطارية طويلة المدى"]',
'{"أجهزة الاستشعار": "6 للدخان + 4 للحرارة", "الاستجابة": "أقل من 30 ثانية", "البطارية": "تدوم 5 سنوات", "الاتصال": "WiFi + خط أرضي", "الشهادات": "معتمد من الدفاع المدني"}',
true, 14),

('جهاز إنذار شخصي محمول', 'جهاز إنذار شخصي صغير ومحمول للحماية الشخصية', 149.00, 199.00, '/placeholder.svg?height=300&width=400', 'alarm-systems', 'PersonalGuard', NULL, 4.3, 92, 
'["حجم صغير ومحمول", "صوت إنذار قوي", "إضاءة LED ساطعة", "سهل الاستخدام", "مقاوم للماء"]',
'{"الحجم": "8×4×2 سم", "قوة الصوت": "130 ديسيبل", "الإضاءة": "LED فائق السطوع", "البطارية": "تدوم 6 أشهر", "الوزن": "80 جرام"}',
true, 45),

-- Smart Locks
('قفل ذكي بالبصمة والرقم السري', 'قفل ذكي متطور يعمل بالبصمة والرقم السري مع تطبيق جوال', 1899.00, 2299.00, '/placeholder.svg?height=300&width=400', 'smart-locks', 'SmartLock Pro', 'الأكثر تطوراً', 4.9, 267, 
'["فتح بالبصمة", "رقم سري", "تطبيق جوال", "مفاتيح احتياطية", "تسجيل دخول وخروج"]',
'{"طرق الفتح": "بصمة + رقم سري + تطبيق + مفتاح", "عدد البصمات": "حتى 100 بصمة", "البطارية": "تدوم سنة كاملة", "المواد": "معدن مقاوم للصدأ", "التركيب": "سهل على الأبواب العادية"}',
true, 16),

('قفل ذكي بتقنية البلوتوث', 'قفل ذكي يعمل بتقنية البلوتوث مع إمكانية المشاركة مع العائلة', 1299.00, NULL, '/placeholder.svg?height=300&width=400', 'smart-locks', 'BluetoothLock', 'سهل الاستخدام', 4.6, 134, 
'["فتح بالبلوتوث", "مشاركة الوصول", "تطبيق سهل", "إنذار عند العبث", "بطارية طويلة المدى"]',
'{"الاتصال": "Bluetooth 5.0", "المدى": "10 أمتار", "المستخدمين": "حتى 20 مستخدم", "البطارية": "8 بطاريات AA تدوم 8 أشهر", "التوافق": "iOS و Android"}',
true, 23),

('قفل ذكي بكاميرا مدمجة', 'قفل ذكي مع كاميرا مدمجة لرؤية الزوار والتحكم عن بعد', 2499.00, 2899.00, '/placeholder.svg?height=300&width=400', 'smart-locks', 'CameraLock', 'مميز', 4.7, 89, 
'["كاميرا مدمجة", "رؤية ليلية", "تسجيل الزوار", "فتح عن بعد", "تنبيهات فورية"]',
'{"الكاميرا": "1080p مع رؤية ليلية", "التخزين": "سحابي + بطاقة SD", "الشاشة": "4.3 بوصة ملونة", "البطارية": "قابلة للشحن تدوم شهر", "المميزات": "كشف الحركة + تسجيل تلقائي"}',
true, 11),

-- Smart Homes
('نظام منزل ذكي متكامل', 'نظام منزل ذكي شامل للتحكم في الإضاءة والتكييف والأمان', 4999.00, 5999.00, '/placeholder.svg?height=300&width=400', 'smart-homes', 'SmartHome Pro', 'الأكثر شمولية', 4.8, 178, 
'["تحكم في الإضاءة", "تحكم في التكييف", "نظام أمان متكامل", "تحكم صوتي", "توفير الطاقة"]',
'{"المكونات": "وحدة تحكم مركزية + 20 جهاز ذكي", "التحكم": "تطبيق + صوت + لمس", "التوافق": "Alexa, Google Assistant", "التوفير": "حتى 30% من فاتورة الكهرباء", "التركيب": "بواسطة فريق متخصص"}',
true, 8),

('مساعد منزلي ذكي بالصوت', 'مساعد منزلي ذكي يعمل بالأوامر الصوتية للتحكم في المنزل', 899.00, 1199.00, '/placeholder.svg?height=300&width=400', 'smart-homes', 'VoiceAssistant', 'سهل الاستخدام', 4.5, 156, 
'["تحكم صوتي", "يدعم العربية", "تشغيل الموسيقى", "التحكم في الأجهزة", "الإجابة على الأسئلة"]',
'{"اللغات": "العربية + الإنجليزية", "الاتصال": "WiFi + Bluetooth", "الصوت": "مكبر صوت عالي الجودة", "التوافق": "جميع الأجهزة الذكية", "المميزات": "تعلم ذكي + تحديثات تلقائية"}',
true, 27),

('نظام إضاءة ذكية LED', 'نظام إضاءة ذكية LED قابل للتحكم في اللون والسطوع', 1599.00, NULL, '/placeholder.svg?height=300&width=400', 'smart-homes', 'SmartLight', 'موفر للطاقة', 4.4, 203, 
'["16 مليون لون", "تحكم في السطوع", "جدولة تلقائية", "توفير الطاقة", "تحكم عن بعد"]',
'{"عدد المصابيح": "12 مصباح LED", "الألوان": "16 مليون لون", "التوفير": "80% أقل استهلاك", "العمر الافتراضي": "25000 ساعة", "التحكم": "تطبيق + صوت + مفتاح ذكي"}',
true, 19);

-- Insert default settings
INSERT INTO site_settings (hero_title, hero_subtitle, featured_section_title, featured_section_subtitle) VALUES
('مرحباً بكم في EASYoft', 'حلول تقنية متطورة لحياة أكثر أماناً وراحة', 'المنتجات المميزة', 'اكتشف أحدث منتجاتنا التقنية عالية الجودة');

INSERT INTO contact_info (phone, email, address, working_hours) VALUES
('+966 50 123 4567', 'info@easyoft.com', 'الرياض، المملكة العربية السعودية', 'الأحد - الخميس: 9:00 ص - 6:00 م');

INSERT INTO about_settings DEFAULT VALUES;
INSERT INTO contact_settings DEFAULT VALUES;

-- Insert team members
INSERT INTO team_members (name, role, position, image, bio) VALUES
('أحمد محمد', 'مدير عام', 'المدير التنفيذي', '/placeholder-user.jpg', 'خبرة 15 سنة في مجال التكنولوجيا والأمان'),
('فاطمة علي', 'مديرة التسويق', 'رئيسة قسم التسويق', '/placeholder-user.jpg', 'متخصصة في التسويق الرقمي والعلاقات العامة'),
('محمد سالم', 'مهندس تقني', 'رئيس المهندسين', '/placeholder-user.jpg', 'مهندس أنظمة مع خبرة 12 سنة في الأمان التقني'),
('نورا أحمد', 'مديرة خدمة العملاء', 'رئيسة خدمة العملاء', '/placeholder-user.jpg', 'متخصصة في تجربة العملاء وحل المشاكل التقنية');

-- Insert services
INSERT INTO services (title, description, icon) VALUES
('تركيب الأنظمة', 'تركيب وتشغيل جميع الأنظمة بأعلى معايير الجودة', 'wrench'),
('الصيانة الدورية', 'خدمات صيانة دورية لضمان عمل الأنظمة بكفاءة', 'settings'),
('الدعم الفني', 'دعم فني متواصل على مدار الساعة', 'headphones'),
('الاستشارات التقنية', 'استشارات متخصصة لاختيار الحلول المناسبة', 'lightbulb');

-- Insert stats
INSERT INTO stats (label, number, value, icon) VALUES
('عملاء راضون', '500+', '500', 'users'),
('مشاريع مكتملة', '1000+', '1000', 'briefcase'),
('سنوات خبرة', '10+', '10', 'calendar'),
('منتجات متنوعة', '200+', '200', 'package');

-- Insert FAQs
INSERT INTO faqs (question, answer) VALUES
('ما هي مدة الضمان على المنتجات؟', 'نقدم ضمان شامل لمدة سنتين على جميع المنتجات مع خدمة صيانة مجانية.'),
('هل تقدمون خدمة التركيب؟', 'نعم، لدينا فريق متخصص لتركيب وتشغيل جميع الأنظمة بأعلى معايير الجودة.'),
('كم يستغرق وقت التسليم؟', 'عادة ما يتم التسليم خلال 3-5 أيام عمل داخل المدن الرئيسية.'),
('هل تقدمون دعم فني؟', 'نعم، نقدم دعم فني متواصل على مدار الساعة لجميع عملائنا.'),
('ما هي طرق الدفع المتاحة؟', 'نقبل جميع طرق الدفع: نقداً، بطاقات ائتمانية، تحويل بنكي، وأقساط.');

-- Create indexes for better performance
CREATE INDEX idx_products_category ON products(category);
CREATE INDEX idx_products_brand ON products(brand);
CREATE INDEX idx_products_price ON products(price);
CREATE INDEX idx_products_rating ON products(rating);
CREATE INDEX idx_categories_slug ON categories(slug);
CREATE INDEX idx_users_email ON users(email);

-- Update product counts in categories
UPDATE categories SET product_count = (
    SELECT COUNT(*) FROM products WHERE products.category = categories.slug
);
