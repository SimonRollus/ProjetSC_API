const OrganizationController = require("../controller/organizationDB");
const Router = require("express-promise-router");
const router = new Router;

router.get('/organizations', OrganizationController.getOrganizations);
router.get('/:id', OrganizationController.getOrganization);
//router.get('/get/responsibles', OrganizationController.getUniquesResponsiblesNames);
//router.get('/get/organizations/:responsibleName', OrganizationController.getOrganizationsByResponsibleName);
router.post('/', OrganizationController.postOrganization);
router.patch('/', OrganizationController.updateOrganization);
router.delete('/:id', OrganizationController.deleteOrganization);

module.exports = router;