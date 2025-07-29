-- Create contact_page table for contact page settings
CREATE TABLE IF NOT EXISTS contact_page (
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

-- Create contact_info table for contact information
CREATE TABLE IF NOT EXISTS contact_info (
    id SERIAL PRIMARY KEY,
    phone VARCHAR(50) DEFAULT '+966 50 123 4567',
    email VARCHAR(100) DEFAULT 'info@easyoft.com',
    address TEXT DEFAULT 'الرياض، المملكة العربية السعودية',
    whatsapp VARCHAR(50) DEFAULT '+966 50 123 4567',
    telegram VARCHAR(50) DEFAULT '@easyoft',
    location_url TEXT DEFAULT '',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert default data
INSERT INTO contact_page (id) VALUES (1) ON CONFLICT (id) DO NOTHING;
INSERT INTO contact_info (id) VALUES (1) ON CONFLICT (id) DO NOTHING;
