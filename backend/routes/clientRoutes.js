const router = require("express").Router();
const { addClient, getClients } = require("../controllers/clientController");

router.post("/", addClient);
router.get("/", getClients);

module.exports = router;

