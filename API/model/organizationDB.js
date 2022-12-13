// Get pour une seule organisation

module.exports.getOrganization = async (id, client) => {
    return await client.query("SELECT * FROM organization WHERE id = $1", [id]);
}

// Get de toutes les organisations
module.exports.getOrganizations = async (client) => {
    return await client.query(`SELECT * FROM organization`);
}

// Get des responsible names uniques
/*
module.exports.getUniquesResponsiblesNames = async (client) => {
    return await client.query("SELECT DISTINCT responsibleName FROM organization");
}
*/

// Get des organisations par responsable
/*
module.exports.getOrganizationsByResponsibleName = async (client, responsibleName) => {
    return await client.query("SELECT * FROM organization WHERE responsibleName = $1", [responsibleName]);
}
*/

module.exports.postOrganization = async (emailAddress, password, name, responsibleName, referencePhoneNumber, administrativeProof, client) => {
    return await client.query(`INSERT INTO organization (emailaddress, password, name, responsiblename, referencephonenumber, administrativeproof) 
        VALUES ($1, $2, $3, $4, $5, $6) RETURNING id`, [emailAddress, password, name, responsibleName, referencePhoneNumber, administrativeProof]);
}


module.exports.updateOrganization = async (id, emailAddress, password, name, responsibleName, referencePhoneNumber, administrativeProof, client) => {
    return await client.query(`UPDATE organization SET emailaddress = $2, password = $3, name = $4, responsiblename = $5, referencephonenumber = $6, administrativeproof = $7 
        WHERE id = $1`, [id, emailAddress, password, name, responsibleName, referencePhoneNumber, administrativeProof]);
}


// Pas oublier de gérer la suppression par rapport au event, shuttle, ...
module.exports.deleteOrganization = async (id, client) => {
    return await client.query(`DELETE FROM organization WHERE id = $1`, [id]);
}
