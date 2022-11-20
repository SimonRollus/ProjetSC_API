module.exports.getOrganisation = async (emailAddress, client) => {
    return await client.query("SELECT * FROM organisation WHERE email_address = $1", [emailAddress]);
}

module.exports.postOrganisation = async (emailAddress, password, name, responsibleName, referencePhoneNumber, administrativeProof, client) => {
    return await client.query(`INSERT INTO organisation (email_address, password, name, responsible_name, reference_phone_number, administrative_proof) 
        VALUES ($1, $2, $3, $4, $5, $6)`, [emailAddress, password, name, responsibleName, referencePhoneNumber, administrativeProof]);
}

module.exports.deleteOrganisation = async (emailAddress, client) => {
    return await client.query(`DELETE FROM organisation WHERE email_address = $1`, [emailAddress]);
}