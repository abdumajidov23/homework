const { errorHandler } = require("../helpers/error_handler");

const Desc_Topic = require("../schemas/Desc_Topic");

const addDescTopic = async (req, res) => {

  try {

    const { desc_id,topic_id } = req.body;

    const newDescTopic = await Desc_Topic.create({ desc_id, topic_id });

    res.status(201).send({ message: "Desc Topic created successfully...", newDescTopic });

  } catch (error) {

    errorHandler(res, error);

  }

};

const getDescTopic = async (req, res) => {

  try {

    res.send(await Desc_Topic.find());

  } catch (error) {

    errorHandler(res, error);

  }
};

const updateDescTopic = async (req, res) => {

  try {

    const {id} = req.params

    const { desc_id, topic_id } = req.body

    const updatedDescTopic = await Desc_Topic.findByIdAndUpdate(id, {desc_id, topic_id,}, {new: true})

    res.status(200).send({message:"Desc Topic updated succesfuly...",updatedDescTopic})

  } catch (error) {

    errorHandler(res, error);

  }

};

const deleteDescTopic = async (req, res) => {

  try {

    const {id} = req.params

    const deletedDescTopic = await Desc_Topic.findByIdAndDelete(id)

    res.status(200).send({message:"Desc Topic deleted succesfuly....", deletedDescTopic})

  } catch (error) {

    errorHandler(res, error);

  }
};

module.exports = {
    addDescTopic,
    getDescTopic,
    updateDescTopic,
    deleteDescTopic
};
