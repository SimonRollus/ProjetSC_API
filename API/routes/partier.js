const PartierController = require("../controller/partier");
const Router = require("express-promise-router");
const router = new Router;

router.get('/all', PartierController.getPartiers);
/* router.get('/:id', PartierController.getPartier);
router.post('/', PartierController.postPartier);
router.patch('/', PartierController.updatePartier);
router.delete('/', PartierController.deletePartier); */

module.exports = router;
