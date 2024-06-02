CREATE TABLE bus_lines (
	line_id INT PRIMARY KEY AUTO_INCREMENT,
    line_number VARCHAR(10) NOT NULL,
    line_name VARCHAR(100) NOT NULL
);

CREATE TABLE bus_stops (
	stop_id INT PRIMARY KEY AUTO_INCREMENT,
    stop_name VARCHAR(100) NOT NULL UNIQUE,
    latitude DECIMAL(9, 6) NOT NULL UNIQUE,
    longitude DECIMAL(9, 6) NOT NULL UNIQUE,
    wheelchair_accessible TINYINT(1) NOT NULL DEFAULT 0
);

CREATE TABLE schedules (
	id INT PRIMARY KEY AUTO_INCREMENT,
    line_id INT NOT NULL,
    stop_id INT NOT NULL,
    departure_time TIME NOT NULL,
    weekday BOOLEAN NOT NULL,
    FOREIGN KEY (line_id) REFERENCES bus_lines(line_id),
    FOREIGN KEY (stop_id) REFERENCES bus_stops(stop_id)
);

CREATE TABLE routes (
	id INT PRIMARY KEY AUTO_INCREMENT,
    line_id INT NOT NULL,
    stop_id INT NOT NULL,
	stop_order INT NOT NULL,
    route_type VARCHAR(1) NOT NULL, 
    FOREIGN KEY (line_id) REFERENCES bus_lines(line_id),
    FOREIGN KEY (stop_id) REFERENCES bus_stops(stop_id)
);
