const OrganizationController = require("../controller/organizationDB");
const Router = require("express-promise-router");
const router = new Router;

router.get('/:emailAddress', OrganizationController.getOrganization);
router.get('/', OrganizationController.getOrganizations);
router.post('/', OrganizationController.postOrganization);
router.patch('/', OrganizationController.updateOrganization);
router.delete('/', OrganizationController.deleteOrganization);

module.exports = router;