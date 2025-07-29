-- إنشاء جدول إعدادات صفحة "من نحن"
CREATE TABLE IF NOT EXISTS about_settings (
    id SERIAL PRIMARY KEY,
    hero_title VARCHAR(255) NOT NULL DEFAULT 'من نحن',
    hero_subtitle TEXT,
    hero_description TEXT,
    mission_title VARCHAR(255) DEFAULT 'رسالتنا',
    mission_content TEXT,
    vision_title VARCHAR(255) DEFAULT 'رؤيتنا',
    vision_content TEXT,
    values_title VARCHAR(255) DEFAULT 'قيمنا',
    values_content TEXT,
    team_title VARCHAR(255) DEFAULT 'فريقنا',
    team_description TEXT,
    experience_years INTEGER DEFAULT 10,
    clients_count INTEGER DEFAULT 500,
    projects_count INTEGER DEFAULT 1000,
    satisfaction_rate INTEGER DEFAULT 98,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- إنشاء جدول أعضاء الفريق
CREATE TABLE IF NOT EXISTS team_members (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    position VARCHAR(255) NOT NULL,
    bio TEXT,
    image_url VARCHAR(500),
    linkedin_url VARCHAR(500),
    twitter_url VARCHAR(500),
    email VARCHAR(255),
    display_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- إنشاء جدول إعدادات صفحة التواصل
CREATE TABLE IF NOT EXISTS contact_settings (
    id SERIAL PRIMARY KEY,
    hero_title VARCHAR(255) NOT NULL DEFAULT 'تواصل معنا',
    hero_subtitle TEXT,
    hero_description TEXT,
    form_title VARCHAR(255) DEFAULT 'أرسل لنا رسالة',
    form_description TEXT,
    info_title VARCHAR(255) DEFAULT 'معلومات التواصل',
    info_description TEXT,
    map_title VARCHAR(255) DEFAULT 'موقعنا',
    map_embed_url TEXT,
    office_hours VARCHAR(255) DEFAULT 'الأحد - الخميس: 9:00 ص - 6:00 م',
    response_time VARCHAR(255) DEFAULT 'نرد خلال 24 ساعة',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- إنشاء جدول معلومات التواصل
CREATE TABLE IF NOT EXISTS contact_info (
    id SERIAL PRIMARY KEY,
    phone VARCHAR(50),
    email VARCHAR(255),
    address TEXT,
    whatsapp VARCHAR(50),
    telegram VARCHAR(50),
    website VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- إنشاء جدول إعدادات الفوتر
CREATE TABLE IF NOT EXISTS footer_settings (
    id SERIAL PRIMARY KEY,
    company_name VARCHAR(255) DEFAULT 'EazySoft',
    company_description TEXT,
    phone VARCHAR(50),
    email VARCHAR(255),
    address TEXT,
    facebook_url VARCHAR(500),
    twitter_url VARCHAR(500),
    instagram_url VARCHAR(500),
    linkedin_url VARCHAR(500),
    youtube_url VARCHAR(500),
    copyright_text TEXT DEFAULT '© 2024 EazySoft. جميع الحقوق محفوظة.',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- إدراج البيانات الافتراضية
INSERT INTO about_settings (
    hero_title, hero_subtitle, hero_description,
    mission_title, mission_content,
    vision_title, vision_content,
    values_title, values_content,
    team_title, team_description,
    experience_years, clients_count, projects_count, satisfaction_rate
) VALUES (
    'من نحن',
    'رواد في مجال الأمان والتكنولوجيا الذكية',
    'نحن شركة رائدة في مجال حلول الأمان والتكنولوجيا الذكية، نقدم أحدث الأنظمة والحلول المبتكرة للمنازل والشركات في المملكة العربية السعودية.',
    'رسالتنا',
    'نسعى لتوفير أحدث حلول الأمان والتكنولوجيا الذكية بأعلى معايير الجودة والموثوقية، مع تقديم خدمة عملاء متميزة تلبي احتياجات عملائنا وتتجاوز توقعاتهم.',
    'رؤيتنا',
    'أن نكون الشركة الرائدة في مجال حلول الأمان والتكنولوجيا الذكية في المنطقة، ونساهم في بناء مجتمع أكثر أماناً وذكاءً من خلال تقنياتنا المتطورة.',
    'قيمنا',
    'الجودة والموثوقية في جميع منتجاتنا وخدماتنا، الابتكار المستمر لمواكبة أحدث التطورات التقنية، خدمة العملاء المتميزة والدعم الفني المتواصل، الشفافية والصدق في جميع تعاملاتنا.',
    'فريقنا المتخصص',
    'يضم فريقنا نخبة من المهندسين والفنيين المتخصصين في مجال الأمان والتكنولوجيا الذكية، مع خبرة تزيد عن 10 سنوات في هذا المجال.',
    10, 500, 1000, 98
) ON CONFLICT DO NOTHING;

INSERT INTO team_members (name, position, bio, display_order) VALUES
('أحمد محمد', 'مدير عام', 'خبرة أكثر من 15 سنة في مجال الأمان والتكنولوجيا', 1),
('سارة أحمد', 'مديرة التسويق', 'متخصصة في التسويق الرقمي وإدارة العلامات التجارية', 2),
('محمد علي', 'مهندس أنظمة', 'خبير في تصميم وتنفيذ أنظمة الأمان المتطورة', 3),
('فاطمة خالد', 'مديرة خدمة العملاء', 'متخصصة في إدارة علاقات العملاء والدعم الفني', 4)
ON CONFLICT DO NOTHING;

INSERT INTO contact_settings (
    hero_title, hero_subtitle, hero_description,
    form_title, form_description,
    info_title, info_description,
    map_title, office_hours, response_time
) VALUES (
    'تواصل معنا',
    'نحن هنا لمساعدتك',
    'لديك استفسار أو تحتاج لمساعدة؟ فريقنا المتخصص جاهز لخدمتك على مدار الساعة. تواصل معنا الآن واحصل على استشارة مجانية.',
    'أرسل لنا رسالة',
    'املأ النموذج أدناه وسنتواصل معك في أقرب وقت ممكن',
    'معلومات التواصل',
    'يمكنك التواصل معنا من خلال الطرق التالية',
    'موقعنا على الخريطة',
    'الأحد - الخميس: 9:00 ص - 6:00 م',
    'نرد على جميع الاستفسارات خلال 24 ساعة'
) ON CONFLICT DO NOTHING;

INSERT INTO contact_info (phone, email, address, whatsapp) VALUES
('+966 50 123 4567', 'info@easyoft.com', 'الرياض، حي الملك فهد، المملكة العربية السعودية', '+966 50 123 4567')
ON CONFLICT DO NOTHING;

INSERT INTO footer_settings (
    company_name, company_description,
    phone, email, address,
    facebook_url, twitter_url, instagram_url, linkedin_url,
    copyright_text
) VALUES (
    'EazySoft',
    'نقدم أحدث حلول الأمان والتكنولوجيا الذكية للمنازل والشركات بأعلى معايير الجودة والموثوقية.',
    '+966 50 123 4567',
    'info@easyoft.com',
    'الرياض، حي الملك فهد، المملكة العربية السعودية',
    'https://facebook.com/easyoft',
    'https://twitter.com/easyoft',
    'https://instagram.com/easyoft',
    'https://linkedin.com/company/easyoft',
    '© 2024 EazySoft. جميع الحقوق محفوظة. تم التطوير بواسطة فريق EazySoft.'
) ON CONFLICT DO NOTHING;
