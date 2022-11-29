const OrganizationController = require("../controller/organizationDB");
const Router = require("express-promise-router");
const router = new Router;

router.get('/', OrganizationController.getOrganizations);
router.get('/responsibles', OrganizationController.getUniquesResponsiblesNames);
router.get('/:emailAddress', OrganizationController.getOrganization);
router.post('/', OrganizationController.postOrganization);
router.patch('/', OrganizationController.updateOrganization);
router.delete('/', OrganizationController.deleteOrganization);

module.exports = router;