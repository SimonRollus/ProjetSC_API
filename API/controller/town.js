const pool = require('../model/database');
const TownModel = require('../model/town');

module.exports.getTown = async (req, res) => {
    const client = await pool.connect();
    const name = req.params.name;
    const zipCode = parseInt(req.params.zipCode);

    try {
        if (isNaN(zipCode)) {
            res.sendStatus(400);
        } else {
            const {rows: towns} = await TownModel.getTown(name, zipCode, client);
            const town = towns[0];

            if (town !== undefined) {
                res.json(town);
            } else {
                res.sendStatus(404);
            }
        }
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    } finally {
        client.release();
    }
}

module.exports.getTowns = async (res) => {
    const client = await pool.connect();

    try {
        
        const {rows: towns} = await TownModel.getTowns(client);

        if (towns == undefined) {
            res.sendStatus(404);
            return;
        }

        res.json(towns);

    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    } finally {
        client.release();
    }
}
