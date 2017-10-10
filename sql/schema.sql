# Planning on using MySQL
DROP DATABASE IF EXISTS olympics;
CREATE DATABASE olympics;

USE olympics;

### SECTION 1: TABLES FOR INFORMATION ABOUT THE ACTUAL OLYMPICS ###

# General category (e.g. skiing)
CREATE TABLE sports_category (
    id INTEGER NOT NULL AUTO_INCREMENT,
    name VARCHAR(20) NOT NULL,
    PRIMARY KEY (id)
);

# Specific type of event (e.g. Mens halfpipe)
CREATE TABLE sports_events (
    id INTEGER NOT NULL AUTO_INCREMENT,
    name VARCHAR(40) NOT NULL,
    category_id INTEGER NOT NULL REFERENCES sports_category(id),
    team_event BOOLEAN NOT NULL DEFAULT 0,
    PRIMARY KEY (id)
);

# Actual event with times (e.g. Mens halfpipe qualifiers)
CREATE TABLE events (
    id INTEGER NOT NULL AUTO_INCREMENT,
    name VARCHAR(120) NOT NULL,
    event_id INTEGER NOT NULL REFERENCES sports_events(id),
    time DATETIME NOT NULL,
    finals BOOLEAN NOT NULL DEFAULT 0,
    PRIMARY KEY (id)
);

# Country info
CREATE TABLE countries (
    id INTEGER NOT NULL AUTO_INCREMENT,
    name VARCHAR(40) NOT NULL,
    short_name VARCHAR(3),
    PRIMARY KEY (id)
);

# Athletes info
CREATE TABLE athletes (
    id INTEGER NOT NULL AUTO_INCREMENT,
    name VARCHAR(40) NOT NULL,
    country_id INTEGER NOT NULL REFERENCES countries(id),
    PRIMARY KEY (id)
);

# Connections between athletes and their sports event(s)
CREATE TABLE athletes_sports_events (
    athlete_id INTEGER NOT NULL REFERENCES athletes(id),
    sports_event_id INTEGER NOT NULL REFERENCES sports_events(id),
    PRIMARY KEY (athlete_id, sports_event_id)
);

# Info about which countries participate in which sports events
CREATE TABLE countries_sports_events (
    country_id INTEGER NOT NULL REFERENCES countries(id),
    sports_event_id INTEGER NOT NULL REFERENCES sports_events(id),
    PRIMARY KEY (country_id, sports_event_id)
);

# Results info for events
CREATE TABLE results (
    sports_event_id INTEGER NOT NULL REFERENCES sports_events(id),
    country_id INTEGER NOT NULL REFERENCES countries(id),
    athlete_id INTEGER REFERENCES athletes(id), # Can be null if team event
    medal INTEGER NOT NULL, # 1 = bronze, 2 = silver, 3 = gold?
    PRIMARY KEY (sports_event_id)
);



### SECTION 2: TABLES ABOUT USERS, GROUPS, PREDICTIONS, SCORING, ETC. ###
