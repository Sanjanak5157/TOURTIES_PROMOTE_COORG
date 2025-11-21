CREATE DATABASE IF NOT EXISTS tourist_app;
USE tourist_app;

CREATE TABLE IF NOT EXISTS places (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(200) NOT NULL,
  description TEXT,
  lat DECIMAL(9,6),
  lng DECIMAL(9,6),
  default_photo VARCHAR(500)
);

CREATE TABLE IF NOT EXISTS hotels (
  id INT AUTO_INCREMENT PRIMARY KEY,
  place_id INT NOT NULL,
  name VARCHAR(200) NOT NULL,
  type ENUM('hotel','lodge','homestay') DEFAULT 'hotel',
  price_range ENUM('cheap','medium','expensive') DEFAULT 'medium',
  lat DECIMAL(9,6),
  lng DECIMAL(9,6),
  FOREIGN KEY (place_id) REFERENCES places(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS foods (
  id INT AUTO_INCREMENT PRIMARY KEY,
  hotel_id INT NOT NULL,
  name VARCHAR(200) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  FOREIGN KEY (hotel_id) REFERENCES hotels(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS photos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  place_id INT,
  hotel_id INT,
  filename VARCHAR(500),
  uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO places (name, description, lat, lng, default_photo) VALUES
('Abbey Falls', 'A scenic waterfall nestled amidst coffee and spice plantations, popular for photography.', NULL, NULL, 'images/abbey_falls.jpg'),
('Raja Seat', 'A beautiful garden and viewpoint where kings once watched sunsets, offering panoramic valley views.', NULL, NULL, 'images/raja_seat.jpg'),
('Namdroling Monastery (Golden Temple)', 'The second largest Tibetan settlement in India, known for its magnificent Buddhist monastery and golden statues.', NULL, NULL, 'images/golden_temple.jpg'),
('Dubare Elephant Camp', 'An interactive camp where visitors can bathe and feed elephants under the guidance of naturalists.', NULL, NULL, 'images/dubare_camp.jpg'),
('Talakaveri', 'The revered origin point of the River Kaveri, featuring a temple and scenic views from the peak.', NULL, NULL, 'images/talakaveri.jpg'),
('Madikeri Fort', 'A historic 17th-century fort housing a palace, a museum, and a clock tower, reflecting Gothic and Islamic architecture.', NULL, NULL, 'images/madikeri_fort.jpg'),
('Iruppu Falls', 'A stunning, spiritual waterfall also known as Lakshmana Tirtha Falls, located amidst dense forests.', NULL, NULL, 'images/iruppu_falls.jpg'),
('Tadiandamol Peak', 'The highest peak in Coorg, offering a challenging yet rewarding trek with breathtaking views of the Shola forests.', NULL, NULL, 'images/tadiandamol_peak.jpg'),
('Mandalpatti Viewpoint', 'A unique vantage point overlooking the misty, rolling hills of the Pushpagiri forests, ideal for nature photography.', NULL, NULL, 'images/mandalpatti_view.jpg'),
('Honnamana Kere Lake', 'The largest natural lake in the region, surrounded by mountains and coffee plantations, with a nearby temple dedicated to Goddess Honnamma.', NULL, NULL, 'images/honnamana_kere.jpg');

SELECT * FROM places;

-- Create reviews table
CREATE TABLE IF NOT EXISTS reviews (
    id INT AUTO_INCREMENT PRIMARY KEY,
    spot_name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    image_path VARCHAR(500) NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Optional: Insert some sample reviews
INSERT INTO reviews (spot_name, description, image_path) VALUES 
('Abbey Falls', 'Beautiful waterfall with amazing scenery. Perfect for photography!', 'abbey-falls.jpg'),
('Raja Seat', 'Stunning sunset view point. Must visit in the evening.', 'raja-seat.jpg');

SELECT id, name FROM places 
WHERE name IN (
    'Namdroling Monastery (Golden Temple)',
    'Dubare Elephant Camp',
    'Talakaveri', 
    'Madikeri Fort',
    'Iruppu Falls',
    'Tadiandamol Peak',
    'Mandalpatti Viewpoint',
    'Honnamana Kere Lake'
);
-- STEP 1: Disable safe mode
SET SQL_SAFE_UPDATES = 0;

-- STEP 2: Delete ALL records from places table (complete clean slate)
DELETE FROM places;

-- STEP 3: Reset auto-increment counter
ALTER TABLE places AUTO_INCREMENT = 1;

-- STEP 4: Insert ONLY ONE record of Abbey Falls and Raja Seat
INSERT INTO places (name, description, lat, lng, default_photo) VALUES
('Abbey Falls', 'A scenic waterfall nestled amidst coffee and spice plantations, popular for photography.', NULL, NULL, 'images/abbey_falls.jpg'),
('Raja Seat', 'A beautiful garden and viewpoint where kings once watched sunsets, offering panoramic valley views.', NULL, NULL, 'images/raja_seat.jpg');

-- STEP 5: Re-enable safe mode
SET SQL_SAFE_UPDATES = 1;

-- STEP 6: Verify the result - should show only 2 records
SELECT * FROM places ORDER BY id;

INSERT INTO places (name, description, lat, lng, default_photo) VALUES
('Chiklihole Reservoir', 'A scenic reservoir surrounded by lush greenery, perfect for nature photography and peaceful walks.', NULL, NULL, 'images/chiklihole_reservoir.jpg'),
('Nagarhole National Park', 'A protected wildlife sanctuary known for its diverse flora and fauna, offering safari experiences.', NULL, NULL, 'images/nagarhole_national_park.jpg'),
('Golden Temple', 'The second largest Tibetan settlement in India, known for its magnificent Buddhist monastery and golden statues.', NULL, NULL, 'images/golden_temple.jpg'),
('Dubare Elephant Camp', 'An interactive camp where visitors can bathe and feed elephants under the guidance of naturalists.', NULL, NULL, 'images/dubare_camp.jpg'),
('Talakaveri', 'The revered origin point of the River Kaveri, featuring a temple and scenic views from the peak.', NULL, NULL, 'images/talakaveri.jpg'),
('Madikeri Fort', 'A historic 17th-century fort housing a palace, a museum, and a clock tower, reflecting Gothic and Islamic architecture.', NULL, NULL, 'images/madikeri_fort.jpg'),
('Iruppu Falls', 'A stunning, spiritual waterfall also known as Lakshmana Tirtha Falls, located amidst dense forests.', NULL, NULL, 'images/iruppu_falls.jpg'),
('Tadiandamol Peak', 'The highest peak in Coorg, offering a challenging yet rewarding trek with breathtaking views of the Shola forests.', NULL, NULL, 'images/tadiandamol_peak.jpg'),
('Mandalpatti Viewpoint', 'A unique vantage point overlooking the misty, rolling hills of the Pushpagiri forests, ideal for nature photography.', NULL, NULL, 'images/mandalpatti_view.jpg'),
('Honnamana Kere Lake', 'The largest natural lake in the region, surrounded by mountains and coffee plantations, with a nearby temple dedicated to Goddess Honnamma.', NULL, NULL, 'images/honnamana_kere.jpg');
