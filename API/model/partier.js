// Get d'un seul partier
module.exports.getPartier = async (emailAddress, client) => {
    return await client.query(`SELECT * FROM partier WHERE email_address = $1`, [emailAddress]);
}

// Get de tous les partiers
module.exports.getPartiers = async (client) => {
    return await client.query(`SELECT * FROM partier`);
}

module.exports.postPartier = async (emailAddress, pseudo, password, firstName, lastName, picture, phoneNumber, refPhoneNumber, addressTown, addressZipCode, client) => {
    return await client.query(`INSERT INTO partier (email_address, pseudo, password, first_name, last_name, picture, phone_number, ref_phone_number, address_town, address_zip_code)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`, [emailAddress, pseudo, password, firstName, lastName, picture, phoneNumber, refPhoneNumber, addressTown, addressZipCode]);
}

// Gérer le changement de shuttle si la personne change son adresse
module.exports.updatePartier = async (emailAddress, pseudo, password, firstName, lastName, picture, phoneNumber, refPhoneNumber, addressTown, addressZipCode, client) => {
    return await client.query(`UPDATE partier SET pseudo = $1, password = $2, first_name = $3, last_name = $4, picture = $5, phone_number = $6,
                   ref_phone_number = $7, address_name = $8, address_zip_code = $9 WHERE email_address = $10`,
        [emailAddress, pseudo, password, firstName, lastName, picture, phoneNumber, refPhoneNumber, addressTown, addressZipCode]);
}

// Gérer la suppression de shuttle_member et la vérification des shuttles si suppression
module.exports.deletePartier = async (emailAddress, client) => {
    return await client.query(`DELETE FROM partier WHERE email_address = $1`, [emailAddress]);
}