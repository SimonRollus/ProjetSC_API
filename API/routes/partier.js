const PartierController = require("../controller/partierDB");
const Router = require("express-promise-router");
const router = new Router;

router.get('/partiers', PartierController.getPartiers);
router.get('/:id', PartierController.getPartier);
router.post('/', PartierController.postPartier);
router.patch('/', PartierController.updatePartier);
router.delete('/', PartierController.deletePartier);

module.exports = router;
