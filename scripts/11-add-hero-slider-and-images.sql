-- إنشاء جدول الصور المرفوعة
CREATE TABLE IF NOT EXISTS uploaded_images (
  id SERIAL PRIMARY KEY,
  filename VARCHAR(255) NOT NULL,
  original_name VARCHAR(255) NOT NULL,
  file_path VARCHAR(500) NOT NULL,
  file_size INTEGER,
  mime_type VARCHAR(100),
  alt_text TEXT,
  category VARCHAR(100) DEFAULT 'general',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- إنشاء جدول شرائح الهيرو
CREATE TABLE IF NOT EXISTS hero_slides (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  subtitle VARCHAR(255),
  description TEXT,
  image_url VARCHAR(500) NOT NULL,
  button_text VARCHAR(100),
  button_link VARCHAR(255),
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- إدراج بيانات تجريبية لشرائح الهيرو
INSERT INTO hero_slides (title, subtitle, description, image_url, button_text, button_link, is_active, sort_order) VALUES
('حلول الأمان المتقدمة', 'تقنيات ذكية لحماية شاملة', 'نقدم أحدث أنظمة الأمان والمراقبة لحماية منزلك وعملك بأعلى معايير الجودة والتقنية', '/placeholder.svg?height=600&width=1200&text=Security+Solutions', 'تصفح المنتجات', '/products', true, 1),
('كاميرات المراقبة الذكية', 'مراقبة عالية الدقة على مدار الساعة', 'كاميرات بدقة 4K مع الرؤية الليلية والذكاء الاصطناعي لحماية أفضل', '/placeholder.svg?height=600&width=1200&text=Smart+Cameras', 'اكتشف المزيد', '/category/cameras', true, 2),
('أنظمة الإنذار المتطورة', 'حماية فورية ضد التسلل والحرائق', 'أنظمة إنذار ذكية مع إشعارات فورية على هاتفك المحمول', '/placeholder.svg?height=600&width=1200&text=Alarm+Systems', 'اطلب الآن', '/contact', true, 3);

-- إضافة عمود local_image_path للجداول الموجودة إذا لم يكن موجوداً
ALTER TABLE products ADD COLUMN IF NOT EXISTS local_image_path VARCHAR(500);
ALTER TABLE categories ADD COLUMN IF NOT EXISTS local_image_path VARCHAR(500);
ALTER TABLE team_members ADD COLUMN IF NOT EXISTS local_image_path VARCHAR(500);

-- إنشاء فهارس لتحسين الأداء
CREATE INDEX IF NOT EXISTS idx_hero_slides_active ON hero_slides(is_active, sort_order);
CREATE INDEX IF NOT EXISTS idx_uploaded_images_category ON uploaded_images(category);
CREATE INDEX IF NOT EXISTS idx_products_local_image ON products(local_image_path);
CREATE INDEX IF NOT EXISTS idx_categories_local_image ON categories(local_image_path);
