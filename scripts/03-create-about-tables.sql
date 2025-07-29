-- Create about_page table for about page settings
CREATE TABLE IF NOT EXISTS about_page (
    id SERIAL PRIMARY KEY,
    hero_title VARCHAR(255) DEFAULT 'من نحن',
    hero_subtitle VARCHAR(255) DEFAULT 'نحن فريق متخصص في حلول الأمان والتكنولوجيا الذكية',
    story_title VARCHAR(255) DEFAULT 'قصتنا',
    story_content TEXT DEFAULT 'بدأت رحلتنا في عالم التكنولوجيا والأمان من رؤية واضحة: توفير حلول أمان متطورة وموثوقة تحمي ما يهمك أكثر.',
    story_content_2 TEXT DEFAULT 'نحن نؤمن بأن الأمان ليس مجرد منتج، بل هو راحة بال وثقة في المستقبل.',
    mission_title VARCHAR(255) DEFAULT 'مهمتنا',
    mission_content TEXT DEFAULT 'نسعى لتوفير أحدث حلول الأمان والتكنولوجيا الذكية بأعلى معايير الجودة والموثوقية.',
    vision_title VARCHAR(255) DEFAULT 'رؤيتنا',
    vision_content TEXT DEFAULT 'أن نكون الشركة الرائدة في مجال حلول الأمان والتكنولوجيا الذكية في المنطقة.',
    values_title VARCHAR(255) DEFAULT 'قيمنا',
    team_title VARCHAR(255) DEFAULT 'فريقنا',
    stats_title VARCHAR(255) DEFAULT 'إنجازاتنا',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create team_members table
CREATE TABLE IF NOT EXISTS team_members (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(255) NOT NULL,
    image TEXT,
    bio TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create services table
CREATE TABLE IF NOT EXISTS services (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    icon VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create stats table
CREATE TABLE IF NOT EXISTS stats (
    id SERIAL PRIMARY KEY,
    number VARCHAR(50) NOT NULL,
    label VARCHAR(255) NOT NULL,
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

-- Insert default data
INSERT INTO about_page (id) VALUES (1) ON CONFLICT (id) DO NOTHING;

-- Insert default team members
INSERT INTO team_members (name, role, bio) VALUES 
('أحمد محمد', 'المدير التنفيذي', 'خبرة أكثر من 15 عاماً في مجال التكنولوجيا والأمان'),
('سارة أحمد', 'مديرة التطوير', 'متخصصة في تطوير الحلول التقنية المبتكرة'),
('محمد علي', 'مهندس الأنظمة', 'خبير في تصميم وتنفيذ أنظمة الأمان المتطورة')
ON CONFLICT DO NOTHING;

-- Insert default services
INSERT INTO services (title, description, icon) VALUES 
('أنظمة المراقبة', 'تركيب وصيانة أنظمة المراقبة المتطورة', 'Camera'),
('أنظمة الإنذار', 'حلول الإنذار الذكية للحماية الشاملة', 'Shield'),
('الأقفال الذكية', 'أقفال إلكترونية متطورة للأمان العالي', 'Lock'),
('المنازل الذكية', 'حلول التحكم الذكي للمنازل العصرية', 'Home')
ON CONFLICT DO NOTHING;

-- Insert default stats
INSERT INTO stats (number, label) VALUES 
('500+', 'عميل راضي'),
('1000+', 'مشروع مكتمل'),
('24/7', 'دعم فني'),
('15+', 'سنة خبرة')
ON CONFLICT DO NOTHING;

-- Insert default FAQs
INSERT INTO faqs (question, answer) VALUES 
('ما هي مدة الضمان على المنتجات؟', 'نقدم ضمان شامل لمدة سنتين على جميع المنتجات مع خدمة صيانة مجانية.'),
('هل تقدمون خدمة التركيب؟', 'نعم، لدينا فريق متخصص لتركيب وتشغيل جميع الأنظمة بأعلى معايير الجودة.'),
('كم يستغرق وقت التسليم؟', 'عادة ما يتم التسليم خلال 3-5 أيام عمل داخل المدن الرئيسية.')
ON CONFLICT DO NOTHING;
