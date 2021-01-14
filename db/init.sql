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
	salt TEXT NOT NULL,
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
  	responded_on DATE,
	current_status TEXT NOT NULL,
	actual_workload INT
);

CREATE TABLE tasker_reply_attachments (
	id serial PRIMARY KEY,
	units_assigned_taskers_id INT NOT NULL REFERENCES units_assigned_taskers(id) ON DELETE CASCADE,
	filepath TEXT NOT NULL
);

CREATE TABLE tasker_sent_attachments (
	id serial PRIMARY KEY,
	tasker_id INT NOT NULL REFERENCES taskers(id) ON DELETE CASCADE,
	fieldname TEXT,
	originalname TEXT,
	encoding_ TEXT,
	mimetype TEXT,
	buffer_ BYTEA NOT NULL,
	size INT
);

CREATE TABLE tasker_version (
	id serial PRIMARY KEY,
	tasker_id INT NOT NULL REFERENCES taskers(id) ON DELETE CASCADE,
	version_num INT NOT NULL,
	updated_on DATE NOT NULL,
	tasker_name TEXT NOT NULL,
	suspense_date DATE NOT NULL,
	priority_lvl TEXT NOT NULL,
	predicted_workload INT,
	desc_text TEXT NOT NULL
);

CREATE TABLE notifications (
	id serial PRIMARY KEY,
	tasker_id INT NOT NULL REFERENCES taskers(id) ON DELETE CASCADE,
	unit_to INT NOT NULL REFERENCES units(id),
	details TEXT,
	isRead BOOLEAN NOT NULL,
	notification_type TEXT
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
INSERT INTO users (unit_id, username, passphrase, salt, first_name, last_name) VALUES
	(1, 'bigCheese', '21939ea259da07b2252f1a902c4c74ab25346e6c629d1361756cb007ccf1897cb410a740142da7c9cd2efdbe2fb0f68f505c67f083f19a745a859854899a0e17', 'b960d4a49414372d2e832f09100301b8', 'John "Jay"', 'Raymond'),
	(5, 'acqMan', '21939ea259da07b2252f1a902c4c74ab25346e6c629d1361756cb007ccf1897cb410a740142da7c9cd2efdbe2fb0f68f505c67f083f19a745a859854899a0e17', 'b960d4a49414372d2e832f09100301b8', 'John "JT"', 'Thompson'),
	(2, 'staffMan', '21939ea259da07b2252f1a902c4c74ab25346e6c629d1361756cb007ccf1897cb410a740142da7c9cd2efdbe2fb0f68f505c67f083f19a745a859854899a0e17', 'b960d4a49414372d2e832f09100301b8', 'David', 'Thompson'),
	(2, 'staffWoman', '21939ea259da07b2252f1a902c4c74ab25346e6c629d1361756cb007ccf1897cb410a740142da7c9cd2efdbe2fb0f68f505c67f083f19a745a859854899a0e17', 'b960d4a49414372d2e832f09100301b8', 'Kimberly', 'Crider'),
	(3, 'spook', '21939ea259da07b2252f1a902c4c74ab25346e6c629d1361756cb007ccf1897cb410a740142da7c9cd2efdbe2fb0f68f505c67f083f19a745a859854899a0e17', 'b960d4a49414372d2e832f09100301b8', 'Michael', 'Guetlein'),
	(4, 'swhiting', '21939ea259da07b2252f1a902c4c74ab25346e6c629d1361756cb007ccf1897cb410a740142da7c9cd2efdbe2fb0f68f505c67f083f19a745a859854899a0e17', 'b960d4a49414372d2e832f09100301b8', 'Stephen', 'Whiting'),
	(6, 'pflores', '21939ea259da07b2252f1a902c4c74ab25346e6c629d1361756cb007ccf1897cb410a740142da7c9cd2efdbe2fb0f68f505c67f083f19a745a859854899a0e17', 'b960d4a49414372d2e832f09100301b8', 'Peter', 'Flores'),
	(7, 'delta2', '21939ea259da07b2252f1a902c4c74ab25346e6c629d1361756cb007ccf1897cb410a740142da7c9cd2efdbe2fb0f68f505c67f083f19a745a859854899a0e17', 'b960d4a49414372d2e832f09100301b8', 'Delta', '2'),
	(8, 'delta3', '21939ea259da07b2252f1a902c4c74ab25346e6c629d1361756cb007ccf1897cb410a740142da7c9cd2efdbe2fb0f68f505c67f083f19a745a859854899a0e17', 'b960d4a49414372d2e832f09100301b8', 'Delta', '3'),
	(9, 'delta4', '21939ea259da07b2252f1a902c4c74ab25346e6c629d1361756cb007ccf1897cb410a740142da7c9cd2efdbe2fb0f68f505c67f083f19a745a859854899a0e17', 'b960d4a49414372d2e832f09100301b8', 'Delta', '4'),
	(10, 'delta5', '21939ea259da07b2252f1a902c4c74ab25346e6c629d1361756cb007ccf1897cb410a740142da7c9cd2efdbe2fb0f68f505c67f083f19a745a859854899a0e17', 'b960d4a49414372d2e832f09100301b8', 'Delta', '5'),
	(11, 'delta6', '21939ea259da07b2252f1a902c4c74ab25346e6c629d1361756cb007ccf1897cb410a740142da7c9cd2efdbe2fb0f68f505c67f083f19a745a859854899a0e17', 'b960d4a49414372d2e832f09100301b8', 'Delta', '6'),
	(12, 'delta7', '21939ea259da07b2252f1a902c4c74ab25346e6c629d1361756cb007ccf1897cb410a740142da7c9cd2efdbe2fb0f68f505c67f083f19a745a859854899a0e17', 'b960d4a49414372d2e832f09100301b8', 'Delta', '7'),
	(13, 'delta8', '21939ea259da07b2252f1a902c4c74ab25346e6c629d1361756cb007ccf1897cb410a740142da7c9cd2efdbe2fb0f68f505c67f083f19a745a859854899a0e17', 'b960d4a49414372d2e832f09100301b8', 'Delta', '8'),
	(14, 'delta9', '21939ea259da07b2252f1a902c4c74ab25346e6c629d1361756cb007ccf1897cb410a740142da7c9cd2efdbe2fb0f68f505c67f083f19a745a859854899a0e17', 'b960d4a49414372d2e832f09100301b8', 'Delta', '9'),
	(10, 'buckley', '21939ea259da07b2252f1a902c4c74ab25346e6c629d1361756cb007ccf1897cb410a740142da7c9cd2efdbe2fb0f68f505c67f083f19a745a859854899a0e17', 'b960d4a49414372d2e832f09100301b8', 'Buckley', 'Garrison'),
	(37, 'mdelauter', '21939ea259da07b2252f1a902c4c74ab25346e6c629d1361756cb007ccf1897cb410a740142da7c9cd2efdbe2fb0f68f505c67f083f19a745a859854899a0e17', 'b960d4a49414372d2e832f09100301b8', 'Monique', 'DeLauter'),
	(21, 'rrockwell', '21939ea259da07b2252f1a902c4c74ab25346e6c629d1361756cb007ccf1897cb410a740142da7c9cd2efdbe2fb0f68f505c67f083f19a745a859854899a0e17', 'b960d4a49414372d2e832f09100301b8', 'Roy', 'Rockwell'),
	(12, 'catwood', '21939ea259da07b2252f1a902c4c74ab25346e6c629d1361756cb007ccf1897cb410a740142da7c9cd2efdbe2fb0f68f505c67f083f19a745a859854899a0e17', 'b960d4a49414372d2e832f09100301b8', 'Chandler', 'Atwood');

-- taskers
INSERT INTO taskers (originator_unit_id) VALUES
	(1),
	(1),
	(4),
	(4),
	(2);

-- unit assigned taskers
INSERT INTO units_assigned_taskers (tasker_id, unit_id, routing_at_unit_id, response, current_status, actual_workload) VALUES
	(1, 2, NULL, NULL, 'in progress', NULL),
	(1, 3, NULL, NULL, 'in progress', NULL),
	(1, 4, NULL, NULL, 'in progress', NULL),	
	(1, 5, NULL, NULL, 'in progress', NULL),
	(1, 6, NULL, 'Love it! Perfect as is, but maybe get rid of the ventilation shafts? Your call, boss', 'completed', '5'),

	(2, 2, NULL, NULL, 'in progress', NULL),
	(2, 3, NULL, NULL, 'in progress', NULL),
	(2, 4, NULL, NULL, 'in progress', NULL),	
	(2, 5, NULL, NULL, 'in progress', NULL),
	(2, 6, NULL, 'Likely lurking around in the outter rim. Probe droid discovered possible activity in the Hoth System', 'completed', '12'),

	(3, 7, NULL, NULL, 'in progress', NULL),
	(3, 8, NULL, '200,000 units are ready with a million more well on the way', 'completed', '4'),
	(3, 9, NULL, NULL, 'in progress', NULL),
	(3, 10, NULL, NULL, 'in progress', NULL),
	(3, 11, NULL, NULL, 'in progress', NULL),
	(3, 12, NULL, NULL, 'in progress', NULL),
	(3, 13, NULL, NULL, 'in progress', NULL),
	(3, 14, NULL, NULL, 'in progress', NULL),	
	
	(4, 7, NULL, '100% accountability! Should we have them practice at the range as well or is the CBT good enough?', 'completed', '2'),
	(4, 8, NULL, NULL, 'in progress', NULL),
	(4, 9, NULL, NULL, 'in progress', NULL),
	(4, 10, NULL, NULL, 'in progress', NULL),
	(4, 11, NULL, NULL, 'in progress', NULL),
	(4, 12, NULL, NULL, 'in progress', NULL),
	(4, 13, NULL, NULL, 'in progress', NULL),
	(4, 14, NULL, NULL, 'in progress', NULL),

	(5, 1, NULL, NULL, 'in progress', NULL);

-- tasker versions
INSERT INTO 
	tasker_version( tasker_id, version_num, updated_on, tasker_name, suspense_date, priority_lvl, predicted_workload, desc_text )
VALUES
	(1, 1, '2020-12-01', 'Death Star', '2021-01-20', 'High', 6, 'Provide feedback on attached Death Star plans. Bye bye Alderaan. LOL'),
	(1, 2, '2020-12-20', 'Operation Peace ', '2021-02-20', 'Medium', 10, 'Provide feedback on secret plan, Operation Peace. Bring peace, freedom, justice and security to my new empire'),
	(2, 1, '2020-12-25', 'Intelligence report', '2021-02-07', 'Medium', 6, 'Gather and provide all known information on the whereabouts of known insurrectionist Luke Skywalker.'),
	(3, 1, '2021-01-01', 'Asset allocation', '2021-02-15', 'High', 3, 'Provide a report of all available manpower and resources available to support Opeation Peace.'),
	(4, 1, '2021-01-01', 'Marksmanship CBT', '2021-02-15', 'High', 3, 'All personnel are required to complete the Stormtrooper Marksmanship CBT. Report 100% compliance by NLT 15 Feb 21.'),
	(5, 1, '2021-01-01', 'Announcement', '2021-02-15', 'High', 1, 'Hey boss, dont forget to announce the new Space Force rank structure!');

INSERT INTO notifications( unit_to, tasker_id, details, isRead, notification_type)
VALUES 
	(2, 1, 'You have been assigned a tasker, "Operation Peace", with a suspense of 2021-02-20', false, 'tasker'),
	(3, 1, 'You have been assigned a tasker, "Operation Peace", with a suspense of 2021-02-20', false, 'tasker'),
	(4, 1, 'You have been assigned a tasker, "Operation Peace", with a suspense of 2021-02-20', false, 'tasker'),
	(5, 1, 'You have been assigned a tasker, "Operation Peace", with a suspense of 2021-02-20', false, 'tasker'),
	(6, 1, 'You have been assigned a tasker, "Operation Peace", with a suspense of 2021-02-20', true, 'tasker'),
	(1, 1, 'You have received a response on Tasker "Operation Peace" from Space Systems Command (SCC)', false, 'response'),

	(2, 2, 'You have been assigned a tasker, "Intelligence report", with a suspense of 2021-02-07', false, 'tasker'),
	(3, 2, 'You have been assigned a tasker, "Intelligence report", with a suspense of 2021-02-07', false, 'tasker'),
	(4, 2, 'You have been assigned a tasker, "Intelligence report", with a suspense of 2021-02-07', false, 'tasker'),
	(5, 2, 'You have been assigned a tasker, "Intelligence report", with a suspense of 2021-02-07', false, 'tasker'),
	(6, 2, 'You have been assigned a tasker, "Intelligence report", with a suspense of 2021-02-07', true, 'tasker'),
	(1, 2, 'You have received a response on Tasker "Intelligence report" from Space Systems Command (SCC)', false, 'response'),

	(7, 3, 'You have been assigned a tasker, "Asset Allocation", with a suspense of 2021-02-15', false, 'tasker'),
	(8, 3, 'You have been assigned a tasker, "Asset Allocation", with a suspense of 2021-02-15', true, 'tasker'),
	(9, 3, 'You have been assigned a tasker, "Asset Allocation", with a suspense of 2021-02-15', false, 'tasker'),
	(10, 3, 'You have been assigned a tasker, "Asset Allocation", with a suspense of 2021-02-15', false, 'tasker'),
	(11, 3, 'You have been assigned a tasker, "Asset Allocation", with a suspense of 2021-02-15', false, 'tasker'),
	(12, 3, 'You have been assigned a tasker, "Asset Allocation", with a suspense of 2021-02-15', false, 'tasker'),
	(13, 3, 'You have been assigned a tasker, "Asset Allocation", with a suspense of 2021-02-15', false, 'tasker'),
	(14, 3, 'You have been assigned a tasker, "Asset Allocation", with a suspense of 2021-02-15', false, 'tasker'),
	(4, 3, 'You have received a response on Tasker "Asset Allocation" from Delta 3 (SEW)', false, 'response'),

	(7, 4, 'You have been assigned a tasker, "Marksmanship CBT", with a suspense of 2021-02-15', true, 'tasker'),
	(8, 4, 'You have been assigned a tasker, "Marksmanship CBT", with a suspense of 2021-02-15', false, 'tasker'),
	(9, 4, 'You have been assigned a tasker, "Marksmanship CBT", with a suspense of 2021-02-15', false, 'tasker'),
	(10, 4, 'You have been assigned a tasker, "Marksmanship CBT", with a suspense of 2021-02-15', false, 'tasker'),
	(11, 4, 'You have been assigned a tasker, "Marksmanship CBT", with a suspense of 2021-02-15', false, 'tasker'),
	(12, 4, 'You have been assigned a tasker, "Marksmanship CBT", with a suspense of 2021-02-15', false, 'tasker'),
	(13, 4, 'You have been assigned a tasker, "Marksmanship CBT", with a suspense of 2021-02-15', false, 'tasker'),
	(14, 4, 'You have been assigned a tasker, "Marksmanship CBT", with a suspense of 2021-02-15', false, 'tasker'),
	(4, 4, 'You have received a response on Tasker "Marksmanship CBT" from Delta 2 (SDA)', false, 'response'),
	
	(1, 5, 'You have been assigned a tasker, "Announcement", with a suspense of 2021-02-15', false, 'tasker');