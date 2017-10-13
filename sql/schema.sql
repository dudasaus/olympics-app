--- Planning on using PostgreSQL
-- DROP DATABASE IF EXISTS olympics;
-- CREATE DATABASE olympics;

-- \c olympics;

--- SECTION 1: TABLES FOR INFORMATION ABOUT THE ACTUAL OLYMPICS ---

--- General category (e.g. skiing)
DROP TABLE IF EXISTS sports_category;
CREATE TABLE sports_category (
    id SERIAL NOT NULL,
    name VARCHAR(20) NOT NULL,
    PRIMARY KEY (id)
);

--- Specific type of event (e.g. Mens halfpipe)
DROP TABLE IF EXISTS sports_events;
CREATE TABLE sports_events (
    id SERIAL NOT NULL,
    name VARCHAR(40) NOT NULL,
    category_id INTEGER NOT NULL REFERENCES sports_category(id),
    team_event BOOLEAN NOT NULL DEFAULT FALSE,
    PRIMARY KEY (id)
);

--- Actual event with times (e.g. Mens halfpipe qualifiers)
DROP TABLE IF EXISTS events;
CREATE TABLE events (
    id SERIAL NOT NULL,
    name VARCHAR(120) NOT NULL,
    event_id INTEGER NOT NULL REFERENCES sports_events(id),
    time TIMESTAMP NOT NULL,
    finals BOOLEAN NOT NULL DEFAULT 0,
    PRIMARY KEY (id)
);

--- Country info
DROP TABLE IF EXISTS countries;
CREATE TABLE countries (
    id SERIAL NOT NULL,
    name VARCHAR(40) NOT NULL,
    short_name VARCHAR(3),
    PRIMARY KEY (id)
);

--- Athletes info
DROP TABLE IF EXISTS athletes;
CREATE TABLE athletes (
    id SERIAL NOT NULL,
    name VARCHAR(40) NOT NULL,
    country_id INTEGER NOT NULL REFERENCES countries(id),
    PRIMARY KEY (id)
);

--- Connections between athletes and their sports event(s)
DROP TABLE IF EXISTS athletes_sports_events;
CREATE TABLE athletes_sports_events (
    athlete_id INTEGER NOT NULL REFERENCES athletes(id),
    sports_event_id INTEGER NOT NULL REFERENCES sports_events(id),
    PRIMARY KEY (athlete_id, sports_event_id)
);

--- Info about which countries participate in which sports events
DROP TABLE IF EXISTS countries_sports_events;
CREATE TABLE countries_sports_events (
    country_id INTEGER NOT NULL REFERENCES countries(id),
    sports_event_id INTEGER NOT NULL REFERENCES sports_events(id),
    PRIMARY KEY (country_id, sports_event_id)
);

--- Results info for events
DROP TABLE IF EXISTS results;
CREATE TABLE results (
    sports_event_id INTEGER NOT NULL REFERENCES sports_events(id),
    country_id INTEGER NOT NULL REFERENCES countries(id),
    athlete_id INTEGER REFERENCES athletes(id), --- Can be null if team event
    medal INTEGER NOT NULL, --- 1 = bronze, 2 = silver, 3 = gold?
    PRIMARY KEY (sports_event_id)
);



--- SECTION 2: TABLES ABOUT USERS, GROUPS, PREDICTIONS, SCORING, ETC. ---
