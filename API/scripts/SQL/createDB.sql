DROP TABLE IF EXISTS organisation CASCADE;
CREATE TABLE organisation (
    email_address varchar PRIMARY KEY,
    password varchar NOT NULL,
    name varchar NOT NULL,
    responsible_name varchar NOT NULL,
    reference_phone_number varchar NOT NULL,
    administrative_proof varchar NOT NULL
);

DROP TABLE IF EXISTS town CASCADE;
CREATE TABLE town (
    name varchar,
    zip_code integer,
    PRIMARY KEY(name, zip_code)
);

DROP TABLE IF EXISTS partier CASCADE;
CREATE TABLE partier (
    email_address varchar PRIMARY KEY,
    pseudo varchar NOT NULL,
    password varchar NOT NULL,
    first_name varchar NOT NULL,
    last_name varchar NOT NULL,
    picture varchar,
    phone_number varchar NOT NULL,
    ref_phone_number varchar,
    address_town varchar REFERENCES town(name) NOT NULL ,
    address_zip_code integer REFERENCES town(zip_code) NOT NULL
);

DROP TABLE IF EXISTS event CASCADE;
CREATE TABLE event (
    id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY ,
    name varchar NOT NULL,
    description varchar NOT NULL,
    name_and_num_street varchar NOT NULL,
    departing_point varchar NOT NULL,
    start_date_and_time timestamp NOT NULL,
    end_date_and_time timestamp NOT NULL,
    organisation_id varchar REFERENCES organisation(email_address) NOT NULL,
    address_town varchar REFERENCES town(name) NOT NULL,
    address_zip_code integer REFERENCES town(zip_code) NOT NULL
);

DROP TABLE IF EXISTS shuttle CASCADE;
CREATE TABLE shuttle (
    id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    departure_time timestamp NOT NULL,
    event_id integer REFERENCES event(id) NOT NULL,
    destination_town varchar REFERENCES town(name) NOT NULL,
    destination_zip_code integer REFERENCES town(zip_code) NOT NULL,
    UNIQUE (departure_time, event_id, destination_town, destination_zip_code)
);

DROP TABLE IF EXISTS shuttle_member CASCADE;
CREATE TABLE shuttle_member (
    validated boolean NOT NULL,
    shuttle_id integer REFERENCES shuttle(id) DEFERRABLE INITIALLY IMMEDIATE,
    partier_id varchar REFERENCES partier(email_address) DEFERRABLE INITIALLY IMMEDIATE,
    PRIMARY KEY (shuttle_id, partier_id)
);