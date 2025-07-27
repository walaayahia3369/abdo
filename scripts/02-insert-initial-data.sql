-- Insert default products
INSERT INTO products (name, price, original_price, image, category, brand, rating, reviews, features, in_stock, badge, description, specifications, is_featured) VALUES
('جهاز بصمة ZKTeco F18 Pro', 1250, 1450, '/placeholder.svg?height=300&width=300&text=جهاز+بصمة', 'أجهزة البصمة', 'ZKTeco', 4.8, 124, ARRAY['تعرف بيومتري دقيق', 'ذاكرة 3000 بصمة', 'شاشة ملونة'], true, 'الأكثر مبيعاً', 'جهاز بصمة متطور يوفر أعلى مستويات الأمان مع تقنية التعرف البيومتري الدقيق', '{"السعة": "3000 بصمة", "الشاشة": "2.8 بوصة ملونة", "التوصيل": "TCP/IP, USB", "الطاقة": "12V DC", "درجة الحرارة": "-10°C إلى +60°C"}', true),

('بوابة إلكترونية HID ProxPoint Plus', 3500, 3800, '/placeholder.svg?height=300&width=300&text=بوابة+إلكترونية', 'البوابات الإلكترونية', 'HID', 4.9, 89, ARRAY['تحكم متقدم بالوصول', 'مقاوم للعوامل الجوية', 'تشفير عالي'], true, 'جديد', 'بوابة إلكترونية ذكية مع نظام تحكم متقدم بالوصول وحماية عالية المستوى', '{"نوع القارئ": "Proximity", "المدى": "حتى 15 سم", "التشفير": "128-bit", "المقاومة": "IP65", "التشغيل": "12-24V DC"}', true),

('كاميرا مراقبة 4K Hikvision', 850, 950, '/placeholder.svg?height=300&width=300&text=كاميرا+مراقبة', 'كاميرات المراقبة', 'Hikvision', 4.7, 203, ARRAY['دقة 4K', 'رؤية ليلية', 'مقاومة للماء IP67'], true, null, 'كاميرا مراقبة احترافية بدقة 4K مع رؤية ليلية متقدمة ومقاومة للعوامل الجوية', '{"الدقة": "4K (3840×2160)", "العدسة": "2.8-12mm", "الرؤية الليلية": "حتى 30 متر", "المقاومة": "IP67", "التسجيل": "H.265+/H.264+"}', true),

('نظام منزل ذكي SmartLife Pro', 5200, 5800, '/placeholder.svg?height=300&width=300&text=منزل+ذكي', 'المنازل الذكية', 'SmartLife', 4.9, 67, ARRAY['تحكم كامل بالإضاءة', 'إدارة التكييف', 'نظام أمان متكامل'], true, 'مميز', 'نظام منزل ذكي متكامل يوفر التحكم الكامل في جميع أجهزة المنزل', '{"المكونات": "Hub + 10 أجهزة ذكية", "التوصيل": "WiFi, Zigbee, Bluetooth", "التطبيق": "SmartLife App", "التوافق": "Alexa, Google Home", "الضمان": "سنتان"}', true),

('جهاز بصمة ZKTeco K40 Pro', 890, 1050, '/placeholder.svg?height=300&width=300&text=جهاز+بصمة+K40', 'أجهزة البصمة', 'ZKTeco', 4.6, 156, ARRAY['شاشة لمس 2.8 بوصة', 'ذاكرة 1000 بصمة', 'بطارية احتياطية'], true, null, 'جهاز بصمة عملي مع شاشة لمس وبطارية احتياطية', '{"السعة": "1000 بصمة", "الشاشة": "2.8 بوصة لمس", "البطارية": "احتياطية 4 ساعات", "التوصيل": "TCP/IP, USB", "الوزن": "0.8 كجم"}', false),

('كاميرا PTZ دوارة Dahua', 1450, 1650, '/placeholder.svg?height=300&width=300&text=كاميرا+PTZ', 'كاميرات المراقبة', 'Dahua', 4.8, 91, ARRAY['دوران 360 درجة', 'زوم بصري 25x', 'تتبع ذكي'], false, 'متقدم', 'كاميرا PTZ متطورة مع إمكانيات دوران وزوم متقدمة', '{"الدوران": "360° أفقي، 90° عمودي", "الزوم": "25x بصري", "الدقة": "2MP Full HD", "الرؤية الليلية": "حتى 100 متر", "التحكم": "عن بعد"}', false);

-- Insert default categories
INSERT INTO categories (name, description, image, slug, product_count) VALUES
('أجهزة البصمة', 'حلول أمنية عالية المستوى بتقنية التعرف البيومتري الدقيق', '/placeholder.svg?height=200&width=300&text=أجهزة+البصمة', 'fingerprint-devices', 15),
('البوابات الإلكترونية', 'حلول آمنة وفعالة لتنظيم الدخول والخروج', '/placeholder.svg?height=200&width=300&text=البوابات+الإلكترونية', 'electronic-gates', 12),
('كاميرات المراقبة', 'أنظمة مراقبة متقدمة بأحدث التقنيات', '/placeholder.svg?height=200&width=300&text=كاميرات+المراقبة', 'surveillance-cameras', 25),
('المنازل الذكية', 'تحويل المنازل إلى بيئات ذكية متكاملة', '/placeholder.svg?height=200&width=300&text=المنازل+الذكية', 'smart-homes', 18);

-- Insert default user
INSERT INTO users (username, password, role) VALUES
('admin', 'admin123', 'admin');

-- Insert default site settings
INSERT INTO site_settings (hero_title, hero_subtitle, hero_background_image, featured_section_title, featured_section_subtitle) VALUES
('حلول الأمان المتقدمة', 'نقدم أحدث تقنيات الأمان والمنازل الذكية لحماية ممتلكاتك وتوفير الراحة والأمان', '/placeholder.svg?height=600&width=1200&text=خلفية+الأمان', 'المنتجات المميزة', 'أحدث وأفضل منتجاتنا في مجال الأمان والتقنيات الذكية');

-- Insert default contact info
INSERT INTO contact_info (phone, email, address, working_hours, whatsapp, facebook, twitter, instagram) VALUES
('+966 50 123 4567', 'info@easyoft.com', 'الرياض، المملكة العربية السعودية', 'السبت - الخميس: 9:00 ص - 6:00 م', '+966 50 123 4567', 'https://facebook.com/easyoft', 'https://twitter.com/easyoft', 'https://instagram.com/easyoft');
