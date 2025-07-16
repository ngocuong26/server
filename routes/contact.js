const express = require("express");
const router = express.Router();
const contactController = require("../controllers/contactController");

router.post('/create', contactController.contactCreate);
router.get('/pending', contactController.contactPending);
router.get('/reflied', contactController.contactreflied);
router.post('/refly', contactController.contactRefly);

module.exports = router;