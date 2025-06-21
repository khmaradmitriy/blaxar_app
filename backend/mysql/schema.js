const tables = {
  Users: `
    CREATE TABLE IF NOT EXISTS Users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      email VARCHAR(255) NOT NULL UNIQUE,
      surname VARCHAR(100),
      name VARCHAR(100),
      patronymic VARCHAR(100),
      birth_date DATE,
      role ENUM('admin', 'foreman', 'worker') NOT NULL,
      password_hash VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `,
  Objects: `
    CREATE TABLE IF NOT EXISTS Objects (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255),
      description TEXT,
      created_by INT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (created_by) REFERENCES Users(id)
    )
  `,
  UserObjects: `
    CREATE TABLE IF NOT EXISTS UserObjects (
      user_id INT,
      object_id INT,
      PRIMARY KEY (user_id, object_id),
      FOREIGN KEY (user_id) REFERENCES Users(id),
      FOREIGN KEY (object_id) REFERENCES Objects(id)
    )
  `,
History: `
  CREATE TABLE IF NOT EXISTS History (
    id INT AUTO_INCREMENT PRIMARY KEY,
    entity_type VARCHAR(50),
    entity_id INT,
    action VARCHAR(255),
    user_id INT,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )
`,
Tasks: `
  CREATE TABLE IF NOT EXISTS Tasks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    estimate_id INT NOT NULL,
    estimate_item_id INT NOT NULL,
    worker_id INT,
    quantity DECIMAL(10,2) NOT NULL,
    percent INT DEFAULT 100,
    comment TEXT,
    status ENUM('created', 'in_progress', 'on_review', 'approved', 'revision', 'paid') DEFAULT 'created',
    taken_by_worker BOOLEAN DEFAULT 0,
    refused_once BOOLEAN DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (estimate_id) REFERENCES Estimates(id),
    FOREIGN KEY (estimate_item_id) REFERENCES EstimateItems(id),
    FOREIGN KEY (worker_id) REFERENCES Users(id)
  )
`
,
Prices: `
  CREATE TABLE IF NOT EXISTS Prices (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    unit VARCHAR(50) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    category ENUM('работа', 'материал', 'логистика') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )
`,
EstimateItems: `
  CREATE TABLE IF NOT EXISTS EstimateItems (
    id INT AUTO_INCREMENT PRIMARY KEY,
    estimate_id INT NOT NULL,
    name VARCHAR(255),
    unit VARCHAR(50),
    price DECIMAL(10,2),
    adjusted_price DECIMAL(10,2),
    category ENUM('работа', 'материал', 'логистика'),
    FOREIGN KEY (estimate_id) REFERENCES Estimates(id) ON DELETE CASCADE
  )
`,

Tasks: `
  CREATE TABLE IF NOT EXISTS Tasks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    estimate_id INT NOT NULL,
    estimate_item_id INT NOT NULL,
    worker_id INT,
    quantity DECIMAL(10,2) NOT NULL,
    percent INT DEFAULT 100,
    comment TEXT,
    status ENUM('created', 'in_progress', 'on_review', 'approved', 'revision', 'paid') DEFAULT 'created',
    taken_by_worker BOOLEAN DEFAULT 0,
    refused_once BOOLEAN DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (estimate_id) REFERENCES Estimates(id),
    FOREIGN KEY (estimate_item_id) REFERENCES EstimateItems(id),
    FOREIGN KEY (worker_id) REFERENCES Users(id)
  )
`
,

};

module.exports = tables;
