show databases;
create database backend;
use backend;
-- users table
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    reg_no VARCHAR(20) NOT NULL UNIQUE,
    fullname VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    block VARCHAR(20),
    room_number VARCHAR(20),
    mess_name VARCHAR(50),
    mess_type ENUM('Veg', 'Non-Veg', 'Special') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- mess_suggestions table
CREATE TABLE mess_suggestions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    food_item_suggestion VARCHAR(255) NOT NULL,
    meal_type ENUM('Breakfast', 'Lunch', 'Snacks', 'Dinner', 'Night Mess') NOT NULL,
    feasibility TINYINT(1) DEFAULT 0,
    suggestion_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);
show tables;
select * from users;
select * from mess_suggestions;
