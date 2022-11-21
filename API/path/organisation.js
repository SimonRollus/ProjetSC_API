const OrganisationController = require("../controller/organisationDB");
const Router = require("express-promise-router");
const router = new Router;

router.get('/:emailAddress', OrganisationController.getOrganisation);
router.post('/', OrganisationController.postOrganisation);
router.patch('/', OrganisationController.updateOrganisation);
router.delete('/', OrganisationController.deleteOrganisation);

module.exports = router;