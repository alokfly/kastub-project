const app = require("express");
const router = app.Router();
var multer = require("multer");
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "_" + file.originalname);
  },
});

var upload = multer({ storage: storage });
const {
  register,
  registerValiations,
  loginValiations,
  login,
  updateProfile,
  getUserDetail,
  emailSend,
  changePassword,
} = require("../controllers/UserController");
router.post("/register", registerValiations, register);
router.post("/login", loginValiations, login);
router.post("/updateProfile/:id", upload.single("myField"), updateProfile);
router.get("/getUserDetail/:id", getUserDetail);
router.post("/email-send", emailSend);
router.post("/change-password", changePassword);

module.exports = router;
