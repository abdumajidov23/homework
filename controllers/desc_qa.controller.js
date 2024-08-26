const { errorHandler } = require("../helpers/error_handler");

const Desc_Qa = require("../schemas/Desc_Qa");

const addDescQa = async (req, res) => {

  try {

    const { qa_id,social_id } = req.body;

    const newDescQa = await Desc_Qa.create({ qa_id, social_id });

    res.status(201).send({ message: "Desc question answer created successfully...", newDescQa });

  } catch (error) {

    errorHandler(res, error);

  }

};

const getDescQa = async (req, res) => {

  try {

    res.send(await Desc_Qa.find());

  } catch (error) {

    errorHandler(res, error);

  }
};

const updateDescQa = async (req, res) => {

  try {

    const {id} = req.params

    const { qa_id, social_id } = req.body

    const updatedDescQa = await Desc_Qa.findByIdAndUpdate(id, {qa_id, social_id,}, {new: true})

    res.status(200).send({message:"Desc question answer updated succesfuly...",updatedDescQa})

  } catch (error) {

    errorHandler(res, error);

  }

};

const deleteDescQa = async (req, res) => {

  try {

    const {id} = req.params

    const deletedDescQa = await Desc_Qa.findByIdAndDelete(id)

    res.status(200).send({message:"Desc question answer deleted succesfuly....", deletedDescQa})

  } catch (error) {

    errorHandler(res, error);

  }
};

module.exports = {
  addDescQa,
  getDescQa,
  updateDescQa,
  deleteDescQa,
};
