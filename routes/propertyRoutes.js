const app = require("express");
const router = app.Router();
const {
  addProperty,
  getproperty,
  updateproperty,
  deleteProperty,
} = require("../controllers/PropertyController");
router.post("/addProperty", addProperty);
router.get("/getproperty", getproperty);
router.post("/updateproperty/:id", updateproperty);
router.get("/deleteProperty/:id", deleteProperty);

module.exports = router;
