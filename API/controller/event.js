const pool = require('../model/database');
const EventModel = require('../model/event');

module.exports.getEvent = async (req, res) => {
    const client = await pool.connect();
    const id = req.params.id;

    try {
        const {rows: events} = await EventModel.getEvent(id, client);
        const event = events[0];
        if (event !== undefined) {
            res.json(event);
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

module.exports.getEvents = async (req, res) => {
    const client = await pool.connect();

    try {
        
        const {rows: events} = await EventModel.getEvents(client);

        if (events == undefined) {
            res.sendStatus(404);
            return;
        }

        res.json(events);

    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    } finally {
        client.release();
    }
}