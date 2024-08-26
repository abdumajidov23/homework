const { errorHandler } = require("../helpers/error_handler");

const Description = require("../schemas/Description");

const addDescription = async (req, res) => {

  try {

    const { category_id, description } = req.body;

    const newDescription = await Description.create({ category_id, description});

    res.status(201).send({ message: "Description created successfully...", newDescription });

  } catch (error) {

    errorHandler(res, error);

  }

};

const getDescriptions = async (req, res) => {

  try {

    res.send(await Description.find());

  } catch (error) {

    errorHandler(res, error);

  }
};

const updateDescription = async (req, res) => {

  try {

    const {id} = req.params

    const {category_id, description} = req.body

    const updatedDescription = await Description.findByIdAndUpdate(id, {category_id,description}, {new: true})

    res.status(200).send({message:"Description updated succesfuly...",updatedDescription})

  } catch (error) {

    errorHandler(res, error);

  }

};

const deleteDescription = async (req, res) => {

  try {

    const {id} = req.params

    const deletedDescription = await Description.findByIdAndDelete(id)

    res.status(200).send({message:"Description deleted succesfuly....", deletedDescription})

  } catch (error) {

    errorHandler(res, error);

  }
};

const getDescriptionById = async (req, res) => {

  try {

    const { id } = req.params;

    const description = await Description.findById(id);

    if (!description) return res.status(404).send({ message: "Desciption is not available!" });

    res.send(description);

  } catch (error) {

    errorHandler(res, error);
  }
};

module.exports = {
  addDescription,
  getDescriptions,
  updateDescription,
  deleteDescription,
  getDescriptionById,
};
