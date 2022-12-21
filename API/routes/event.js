const EventController = require('../controller/event');
const Router = require('express-promise-router');
const router = new Router;

router.get('/all', EventController.getEvents);
router.get('town/:town', EventController.getEventsByTown);
router.get('/organization/:organizationId', EventController.getEventsByOrganization);

module.exports = router;