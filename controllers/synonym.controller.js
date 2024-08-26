const { errorHandler } = require("../helpers/error_handler");

const Synonym = require("../schemas/Synonym");

const addSynonym = async (req, res) => {

  try {

    const { desc_id, dict_id } = req.body;

    const newSynonym = await Synonym.create({ desc_id, dict_id});

    res.status(201).send({ message: "Synonym created successfully...", newSynonym });

  } catch (error) {

    errorHandler(res, error);

  }

};

const getSynonyms = async (req, res) => {

  try {

    res.send(await Synonym.find());

  } catch (error) {

    errorHandler(res, error);

  }
};

const updateSynonym = async (req, res) => {

  try {

    const {id} = req.params

    const {desc_id, dict_id} = req.body

    const updatedSynonym = await Synonym.findByIdAndUpdate(id, {desc_id,dict_id}, {new: true})

    res.status(200).send({message:"Synonym updated succesfuly...",updatedSynonym})

  } catch (error) {

    errorHandler(res, error);

  }
};

const deleteSynonym = async (req, res) => {

  try {

    const {id} = req.params

    const deletedSynonym = await Synonym.findByIdAndDelete(id)

    res.status(200).send({message:"Synonym deleted succesfuly...", deletedSynonym})

  } catch (error) {

    errorHandler(res, error);

  }
};

const getSynonymById = async (req, res) => {

  try {

    const { id } = req.params;

    console.log(id);

    const synonym = await Synonym.findById(id);

    if (!synonym) return res.status(404).send({ message: "Synonym is not available!" });

    res.send(synonym);

  } catch (error) {

    errorHandler(res, error);

  }
};

module.exports = {
  addSynonym,
  getSynonyms,
  updateSynonym,
  deleteSynonym,
  getSynonymById,
};
