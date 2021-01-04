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
	response TEXT NOT NULL,
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

-- Populate with mock data
INSERT INTO units (unit_name, unique_id) VALUES ('Chief of Space Operations', 1);

INSERT INTO users (unit_id, username, passphrase, first_name, last_name) VALUES (1, 'bigCheese', 'semperSupra', 'Jay', 'Raymond');
