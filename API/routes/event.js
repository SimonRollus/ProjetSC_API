const EventController = require('../controller/event');
const Router = require('express-promise-router');
const router = new Router;

router.get('/all', EventController.getEvents);

module.exports = router;