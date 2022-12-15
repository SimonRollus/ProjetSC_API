const OrganizationController = require("../controller/organization");
const Router = require("express-promise-router");
const router = new Router;

router.get('/all', OrganizationController.getOrganizations);
/* router.get('/:id', OrganizationController.getOrganization);
router.post('/', OrganizationController.postOrganization);
router.patch('/', OrganizationController.updateOrganization);
router.delete('/:id', OrganizationController.deleteOrganization); */

module.exports = router;