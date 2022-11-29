const OrganizationRouter = require("./organization");
const router = require("express").Router();

router.use("/organization", OrganizationRouter);

module.exports = router;