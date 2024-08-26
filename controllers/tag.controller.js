const { errorHandler } = require("../helpers/error_handler");

const Tag = require("../schemas/Tag");

const addTag = async (req, res) => {

  try {

    const { topic_id,category_id } = req.body;

    const newTag = await Tag.create({ topic_id, category_id });

    res.status(201).send({ message: "Tag created successfully...", newTag });

  } catch (error) {

    errorHandler(res, error);

  }

};

const getTag = async (req, res) => {

  try {

    res.send(await Tag.find());

  } catch (error) {

    errorHandler(res, error);

  }
};

const updateTag = async (req, res) => {

  try {

    const {id} = req.params

    const { topic_id, category_id } = req.body

    const updatedTag = await Tag.findByIdAndUpdate(id, {topic_id,category_id}, {new: true})

    res.status(200).send({message:"Tag updated succesfuly...",updatedTag})

  } catch (error) {

    errorHandler(res, error);

  }

};

const deleteTag = async (req, res) => {

  try {

    const {id} = req.params

    const deleteTag = await Tag.findByIdAndDelete(id)

    res.status(200).send({message:"Tag deleted succesfuly....", deleteTag})

  } catch (error) {

    errorHandler(res, error);

  }
};

module.exports = {
    addTag,
    getTag,
    updateTag,
    deleteTag
};
