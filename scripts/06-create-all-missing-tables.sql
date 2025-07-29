-- إنشاء جدول إعدادات الاتصال
DROP TABLE IF EXISTS contact_settings CASCADE;
CREATE TABLE contact_settings (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL DEFAULT 'تواصل معنا',
    description TEXT DEFAULT 'نحن هنا لمساعدتك في أي وقت',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- إدراج البيانات الافتراضية لإعدادات الاتصال
INSERT INTO contact_settings (title, description) VALUES 
('تواصل معنا', 'نحن هنا لمساعدتك في أي وقت. تواصل معنا للحصول على أفضل حلول الأمان والتكنولوجيا الذكية.');

-- إنشاء جدول معلومات الاتصال
DROP TABLE IF EXISTS contact_info CASCADE;
CREATE TABLE contact_info (
    id SERIAL PRIMARY KEY,
    type VARCHAR(50) NOT NULL,
    label VARCHAR(100) NOT NULL,
    value VARCHAR(255) NOT NULL,
    icon VARCHAR(50) DEFAULT 'info',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- إدراج البيانات الافتراضية لمعلومات الاتصال
INSERT INTO contact_info (type, label, value, icon) VALUES 
('phone', 'الهاتف', '+966 50 123 4567', 'phone'),
('email', 'البريد الإلكتروني', 'info@easyoft.com', 'mail'),
('address', 'العنوان', 'الرياض، المملكة العربية السعودية', 'map-pin'),
('whatsapp', 'واتساب', '+966 50 123 4567', 'message-circle');

-- إنشاء جدول إعدادات صفحة من نحن
DROP TABLE IF EXISTS about_settings CASCADE;
CREATE TABLE about_settings (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL DEFAULT 'من نحن',
    description TEXT,
    mission TEXT,
    vision TEXT,
    values TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- إدراج البيانات الافتراضية لإعدادات من نحن
INSERT INTO about_settings (title, description, mission, vision, values) VALUES 
('من نحن', 
'نحن شركة رائدة في مجال حلول الأمان والتكنولوجيا الذكية، نقدم أحدث التقنيات لحماية منازلكم وشركاتكم.',
'مهمتنا هي توفير أحدث تقنيات الأمان والحماية لعملائنا مع ضمان أعلى مستويات الجودة والخدمة.',
'رؤيتنا هي أن نكون الخيار الأول في المنطقة لحلول الأمان الذكية والتكنولوجيا المتطورة.',
'نقدر الجودة والابتكار وخدمة العملاء المتميزة والشفافية في التعامل.');

-- إنشاء جدول أعضاء الفريق
DROP TABLE IF EXISTS team_members CASCADE;
CREATE TABLE team_members (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    position VARCHAR(255) NOT NULL,
    bio TEXT,
    image VARCHAR(500) DEFAULT '/placeholder-user.jpg',
    linkedin VARCHAR(500) DEFAULT '#',
    twitter VARCHAR(500) DEFAULT '#',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- إدراج البيانات الافتراضية لأعضاء الفريق
INSERT INTO team_members (name, position, bio, image) VALUES 
('أحمد محمد علي', 'المدير التنفيذي', 'خبرة 15 عاماً في مجال التكنولوجيا والأمان، حاصل على شهادات دولية في أنظمة الأمان الذكية.', '/placeholder-user.jpg'),
('سارة أحمد', 'مديرة التطوير', 'متخصصة في تطوير الحلول التقنية المبتكرة مع خبرة 10 سنوات في مجال البرمجيات.', '/placeholder-user.jpg'),
('محمد حسن', 'مدير المبيعات', 'خبير في حلول الأمان التجارية مع سجل حافل في تحقيق أهداف المبيعات.', '/placeholder-user.jpg'),
('فاطمة علي', 'مديرة خدمة العملاء', 'متخصصة في تقديم أفضل خدمة عملاء وضمان رضا العملاء بنسبة 100%.', '/placeholder-user.jpg');

-- إنشاء جدول الخدمات
DROP TABLE IF EXISTS services CASCADE;
CREATE TABLE services (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    icon VARCHAR(50) DEFAULT 'service',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- إدراج البيانات الافتراضية للخدمات
INSERT INTO services (title, description, icon) VALUES 
('تركيب الأنظمة', 'تركيب احترافي لجميع أنظمة الأمان والمراقبة مع ضمان الجودة والأداء المثالي.', 'wrench'),
('الصيانة والدعم', 'خدمة صيانة دورية ودعم فني على مدار الساعة لضمان عمل الأنظمة بكفاءة عالية.', 'settings'),
('الاستشارات الأمنية', 'تقييم شامل للمخاطر الأمنية وتقديم الحلول المناسبة لكل عميل حسب احتياجاته.', 'shield'),
('التدريب والتأهيل', 'برامج تدريبية متخصصة لتأهيل العملاء على استخدام الأنظمة الأمنية بفعالية.', 'graduation-cap');

-- إنشاء جدول الإحصائيات
DROP TABLE IF EXISTS stats CASCADE;
CREATE TABLE stats (
    id SERIAL PRIMARY KEY,
    label VARCHAR(255) NOT NULL,
    value VARCHAR(100) NOT NULL,
    icon VARCHAR(50) DEFAULT 'trending-up',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- إدراج البيانات الافتراضية للإحصائيات
INSERT INTO stats (label, value, icon) VALUES 
('عملاء راضون', '500+', 'users'),
('مشاريع مكتملة', '300+', 'check-circle'),
('سنوات الخبرة', '15+', 'calendar'),
('فريق العمل', '25+', 'user-check');

-- إنشاء جدول الأسئلة الشائعة
DROP TABLE IF EXISTS faqs CASCADE;
CREATE TABLE faqs (
    id SERIAL PRIMARY KEY,
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- إدراج البيانات الافتراضية للأسئلة الشائعة
INSERT INTO faqs (question, answer) VALUES 
('ما هي مدة الضمان على المنتجات؟', 'نقدم ضمان شامل لمدة سنتين على جميع المنتجات مع خدمة صيانة مجانية خلال السنة الأولى.'),
('هل تقدمون خدمة التركيب؟', 'نعم، نقدم خدمة تركيب احترافية مع فريق متخصص وضمان على التركيب لمدة سنة كاملة.'),
('كيف يمكنني الحصول على استشارة أمنية؟', 'يمكنكم التواصل معنا عبر الهاتف أو البريد الإلكتروني لحجز موعد استشارة مجانية مع خبرائنا.'),
('هل تدعمون الصيانة الدورية؟', 'نعم، نقدم عقود صيانة دورية شاملة تضمن عمل الأنظمة بكفاءة عالية على مدار السنة.');

-- إنشاء جدول إعدادات الموقع العامة
DROP TABLE IF EXISTS site_settings CASCADE;
CREATE TABLE site_settings (
    id SERIAL PRIMARY KEY,
    key VARCHAR(100) UNIQUE NOT NULL,
    value TEXT,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- إدراج البيانات الافتراضية لإعدادات الموقع
INSERT INTO site_settings (key, value, description) VALUES 
('site_name', 'EazySoft', 'اسم الموقع'),
('site_description', 'حلول الأمان والتكنولوجيا الذكية', 'وصف الموقع'),
('contact_phone', '+966 50 123 4567', 'رقم الهاتف الرئيسي'),
('contact_email', 'info@easyoft.com', 'البريد الإلكتروني الرئيسي'),
('contact_address', 'الرياض، المملكة العربية السعودية', 'العنوان الرئيسي'),
('facebook_url', '#', 'رابط صفحة الفيسبوك'),
('twitter_url', '#', 'رابط صفحة تويتر'),
('instagram_url', '#', 'رابط صفحة الإنستغرام'),
('linkedin_url', '#', 'رابط صفحة لينكد إن');

-- إنشاء الفهارس لتحسين الأداء
CREATE INDEX idx_contact_info_type ON contact_info(type);
CREATE INDEX idx_team_members_created_at ON team_members(created_at);
CREATE INDEX idx_services_created_at ON services(created_at);
CREATE INDEX idx_stats_created_at ON stats(created_at);
CREATE INDEX idx_faqs_created_at ON faqs(created_at);
CREATE INDEX idx_site_settings_key ON site_settings(key);

-- إضافة تعليقات للجداول
COMMENT ON TABLE contact_settings IS 'إعدادات صفحة التواصل';
COMMENT ON TABLE contact_info IS 'معلومات التواصل المختلفة';
COMMENT ON TABLE about_settings IS 'إعدادات صفحة من نحن';
COMMENT ON TABLE team_members IS 'أعضاء فريق العمل';
COMMENT ON TABLE services IS 'الخدمات المقدمة';
COMMENT ON TABLE stats IS 'الإحصائيات والأرقام';
COMMENT ON TABLE faqs IS 'الأسئلة الشائعة';
COMMENT ON TABLE site_settings IS 'إعدادات الموقع العامة';
