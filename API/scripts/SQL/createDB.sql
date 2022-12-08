DROP TABLE IF EXISTS organisation CASCADE;
DROP TABLE IF EXISTS organization CASCADE;
DROP TABLE IF EXISTS town CASCADE;
DROP TABLE IF EXISTS partier CASCADE;
DROP TABLE IF EXISTS event CASCADE;
DROP TABLE IF EXISTS shuttle CASCADE;
DROP TABLE IF EXISTS shuttle_member CASCADE;
DROP TABLE IF EXISTS shuttleMember CASCADE;

-- Partie création des tables
-- organization
CREATE TABLE organization (
    id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    emailAddress varchar UNIQUE NOT NULL,
    password varchar NOT NULL,
    name varchar NOT NULL,
    responsibleName varchar NOT NULL,
    referencePhoneNumber varchar NOT NULL,
    administrativeProof varchar NOT NULL
);

-- Town
CREATE TABLE town (
    name varchar NOT NULL,
    zipCode integer NOT NULL,
    PRIMARY KEY(name, zipCode)
);

-- Partier
CREATE TABLE partier (
    id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    emailAddress varchar UNIQUE NOT NULL,
    pseudo varchar NOT NULL,
    password varchar NOT NULL,
    firstName varchar NOT NULL,
    lastName varchar NOT NULL,
    picture varchar,
    phoneNumber varchar NOT NULL,
    refPhoneNumber varchar,
    addressTown varchar,
    addressZipCode integer,
    FOREIGN KEY (addressTown, addressZipCode) REFERENCES town(name, zipCode)
);

-- Event
CREATE TABLE event (
    id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name varchar NOT NULL,
    description varchar NOT NULL,
    nameAndNumStreet varchar NOT NULL,
    departing_point varchar NOT NULL,
    startDateAndTime timestamp NOT NULL,
    endDateAndTime timestamp NOT NULL,
    organizationId integer REFERENCES organization(id) NOT NULL,
    addressTown varchar,
    addressZipCode integer,
    FOREIGN KEY (addressTown, addressZipCode) REFERENCES town(name, zipCode)
);

-- Shuttle
CREATE TABLE shuttle (
    id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    departureTime timestamp NOT NULL,
    eventId integer REFERENCES event(id) NOT NULL,
    destinationTown varchar,
    destinationZipCode integer,
    FOREIGN KEY (destinationTown, destinationZipCode) REFERENCES town(name, zipCode),
    UNIQUE (departureTime, eventId, destinationTown, destinationZipCode)
);

-- Shuttle member
CREATE TABLE shuttleMember (
    validated boolean NOT NULL,
    shuttleId integer REFERENCES shuttle(id) DEFERRABLE INITIALLY IMMEDIATE,
    partierId integer REFERENCES partier(id) DEFERRABLE INITIALLY IMMEDIATE,
    PRIMARY KEY (shuttleId, partierId)
);

-- Partie remplissage de la base de données
-- organization
INSERT INTO organization (emailAddress, password, name, responsibleName, referencePhoneNumber, administrativeProof) VALUES
('cercleIESN@gmail.com', 'password', 'Cercle IESN', 'Jean Dupont', '0498867457', 'doc.pdf'),
('cercleEco@gmail.com', 'password', 'Cercle Eco', 'Guillaume Turpin', '0478965467', 'doc.pdf'),
('cercleChigé@gmail.com', 'password', 'Cercle Chigé', 'La panthère rose', '086754654', 'doc.pdf');

-- Town
INSERT INTO town ("name", zipCode) VALUES
('Namur', 5000),
('Beez', 5000),
('Belgrade', 5001),
('Saint-Servais', 5002),
('Saint-Marc', 5003),
('Bouge', 5004),
('Malonne', 5020),
('Daussoulx', 5020),
('Suarlée', 5020),
('Vedrin', 5020),
('Temploux', 5020),
('Rhisnes', 5020),
('Flawinne', 5020),
('Champion', 5020),
('Bonnine', 5021),
('Cognelée', 5022),
('Marche-les-Dames', 5024),
('Gelbressée', 5024),
('Wierde', 5100),
('Dave', 5100),
('Wépion', 5100),
('Naninne', 5100),
('Jambes', 5100),
('Erpent', 5101),
('Lives-sur-Meuse', 5101),
('Loyers', 5101);

-- Partier
INSERT INTO partier (emailAddress, pseudo, password, firstName, lastName, picture, phoneNumber, refPhoneNumber, addressTown, addressZipCode) VALUES
('etu44721@henallux.be', 'Wan', 'password', 'Wangi', 'Weber', 'photo.png', '0499517092', '0499265087', 'Saint-Servais', 5002),
('etu44108@henallux.be', 'Sim', 'password', 'Simon', 'Rollus', 'photo.png', '0499172696', '0499585449', 'Bonnine', 5021),
('etu47233@henallux.be', 'MrKenma', 'password', 'Julien', 'Hanquet', 'photo.png', '0499579465', '0499164954', 'Wierde', 5100);
INSERT INTO partier (emailAddress, pseudo, password, firstName, lastName, phoneNumber, addressTown, addressZipCode) VALUES
('fhmqez@gmail.com', 'Pseudo', 'password', 'Prénom', 'Nom', '0499270747', 'Loyers', 5101);

-- Event
INSERT INTO event (name, description, nameAndNumStreet, departing_point, startDateAndTime, endDateAndTime, organizationId, addressTown, addressZipCode) VALUES
('1ère soirée', 'Soirée plutôt sympa en vrai', 'rue de Bruxelles, 31', 'En fasse de l entrée', current_timestamp, current_timestamp, 2, 'Malonne', 5020),
('2ème soirée', 'Soirée également plutôt sympa', 'rue Joseph Calozet, 19', 'sortie du parking', current_timestamp, current_timestamp, 1, 'Saint-Servais', 5002),
('3ème soirée', 'Soirée un peu nulle en vrai', 'rue Godefroid, 20', 'devant la gare', current_timestamp, current_timestamp, 3, 'Namur', 5000);

-- Shuttle
INSERT INTO shuttle (departureTime, eventId, destinationTown, destinationZipCode) VALUES
(current_timestamp, 1, 'Wierde', 5100),
(current_timestamp, 1, 'Bonnine', 5021),
(current_timestamp, 1, 'Cognelée', 5022),
(current_timestamp, 2, 'Wierde', 5100),
(current_timestamp, 2, 'Saint-Marc', 5003),
(current_timestamp, 3, 'Bouge', 5004);

-- Shuttle member
INSERT INTO shuttleMember (validated, shuttleId, partierId) VALUES
(true, 1, 1),
(false, 2, 1),
(false, 4, 2);
