const OrganisationRouter = require("./organisation");
const router = require("express").Router();

router.use("/organisation", OrganisationRouter);

module.exports = router;