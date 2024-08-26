const express = require('express');

const router = express.Router();

router.use("/dict", require("./dictionary.routes"));

router.use("/category", require("./category.routes"));

router.use("/author", require("./author.routes"));

router.use("/desc", require("./description.routes"));

router.use("/synonym", require("./synonym.routes"));

router.use("/user", require("./user.routes"));

router.use("/admin", require("./admin.routes"));

router.use("/guest", require("./guest.routes"));

router.use("/topic", require("./topic.routes"));

module.exports = router;