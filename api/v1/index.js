const router = require("express").Router();

router.use("/user", require("./controllers/userController"));
router.use("/auth", require("./controllers/authController"));
router.use("/gig", require("./controllers/gigController"));

router.get("/health", (req, res) => {
  res.send({ status: "UP" });
});

module.exports = router;
