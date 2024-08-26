const { errorHandler } = require("../helpers/error_handler");

const Topic = require("../schemas/Topic");

const { topicValidation } = require("../validations/topic.validation");

const addTopic = async (req, res) => {
  try {
    const {
      author_id,
      topic_title,
      topic_text,
      is_checked,
      is_approved,
      expert_id,
    } = req.body;
    const newTopic = await Topic.create({
      author_id,
      topic_title,
      topic_text,
      is_checked,
      is_approved,
      expert_id,
    });
    res
      .status(201)
      .send({ message: "Topic created successfully...", newTopic });
  } catch (error) {
    errorHandler(res, error);
  }
};

const getTopic = async (req, res) => {
  try {
    const topic = await Topic.find();
    res.send(topic);
  } catch (error) {
    errorHandler(res, error);
  }
};

const getTopicById = async (req, res) => {
  try {
    const { id } = req.params;
    const topic = await Topic.findById(id);
    res.send(topic);
  } catch (error) {
    errorHandler(res, error);
  }
};

const updateTopicById = async (req, res) => {
  try {
    const { id } = req.params;
    const { error, value } = topicValidation(req.body);
    if (error) return res.status(400).send({ message: error.message });
    const {
      author_id,
      topic_title,
      topic_text,
      is_checked,
      is_approved,
      expert_id,
    } = value;
    const topic = await Topic.findByIdAndUpdate(id, {
      author_id,
      topic_title,
      topic_text,
      is_checked,
      is_approved,
      expert_id,
    });
    res.send({ message: "Topic updated successfully...", topic });
  } catch (error) {
    errorHandler(res, error);
  }
};

const deleteTopicById = async (req, res) => {
  try {
    const { id } = req.params;
    const topic = await Topic.findByIdAndDelete(id);
    res.send({ message: "Topic deleted successfully...", topic });
  } catch (error) {
    errorHandler(res, error);
  }
};

module.exports = {
  addTopic,
  getTopic,
  getTopicById,
  updateTopicById,
  deleteTopicById,
};
