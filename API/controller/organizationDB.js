const pool = require('../model/database');
const OrganizationModel = require('../model/organizationDB');

module.exports.getOrganization = async (req, res) => {
    const client = await pool.connect();
    const id = req.params.id;

    try {
        const {rows: organizations} = await OrganizationModel.getOrganization(id, client);
        const organization = organizations[0];
        if (organization !== undefined) {
            res.json(organization);
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

module.exports.getOrganizations = async (req, res) => {
    const client = await pool.connect();

    try {
        const {rows: organizations} = await OrganizationModel.getOrganizations(client);
        if (organizations !== undefined) {
            res.json(organizations);
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

/*
module.exports.getUniquesResponsiblesNames = async (req, res) => {
    const client = await pool.connect();

    try {
        const {rows: responsiblesNames} = await OrganizationModel.getUniquesResponsiblesNames(client);
        if (responsiblesNames !== undefined) {
            res.json(responsiblesNames);
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
*/

/*
module.exports.getOrganizationsByResponsibleName = async (req, res) => {
    const client = pool.connect();
    const responsibleName = req.params.responsibleName;

    try {
        const {rows: organizations} = await OrganizationModel.getOrganizationsByResponsibleName(client, responsibleName);
        if (organizations !== undefined) {
            res.json(responsibleName);
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
*/

module.exports.postOrganization = async (req, res) => {
    const client = await pool.connect();
    const {emailAddress, password, name, responsibleName, referencePhoneNumber, administrativeProof} = req.body;

    try {
        await OrganizationModel.postOrganization(emailAddress, password, name, responsibleName, referencePhoneNumber, administrativeProof, client);
        res.sendStatus(201);
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    } finally {
        client.release();
    }
}

module.exports.updateOrganization = async (req, res) => {
    const client = await pool.connect();
    const {emailAddress, password, name, responsibleName, referencePhoneNumber, administrativeProof} = req.body;

    try {
        await OrganizationModel.updateOrganization(emailAddress, password, name, responsibleName, referencePhoneNumber, administrativeProof, client);
        res.sendStatus(204);
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    } finally {
        client.release();
    }
}

module.exports.deleteOrganization = async (req, res) => {
    const client = await pool.connect();
    const {emailAddress} = req.body;

    try {
        await OrganizationModel.deleteOrganization(emailAddress, client);
        res.sendStatus(204);
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    } finally {
        client.release();
    }
}