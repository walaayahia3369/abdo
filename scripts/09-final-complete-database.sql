-- Create users table
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'user',
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create categories table
CREATE TABLE IF NOT EXISTS categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    description TEXT,
    image VARCHAR(500) DEFAULT '/placeholder.svg?height=200&width=200',
    product_count INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create products table
CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    original_price DECIMAL(10,2),
    image VARCHAR(500) DEFAULT '/placeholder.svg?height=400&width=400',
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
CREATE TABLE IF NOT EXISTS site_settings (
    id SERIAL PRIMARY KEY,
    hero_title VARCHAR(255) DEFAULT 'مرحباً بكم في EASYoft',
    hero_subtitle TEXT DEFAULT 'حلول تقنية متطورة لحياة أكثر أماناً وراحة',
    featured_section_title VARCHAR(255) DEFAULT 'المنتجات المميزة',
    featured_section_subtitle TEXT DEFAULT 'اكتشف أحدث منتجاتنا التقنية عالية الجودة',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create contact_info table
CREATE TABLE IF NOT EXISTS contact_info (
    id SERIAL PRIMARY KEY,
    phone VARCHAR(50) DEFAULT '+966 50 123 4567',
    email VARCHAR(255) DEFAULT 'info@easyoft.com',
    address TEXT DEFAULT 'الرياض، المملكة العربية السعودية',
    working_hours VARCHAR(255) DEFAULT 'الأحد - الخميس: 9:00 ص - 6:00 م',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create about_settings table
CREATE TABLE IF NOT EXISTS about_settings (
    id SERIAL PRIMARY KEY,
    hero_title VARCHAR(255) DEFAULT 'من نحن',
    hero_subtitle TEXT DEFAULT 'نحن شركة رائدة في مجال التكنولوجيا',
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
CREATE TABLE IF NOT EXISTS contact_settings (
    id SERIAL PRIMARY KEY,
    hero_title VARCHAR(255) DEFAULT 'تواصل معنا',
    hero_subtitle TEXT DEFAULT 'نحن هنا لمساعدتك',
    hero_description TEXT DEFAULT 'لا تتردد في التواصل معنا لأي استفسار أو طلب خدمة',
    form_title VARCHAR(255) DEFAULT 'أرسل لنا رسالة',
    form_subtitle TEXT DEFAULT 'سنقوم بالرد عليك في أقرب وقت ممكن',
    info_title VARCHAR(255) DEFAULT 'معلومات التواصل',
    office_hours VARCHAR(255) DEFAULT 'الأحد - الخميس: 9:00 ص - 6:00 م',
    response_time VARCHAR(255) DEFAULT 'نرد خلال 24 ساعة',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create team_members table
CREATE TABLE IF NOT EXISTS team_members (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(255) NOT NULL,
    position VARCHAR(255) NOT NULL,
    image VARCHAR(500) DEFAULT '/placeholder-user.jpg',
    bio TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create services table
CREATE TABLE IF NOT EXISTS services (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    icon VARCHAR(255) DEFAULT 'Settings',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create stats table
CREATE TABLE IF NOT EXISTS stats (
    id SERIAL PRIMARY KEY,
    label VARCHAR(255) NOT NULL,
    number VARCHAR(50) NOT NULL,
    value VARCHAR(50) NOT NULL,
    icon VARCHAR(255) DEFAULT 'TrendingUp',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create faqs table
CREATE TABLE IF NOT EXISTS faqs (
    id SERIAL PRIMARY KEY,
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert admin user
INSERT INTO users (email, password, role, name) VALUES 
('admin@easyoft.com', 'admin123', 'admin', 'مدير النظام')
ON CONFLICT (email) DO NOTHING;

-- Insert categories
INSERT INTO categories (name, slug, description, image, product_count) VALUES 
('أنظمة الأمان', 'security-systems', 'أحدث أنظمة الأمان والمراقبة للمنازل والمكاتب', '/placeholder.svg?height=200&width=200&text=Security', 4),
('الشبكات', 'networking', 'معدات الشبكات والاتصالات المتطورة', '/placeholder.svg?height=200&width=200&text=Network', 4),
('الحاسوب', 'computers', 'أجهزة الحاسوب والملحقات التقنية', '/placeholder.svg?height=200&width=200&text=Computer', 4),
('الهواتف الذكية', 'smartphones', 'أحدث الهواتف الذكية والإكسسوارات', '/placeholder.svg?height=200&width=200&text=Phone', 4)
ON CONFLICT (slug) DO NOTHING;

-- Insert products
INSERT INTO products (name, description, price, original_price, image, category, brand, badge, rating, reviews, features, specifications, in_stock, stock_quantity) VALUES 
-- Security Systems
('كاميرا مراقبة ذكية 4K', 'كاميرا مراقبة عالية الدقة مع تقنية الذكاء الاصطناعي ورؤية ليلية متطورة', 899.00, 1199.00, '/placeholder.svg?height=400&width=400&text=4K+Camera', 'security-systems', 'TechVision', 'خصم 25%', 4.8, 156, 
ARRAY['دقة 4K Ultra HD', 'رؤية ليلية بالأشعة تحت الحمراء', 'كشف الحركة الذكي', 'تطبيق جوال مجاني', 'تخزين سحابي آمن'], 
'{"الدقة": "3840x2160 (4K)", "زاوية الرؤية": "110 درجة", "الرؤية الليلية": "حتى 30 متر", "التخزين": "بطاقة SD + سحابي", "الاتصال": "WiFi + Ethernet"}'::jsonb, 
true, 25),

('نظام إنذار ذكي متكامل', 'نظام إنذار شامل مع أجهزة استشعار متعددة وتحكم عن بعد', 1299.00, NULL, '/placeholder.svg?height=400&width=400&text=Smart+Alarm', 'security-systems', 'SecureHome', 'الأكثر مبيعاً', 4.7, 89, 
ARRAY['أجهزة استشعار متعددة', 'تحكم عن بعد', 'إشعارات فورية', 'بطارية احتياطية', 'سهولة التركيب'], 
'{"أجهزة الاستشعار": "8 أجهزة", "البطارية": "12 ساعة احتياطي", "المدى": "100 متر", "التطبيق": "iOS + Android", "الضمان": "سنتان"}'::jsonb, 
true, 15),

('قفل ذكي بالبصمة', 'قفل إلكتروني متطور يعمل بالبصمة ورقم سري مع تطبيق ذكي', 649.00, 799.00, '/placeholder.svg?height=400&width=400&text=Smart+Lock', 'security-systems', 'SmartLock Pro', NULL, 4.6, 203, 
ARRAY['فتح بالبصمة', 'رقم سري', 'تطبيق ذكي', 'مقاوم للماء', 'بطارية طويلة المدى'], 
'{"البصمات": "100 بصمة", "الأرقام السرية": "50 رقم", "البطارية": "6 أشهر", "المادة": "سبائك الألومنيوم", "التركيب": "سهل"}'::jsonb, 
true, 30),

('جهاز إنذار الدخان الذكي', 'كاشف دخان ذكي مع إشعارات فورية وصوت عالي الوضوح', 199.00, NULL, '/placeholder.svg?height=400&width=400&text=Smoke+Detector', 'security-systems', 'SafeGuard', 'جديد', 4.5, 67, 
ARRAY['كشف دقيق للدخان', 'إشعارات فورية', 'صوت عالي 85 ديسيبل', 'بطارية ليثيوم', 'اختبار ذاتي'], 
'{"الحساسية": "عالية جداً", "الصوت": "85 ديسيبل", "البطارية": "10 سنوات", "الاتصال": "WiFi", "الشهادات": "CE, FCC"}'::jsonb, 
true, 50),

-- Networking
('راوتر WiFi 6 عالي السرعة', 'راوتر لاسلكي متطور بتقنية WiFi 6 وسرعة تصل إلى 3000 ميجابت', 799.00, 999.00, '/placeholder.svg?height=400&width=400&text=WiFi+6+Router', 'networking', 'NetSpeed', 'خصم 20%', 4.9, 234, 
ARRAY['تقنية WiFi 6', 'سرعة 3000 ميجابت', '8 هوائيات', 'تحكم ذكي', 'أمان متقدم'], 
'{"السرعة": "3000 Mbps", "التردد": "2.4GHz + 5GHz", "الهوائيات": "8 هوائيات", "المنافذ": "4 Gigabit", "التغطية": "300 متر مربع"}'::jsonb, 
true, 20),

('مقوي إشارة WiFi ذكي', 'مقوي إشارة لاسلكي لتوسيع نطاق الشبكة مع تقنية Mesh', 399.00, NULL, '/placeholder.svg?height=400&width=400&text=WiFi+Extender', 'networking', 'SignalBoost', 'الأكثر مبيعاً', 4.4, 178, 
ARRAY['تقنية Mesh', 'إعداد سهل', 'مؤشر قوة الإشارة', 'منفذ Ethernet', 'تصميم مدمج'], 
'{"السرعة": "1200 Mbps", "التغطية": "150 متر مربع إضافي", "التردد": "ثنائي النطاق", "المنافذ": "منفذ Gigabit", "الإعداد": "WPS + تطبيق"}'::jsonb, 
true, 35),

('سويتش شبكة 24 منفذ', 'سويتش شبكة احترافي بـ 24 منفذ جيجابت مع إدارة ذكية', 1199.00, NULL, '/placeholder.svg?height=400&width=400&text=Network+Switch', 'networking', 'ProNetwork', NULL, 4.7, 92, 
ARRAY['24 منفذ جيجابت', 'إدارة ذكية', 'توفير الطاقة', 'مراقبة الشبكة', 'تصميم معدني'], 
'{"المنافذ": "24 x Gigabit", "السرعة": "48 Gbps", "الذاكرة": "512 MB", "الطاقة": "توفير ذكي", "التركيب": "رف 19 بوصة"}'::jsonb, 
true, 12),

('كاميرا IP للشبكة', 'كاميرا مراقبة شبكية عالية الدقة مع تسجيل مستمر', 549.00, 699.00, '/placeholder.svg?height=400&width=400&text=IP+Camera', 'networking', 'NetCam', NULL, 4.3, 145, 
ARRAY['دقة Full HD', 'تسجيل مستمر', 'كشف الحركة', 'رؤية ليلية', 'مقاومة الطقس'], 
'{"الدقة": "1920x1080", "العدسة": "3.6mm", "الرؤية الليلية": "20 متر", "التخزين": "NVR + بطاقة SD", "الحماية": "IP66"}'::jsonb, 
true, 28),

-- Computers
('لابتوب جيمنج عالي الأداء', 'لابتوب للألعاب مع معالج قوي وكرت رسوميات متطور', 4999.00, 5999.00, '/placeholder.svg?height=400&width=400&text=Gaming+Laptop', 'computers', 'GameMaster', 'خصم 17%', 4.8, 167, 
ARRAY['معالج Intel i7', 'كرت رسوميات RTX', 'ذاكرة 32GB', 'شاشة 144Hz', 'تبريد متطور'], 
'{"المعالج": "Intel Core i7-12700H", "الرسوميات": "RTX 4060 8GB", "الذاكرة": "32GB DDR5", "التخزين": "1TB NVMe SSD", "الشاشة": "15.6 بوصة 144Hz"}'::jsonb, 
true, 8),

('حاسوب مكتبي للتصميم', 'حاسوب مكتبي قوي مخصص للتصميم والمونتاج الاحترافي', 6999.00, NULL, '/placeholder.svg?height=400&width=400&text=Design+PC', 'computers', 'CreativePro', 'الأكثر مبيعاً', 4.9, 89, 
ARRAY['معالج AMD Ryzen 9', 'كرت رسوميات احترافي', 'ذاكرة 64GB', 'تخزين سريع', 'تبريد مائي'], 
'{"المعالج": "AMD Ryzen 9 7900X", "الرسوميات": "RTX 4080 16GB", "الذاكرة": "64GB DDR5", "التخزين": "2TB NVMe SSD", "التبريد": "مائي AIO"}'::jsonb, 
true, 5),

('شاشة 4K للمحترفين', 'شاشة عرض احترافية بدقة 4K ودعم HDR للمصممين', 2299.00, 2799.00, '/placeholder.svg?height=400&width=400&text=4K+Monitor', 'computers', 'DisplayPro', NULL, 4.6, 134, 
ARRAY['دقة 4K UHD', 'دعم HDR10', 'ألوان دقيقة 99%', 'منافذ متعددة', 'حامل قابل للتعديل'], 
'{"الحجم": "27 بوصة", "الدقة": "3840x2160", "الألوان": "99% sRGB", "التحديث": "60Hz", "المنافذ": "USB-C, HDMI, DP"}'::jsonb, 
true, 15),

('لوحة مفاتيح ميكانيكية', 'لوحة مفاتيح ميكانيكية للألعاب مع إضاءة RGB', 449.00, NULL, '/placeholder.svg?height=400&width=400&text=Mechanical+Keyboard', 'computers', 'KeyMaster', 'جديد', 4.7, 198, 
ARRAY['مفاتيح ميكانيكية', 'إضاءة RGB', 'مقاومة الماء', 'مفاتيح قابلة للبرمجة', 'تصميم متين'], 
'{"المفاتيح": "Cherry MX Blue", "الإضاءة": "RGB 16.7 مليون لون", "الاتصال": "USB-C", "البرمجة": "تطبيق مخصص", "الضمان": "5 سنوات"}'::jsonb, 
true, 40),

-- Smartphones
('هاتف ذكي متطور 5G', 'هاتف ذكي بأحدث التقنيات وشبكة 5G وكاميرا احترافية', 3299.00, 3799.00, '/placeholder.svg?height=400&width=400&text=5G+Smartphone', 'smartphones', 'TechPhone', 'خصم 13%', 4.8, 312, 
ARRAY['شبكة 5G', 'كاميرا 108MP', 'شاشة AMOLED', 'شحن سريع 120W', 'مقاوم للماء'], 
'{"الشاشة": "6.7 بوصة AMOLED", "المعالج": "Snapdragon 8 Gen 2", "الذاكرة": "12GB + 256GB", "الكاميرا": "108MP + 50MP + 12MP", "البطارية": "5000mAh"}'::jsonb, 
true, 22),

('ساعة ذكية رياضية', 'ساعة ذكية متطورة لتتبع اللياقة والصحة مع GPS', 899.00, NULL, '/placeholder.svg?height=400&width=400&text=Smart+Watch', 'smartphones', 'FitTech', 'الأكثر مبيعاً', 4.5, 267, 
ARRAY['تتبع اللياقة', 'GPS مدمج', 'مقاوم للماء', 'بطارية 7 أيام', 'مراقبة الصحة'], 
'{"الشاشة": "1.4 بوصة AMOLED", "البطارية": "7 أيام", "المقاومة": "5ATM", "الاستشعار": "نبضات + أكسجين", "التطبيقات": "100+ تطبيق"}'::jsonb, 
true, 45),

('سماعات لاسلكية متطورة', 'سماعات لاسلكية بتقنية إلغاء الضوضاء وجودة صوت عالية', 649.00, 799.00, '/placeholder.svg?height=400&width=400&text=Wireless+Headphones', 'smartphones', 'AudioPro', NULL, 4.7, 189, 
ARRAY['إلغاء الضوضاء النشط', 'جودة صوت Hi-Fi', 'بطارية 30 ساعة', 'شحن سريع', 'مقاوم للعرق'], 
'{"البطارية": "30 ساعة", "الشحن": "USB-C سريع", "المقاومة": "IPX4", "التردد": "20Hz-40kHz", "الاتصال": "Bluetooth 5.3"}'::jsonb, 
true, 60),

('شاحن لاسلكي سريع', 'شاحن لاسلكي متطور بتقنية الشحن السريع وحماية متقدمة', 199.00, NULL, '/placeholder.svg?height=400&width=400&text=Wireless+Charger', 'smartphones', 'ChargeFast', 'جديد', 4.4, 156, 
ARRAY['شحن سريع 15W', 'حماية من الحرارة', 'متوافق مع جميع الهواتف', 'مؤشر LED', 'تصميم أنيق'], 
'{"القوة": "15W سريع", "التوافق": "Qi معتمد", "الحماية": "حرارة + جهد", "المؤشر": "LED ذكي", "المادة": "ألومنيوم + زجاج"}'::jsonb, 
true, 80)
ON CONFLICT DO NOTHING;

-- Insert initial site settings
INSERT INTO site_settings (id, hero_title, hero_subtitle, featured_section_title, featured_section_subtitle) VALUES 
(1, 'مرحباً بكم في EASYoft', 'حلول تقنية متطورة لحياة أكثر أماناً وراحة', 'المنتجات المميزة', 'اكتشف أحدث منتجاتنا التقنية عالية الجودة')
ON CONFLICT (id) DO NOTHING;

-- Insert contact info
INSERT INTO contact_info (id, phone, email, address, working_hours) VALUES 
(1, '+966 50 123 4567', 'info@easyoft.com', 'الرياض، المملكة العربية السعودية', 'الأحد - الخميس: 9:00 ص - 6:00 م')
ON CONFLICT (id) DO NOTHING;

-- Insert about settings
INSERT INTO about_settings (id) VALUES (1) ON CONFLICT (id) DO NOTHING;

-- Insert contact settings
INSERT INTO contact_settings (id) VALUES (1) ON CONFLICT (id) DO NOTHING;

-- Update categories product count
UPDATE categories SET product_count = (
    SELECT COUNT(*) FROM products WHERE products.category = categories.slug
);
