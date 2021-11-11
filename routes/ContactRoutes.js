const app = require("express");
const router = app.Router();
const { addContact } = require("../controllers/ContactController");
router.post("/addContact", addContact);

module.exports = router;
