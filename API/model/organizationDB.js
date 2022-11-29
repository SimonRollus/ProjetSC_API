// Get pour une seule organisation
module.exports.getOrganization = async (emailAddress, client) => {
    return await client.query("SELECT * FROM organization WHERE emailAddress = $1", [emailAddress]);
}

// Get de toutes les organisations
module.exports.getOrganizations = async (client) => {
    return await client.query(`SELECT * FROM organization`);
}

module.exports.postOrganization = async (emailAddress, password, name, responsibleName, referencePhoneNumber, administrativeProof, client) => {
    return await client.query(`INSERT INTO organization (emailAddress, password, name, responsibleName, referencePhoneNumber, administrativeProof) 
        VALUES ($1, $2, $3, $4, $5, $6)`, [emailAddress, password, name, responsibleName, referencePhoneNumber, administrativeProof]);
}

module.exports.updateOrganization = async (emailAddress, password, name, responsibleName, referencePhoneNumber, administrativeProof, client) => {
    return await client.query(`UPDATE organization SET password = $1, name = $2, responsibleName = $3, referencePhoneNumber = $4, administrativeProof = $5 
WHERE emailAddress = $6`, [password, name, responsibleName, referencePhoneNumber, administrativeProof, emailAddress]);
}

// Pas oublier de gérer la suppression par rapport au event, shuttle, ...
module.exports.deleteOrganization = async (emailAddress, client) => {
    return await client.query(`DELETE FROM organization WHERE emailAddress = $1`, [emailAddress]);
}