DROP TABLE IF EXISTS organisation CASCADE;
DROP TABLE IF EXISTS town CASCADE;
DROP TABLE IF EXISTS partier CASCADE;
DROP TABLE IF EXISTS event CASCADE;
DROP TABLE IF EXISTS shuttle CASCADE;
DROP TABLE IF EXISTS shuttle_member CASCADE;

-- Partie création des tables
-- Organisation
CREATE TABLE organisation (
    email_address varchar PRIMARY KEY,
    password varchar NOT NULL,
    name varchar NOT NULL,
    responsible_name varchar NOT NULL,
    reference_phone_number varchar NOT NULL,
    administrative_proof varchar NOT NULL
);

-- Town
CREATE TABLE town (
    name varchar UNIQUE,
    zip_code integer UNIQUE,
    PRIMARY KEY(name, zip_code)
);

-- Partier
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

-- Event
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

-- Shuttle
CREATE TABLE shuttle (
    id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    departure_time timestamp NOT NULL,
    event_id integer REFERENCES event(id) NOT NULL,
    destination_town varchar REFERENCES town(name) NOT NULL,
    destination_zip_code integer REFERENCES town(zip_code) NOT NULL,
    UNIQUE (departure_time, event_id, destination_town, destination_zip_code)
);

-- Shuttle member
CREATE TABLE shuttle_member (
    validated boolean NOT NULL,
    shuttle_id integer REFERENCES shuttle(id) DEFERRABLE INITIALLY IMMEDIATE,
    partier_id varchar REFERENCES partier(email_address) DEFERRABLE INITIALLY IMMEDIATE,
    PRIMARY KEY (shuttle_id, partier_id)
);

-- Partie remplissage de la base de données
-- Organisation
INSERT INTO organisation (email_address, password, name, responsible_name, reference_phone_number, administrative_proof) VALUES
('cercleIESN@gmail.com', 'password', 'Cercle IESN', 'Jean Dupont', '0498867457', 'doc.pdf'),
('cercleEco@gmail.com', 'password', 'Cercle Eco', 'Guillaume Turpin', '0478965467', 'doc.pdf'),
('cercleChigé@gmail.com', 'password', 'Cercle Chigé', 'La panthère rose', '086754654', 'doc.pdf');

-- Town
INSERT INTO town ("name", zip_code) VALUES
('Namur', 5000),
--('Beez', 5000),
('Belgrade', 5001),
('Saint-Servais', 5002),
('Saint-Marc', 5003),
('Bouge', 5004),
('Malonne', 5020),
--('Daussoulx', 5020),
--('Suarlée', 5020),
--('Vedrin', 5020),
--('Temploux', 5020),
--('Rhisnes', 5020),
--('Flawinne', 5020),
--('Champion', 5020),
('Bonnine', 5021),
('Cognelée', 5022),
('Marche-les-Dames', 5024),
--('Gelbressée', 5024),
('Wierde', 5100),
--('Dave', 5100),
--('Wépion', 5100),
--('Naninne', 5100),
--('Jambes', 5100),
--('Erpent', 5101),
--('Lives-sur-Meuse', 5101),
('Loyers', 5101);

-- Partier
INSERT INTO partier (email_address, pseudo, password, first_name, last_name, picture, phone_number, ref_phone_number, address_town, address_zip_code) VALUES
('etu44721@henallux.be', 'Wan', 'password', 'Wangi', 'Weber', 'photo.png', '0499517092', '0499265087', 'Saint-Servais', 5002),
('etu44108@henallux.be', 'Sim', 'password', 'Simon', 'Rollus', 'photo.png', '0499172696', '0499585449', 'Bonnine', 5021),
('etu47233@henallux.be', 'MrKenma', 'password', 'Julien', 'Hanquet', 'photo.png', '0499579465', '0499164954', 'Wierde', 5100);
INSERT INTO partier (email_address, pseudo, password, first_name, last_name, phone_number, address_town, address_zip_code) VALUES
('fhmqez@gmail.com', 'Pseudo', 'password', 'Prénom', 'Nom', '0499270747', 'Loyers', 5101);

-- Event
INSERT INTO event (name, description, name_and_num_street, departing_point, start_date_and_time, end_date_and_time, organisation_id, address_town, address_zip_code) VALUES
('1ère soirée', 'Soirée plutôt sympa en vrai', 'rue de Bruxelles, 31', 'En fasse de l entrée', current_timestamp, current_timestamp, 'cercleEco@gmail.com', 'Malonne', 5020),
('2ème soirée', 'Soirée également plutôt sympa', 'rue Joseph Calozet, 19', 'sortie du parking', current_timestamp, current_timestamp, 'cercleIESN@gmail.com', 'Saint-Servais', 5002),
('3ème soirée', 'Soirée un peu nulle en vrai', 'rue Godefroid, 20', 'devant la gare', current_timestamp, current_timestamp, 'cercleEco@gmail.com', 'Namur', 5000);

-- Shuttle
INSERT INTO shuttle (departure_time, event_id, destination_town, destination_zip_code) VALUES
(current_timestamp, 1, 'Wierde', 5100),
(current_timestamp, 1, 'Bonnine', 5021),
(current_timestamp, 1, 'Cognelée', 5022),
(current_timestamp, 2, 'Wierde', 5100),
(current_timestamp, 2, 'Saint-Marc', 5003),
(current_timestamp, 3, 'Bouge', 5004);

-- Shuttle member
INSERT INTO shuttle_member (validated, shuttle_id, partier_id) VALUES
(true, 1, 'etu44721@henallux.be'),
(false, 1, 'etu44108@henallux.be'),
(false, 4, 'etu44721@henallux.be');
