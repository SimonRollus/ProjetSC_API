const pool = require('../model/database');
const OrganisationModel = require('../model/organisationDB');

module.exports.getOrganisation = async (req, res) => {
    const client = await pool.connect();
    const emailAddress = req.params.emailAddress;

    try {
        const {rows: organisations} = await OrganisationModel.getOrganisation(emailAddress, client);
        const organisation = organisations[0];
        if (organisation !== undefined) {
            res.json(organisation);
        } else {
            res.sendStatus(404);
        }
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    } finally {
        client.release();
    }
}

module.exports.postOrganisation = async (req, res) => {
    const client = await pool.connect();
    const body = req.body;
    const {emailAddress, password, name, responsibleName, referencePhoneNumber, administrativeProof} = body;

    try {
        const {rows} = await OrganisationModel.postOrganisation(emailAddress, password, name, responsibleName, referencePhoneNumber, administrativeProof, client);
        res.sendStatus(201);
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    } finally {
        client.release();
    }
}

module.exports.deleteOrganisation = async (req, res) => {
    const client = await pool.connect();
    const {emailAddress} = req.body;

    try {
        await OrganisationModel.deleteOrganisation(emailAddress, client);
        res.sendStatus(204);
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    } finally {
        client.release();
    }
}