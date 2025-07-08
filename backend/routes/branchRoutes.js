const router = require("express").Router();
const { getBranches, addBranch } = require("../controllers/branchController");

router.get("/", getBranches);
router.post("/", addBranch);

module.exports = router;
