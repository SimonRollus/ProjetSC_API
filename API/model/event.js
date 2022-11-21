// Get d'un seul event
module.exports.getEvent = async (id, client) => {
    return await client.query(`SELECT * FROM event WHERE id = $1`, [id]);
}

// Get de tous les events
module.exports.getEvents = async (client) => {
    return await client.query(`SELECT * FROM event`);
}

module.exports.postEvent = async (name, description, nameAndNumStreet, departingPoint, startDateAndTime, endDateAndTime, organisationId, addressTown, addressZipCode, client) => {
    return await client.query(`INSERT INTO event (name, description, name_and_num_street, departing_point, start_date_and_time, end_date_and_time, organisation_id, address_town, address_zip_code)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id`,
        [name, description, name_and_num_street, departing_point, start_date_and_time, end_date_and_time, organisation_id, address_town, address_zip_code]);
}

// Attention aux modifications de date de début et de fin => entraine une modification des shuttles existants
module.exports.updateEvent = async (id, name, description, nameAndNumStreet, departingPoint, startDateAndTime, endDateAndTime, organisationId, addressTown, addressZipCode, client) => {
    return await client.query(`UPDATE event SET name = $1, description = $2, name_and_num_street = $3, departing_point = $4, start_date_and_time = $5,
                 end_date_and_time = $6, organisation_id = $7, address_town = $8, address_zip_code = $9 WHERE id = $10`,
        [name, description, nameAndNumStreet, departingPoint, startDateAndTime, endDateAndTime, organisationId, addressTown, addressZipCode, id]);
}

// Pas oublier de gérer la suppression par rapport aux shuttle et shuttle_member
module.exports.deleteEvent = async (id, client) => {
    return await client.query(`DELETE FROM event WHERE id = $1`, [id]);
}