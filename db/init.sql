CREATE TABLE units (
	id serial PRIMARY KEY,
	unit_name TEXT NOT NULL,
	unique_id INT NOT NULL,
	parent_unique_id INT
);

CREATE TABLE users (
	id serial PRIMARY KEY,
	unit_id INT NOT NULL REFERENCES units(id) ON DELETE CASCADE,
	username TEXT NOT NULL,
	passphrase TEXT NOT NULL,
	first_name TEXT NOT NULL,
	last_name TEXT NOT NULL,
	perms TEXT
);

CREATE TABLE taskers (
	id serial PRIMARY KEY,
	originator_unit_id INT NOT NULL REFERENCES units(id) ON DELETE CASCADE
);

CREATE TABLE units_assigned_taskers (
	id serial PRIMARY KEY,
	tasker_id INT NOT NULL REFERENCES taskers(id) ON DELETE CASCADE,
	unit_id INT NOT NULL REFERENCES units(id) ON DELETE CASCADE,
	routing_at_unit_id INT REFERENCES units(id) ON DELETE CASCADE,
	response TEXT,
	current_status TEXT NOT NULL,
	actual_workload TIME
);

CREATE TABLE tasker_reply_attachments (
	id serial PRIMARY KEY,
	units_assigned_taskers_id INT NOT NULL REFERENCES units_assigned_taskers(id) ON DELETE CASCADE,
	filepath TEXT NOT NULL
);

CREATE TABLE tasker_sent_attachments (
	id serial PRIMARY KEY,
	tasker_id INT NOT NULL REFERENCES taskers(id) ON DELETE CASCADE,
	filepath TEXT NOT NULL
);

CREATE TABLE tasker_version (
	id serial PRIMARY KEY,
	tasker_id INT NOT NULL REFERENCES taskers(id) ON DELETE CASCADE,
	version_num INT NOT NULL,
	updated_on DATE NOT NULL,
	tasker_name TEXT NOT NULL,
	suspense_date DATE NOT NULL,
	priority_lvl TEXT NOT NULL,
	predicted_workload TIME,
	desc_text TEXT NOT NULL
);

CREATE TABLE notifications (
	id serial PRIMARY KEY,
	unit_to INT NOT NULL REFERENCES units(id),
	details TEXT,
	isRead BOOLEAN NOT NULL
);

-- Populate with mock data
-- units
INSERT INTO units (unit_name, unique_id, parent_unique_id) VALUES 
	('Chief of Space Operations (CSO)', 1, NULL),
	
	('SF (Space Staff-Pentagon)', 2, 1),
	('USSF Element - NRO', 3, 1),
	('Space Operations Command (SpOC)', 4, 1),
	('Space Systems Command (SCC)', 5, 1),
	('Space Training and Readiness Command (STARCOM)', 6, 1),

	('Delta 2 (SDA)', 7, 4),
	('Delta 3 (SEW)', 8, 4),
	('Delta 4 (MW)', 9, 4),
	('Delta 5 (C2)', 10, 4),
	('Delta 6 (Cyber Ops)', 11, 4),
	('Delta 7 (ISR)', 12, 4),
	('Delta 8 (SATCOM)', 13, 4),
	('Delta 8 (NAVWAR)', 14, 4),
	('Delta 9 (OW)', 15, 4),
	('Buckley Garrison', 16, 4),
	('Peterson-Schriever Garrison', 17, 4),
	('Thule', 18, 4),

	('Dev Intel', 19, 5),
	('Laboratories', 20, 5),
	('Systems Engineering Integration', 21, 5),
	('Special Programs', 22, 5),
	('Development Corps', 23, 5),
	('Production Corps', 24, 5),
	('Enterprise Corps', 25, 5),
	('NH-04 Comm. Services', 26, 5),
	('Launch Acquisition & Operations', 27, 5),
	('NH-04 Range Acquisition & Operations', 28, 5),
	('Eastern Range', 29, 5),
	('Western Range', 30, 5),
	('Test', 31, 5),
	('Patrick Garrison', 32, 5),
	('Vandenberg Garrison', 33, 5),
	('Los Angeles Garrison', 34, 5),
	('ASAF/SP*', 35, 5),

	('SpRCO', 36, 35),
	('SDA', 37, 35),

	('Training Delta', 38, 6),
	('Ed Delta', 39, 6),
	('Range Delta', 40, 6),
	('Adversary Delta', 41, 6),
	('OT&E Delta', 42, 6),
	('Personnel Delta', 43, 6),
	('Doctrine Delta', 44, 6);

-- users
INSERT INTO users (unit_id, username, passphrase, first_name, last_name) VALUES
	(1, 'bigCheese', 'semperSupra', 'Jay', 'Raymond'),
	(2, 'acqMan', 'acqMan', 'John', 'Thompson'),
	(3, 'staffman', 'staffman', 'Jane', 'Staffer'),
	(4, 'spook', 'spook', 'Government', 'Spook'),
	(5, 'swhiting', 'swhiting', 'Stephen', 'Whiting'),
	(6, 'pflores', 'pflores', 'Peter', 'Flores'),
	(7, 'snuffy', 'snuffy', 'Guardian', 'Snuffy'),
	(7, 'mcantore', 'mcantore', 'Matthew', 'Cantore'),
	(8, 'jthien', 'jthien', 'John', 'Thien'),
	(9, 'rbourquin', 'rbourquin', 'Richard', 'Bourquin'),
	(37, 'mdelauter', 'mdelauter', 'Monique', 'DeLauter'),
	(21, 'rrockwell', 'rrockwell', 'Roy', 'Rockwell'),
	(12, 'catwood', 'catwood', 'Chandler', 'Atwood');

-- taskers
INSERT INTO taskers (originator_unit_id) VALUES
	(1),
	(2),
	(3);

-- unit assigned taskers
INSERT INTO units_assigned_taskers (tasker_id, unit_id, routing_at_unit_id, response, current_status, actual_workload) VALUES
	(1, 23, NULL, NULL, 'in progress', NULL),
	(3, 38, NULL, NULL, 'in progress', NULL),
	(3, 39, NULL, NULL, 'in progress', NULL),
	(2, 16, NULL, NULL, 'in progress', NULL),
	(2, 17, NULL, 'ECXCO Nominates General Daehler for Ghost program', 'completed', '00:30:00'),
	(1, 24, NULL, 'Nothing to report', 'completed', '00:10:00');

-- tasker versions
INSERT INTO 
	tasker_version( tasker_id, version_num, updated_on, tasker_name, suspense_date, priority_lvl, predicted_workload, desc_text )
VALUES
	(1, 1, '2020-12-01', 'Celebrate Space Force Birthday', '2020-12-20', 'Low', '00:00:01', 'Mandatory fun'),
	(2, 1, '2020-12-25', 'Finish the MVP', '2021-02-07', 'Medium', '21:30:00', 'Have a minimum viable product to deploy to P1'),
	(3, 1, '2021-01-01', 'Finish the Capstone Project', '2021-02-15', 'High', '23:59:59', 'Have a finished product to present')
	;

INSERT INTO notifications( unit_to, details, isRead) 
VALUES 
	(23, 'Space Force Birthday', false), 
	(38, 'Capstone', false), 
	(39, 'Capstone', false), 
	(16, 'MVP', true), 
	(17, 'MVP', true), 
	(24, 'Space Force Birthday', true); 