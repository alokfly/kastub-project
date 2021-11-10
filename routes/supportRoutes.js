const app = require("express");
const router = app.Router();
const { addSupport } = require("../controllers/SupportController");
router.post("/addSupport", addSupport);

module.exports = router;
