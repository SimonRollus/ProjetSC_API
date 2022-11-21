// Get pour une seule organisation
module.exports.getOrganisation = async (emailAddress, client) => {
    return await client.query("SELECT * FROM organisation WHERE email_address = $1", [emailAddress]);
}

// Get de toutes les organisations
module.exports.getOrganisations = async (client) => {
    return await client.query(`SELECT * FROM organisation`);
}

module.exports.postOrganisation = async (emailAddress, password, name, responsibleName, referencePhoneNumber, administrativeProof, client) => {
    return await client.query(`INSERT INTO organisation (email_address, password, name, responsible_name, reference_phone_number, administrative_proof) 
        VALUES ($1, $2, $3, $4, $5, $6)`, [emailAddress, password, name, responsibleName, referencePhoneNumber, administrativeProof]);
}

module.exports.updateOrganisation = async (emailAddress, password, name, responsibleName, referencePhoneNumber, administrativeProof, client) => {
    return await client.query(`UPDATE organisation SET password = $1, name = $2, responsible_name = $3, reference_phone_number = $4, administrative_proof = $5 
WHERE email_address = $6`, [password, name, responsibleName, referencePhoneNumber, administrativeProof, emailAddress]);
}

// Pas oublier de gérer la suppression par rapport au event, shuttle, ...
module.exports.deleteOrganisation = async (emailAddress, client) => {
    return await client.query(`DELETE FROM organisation WHERE email_address = $1`, [emailAddress]);
}