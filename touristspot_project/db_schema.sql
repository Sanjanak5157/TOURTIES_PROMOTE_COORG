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
