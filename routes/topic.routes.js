const express = require("express");

const {
  getTopic,
  addTopic,
  updateTopicById,
  deleteTopicById,
  getTopicById,
} = require("../controllers/topic.controller");

const router = express.Router();

router.get("/get", getTopic);

router.get("/:id", getTopicById);

router.post("/create", addTopic);

router.put("/:id", updateTopicById);

router.delete("/:id", deleteTopicById);

module.exports = router;
