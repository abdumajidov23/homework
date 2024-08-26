const { errorHandler } = require("../helpers/error_handler");

const Question_Answer = require("../schemas/Question_Answer");

const addQA = async (req, res) => {

  try {

    const { 
        question,
        answer, 
        create_date,
        update_date,
        is_checked,
        user_id,
        expert_id,
    } = req.body;

    const newQA = await Question_Answer.create({ question, answer, create_date, update_date, is_checked, user_id, expert_id });

    res.status(201).send({ message: "Question Answer created successfully...", newQA });

  } catch (error) {

    errorHandler(res, error);

  }

};

const getQA = async (req, res) => {

  try {

    res.send(await Question_Answer.find());

  } catch (error) {

    errorHandler(res, error);

  }
};

const updateQA = async (req, res) => {

  try {

    const {id} = req.params

    const { 
        question,
        answer,
        create_date,
        update_date,
        is_checked,
        user_id,
        expert_id
     } = req.body

    const updatedQA = await Question_Answer.findByIdAndUpdate(id, { question, answer, create_date, update_date, is_checked, user_id, expert_id }, {new: true})

    res.status(200).send({message:"Question Answer updated succesfuly...",updatedQA})

  } catch (error) {

    errorHandler(res, error);

  }

};

const deleteQA = async (req, res) => {

  try {

    const {id} = req.params

    const deleteQA = await Question_Answer.findByIdAndDelete(id)

    res.status(200).send({message:"Question Answer deleted succesfuly....", deleteQA})

  } catch (error) {

    errorHandler(res, error);

  }
};

module.exports = {
    addQA,
    getQA,
    updateQA,
    deleteQA
};
