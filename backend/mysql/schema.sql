CREATE TABLE IF NOT EXISTS Users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  surname VARCHAR(255),
  name VARCHAR(255),
  patronymic VARCHAR(255),
  birth_date DATE NOT NULL,
  role ENUM('admin', 'foreman', 'worker'),
  is_blocked BOOLEAN DEFAULT FALSE,
  password_hash VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS Objects (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255),
  description TEXT,
  created_by INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (created_by) REFERENCES Users(id)
);

CREATE TABLE IF NOT EXISTS UserObjects (
  user_id INT,
  object_id INT,
  PRIMARY KEY (user_id, object_id),
  FOREIGN KEY (user_id) REFERENCES Users(id),
  FOREIGN KEY (object_id) REFERENCES Objects(id)
);

CREATE TABLE IF NOT EXISTS History (
  id INT AUTO_INCREMENT PRIMARY KEY,
  entity_type VARCHAR(50),
  entity_id INT,
  action VARCHAR(255),
  user_id INT,
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
