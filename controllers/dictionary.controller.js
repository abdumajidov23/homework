
const { errorHandler } = require("../helpers/error_handler");

const Dictionary = require("../schemas/Dictionary");

const addTerm = async(req,res)=>{
    try{
        const {term} = req.body;

        const dict = await Dictionary.findOne({term:{$regex:term,$options:"i"}})
        
        if (dict) return res.status(400).send({message:"Term already exists..."})

        const newDictionary = await Dictionary.create({term,letter:term[0]})

        res.status(201).send({message: "Term created successfully...",newDictionary});

    }catch(error){

      errorHandler(res,error);  

    }

};

const getTerms = async(req, res)=>{
    try{

        res.send(await Dictionary.find());

    }catch(error){

      errorHandler(res,error);  

    }
};

const updateTermByID = async (req, res) => {

    try {

      const { id } = req.params;

      const { term } = req.body;

      const updatedDictionary = await Dictionary.findByIdAndUpdate(

        id,

        { term, letter: term[0] },

        { new: true }

      );

      res.status(200).send({

        message: "Dictionary updated successfully",

        data: updatedDictionary,

      });
    } catch (error) {

      errorHandler(res, error);

    }
};
  
const deleteTermById = async (req, res) => {

    try {

      const { id } = req.params;

      const deletedDictionary = await Dictionary.findByIdAndDelete(id);

      res.send({

        message: "Dictionary deleted successfully",

        data: deletedDictionary,

      });
    } catch (error) {

      errorHandler(res, error);
    }
};
  
const getTermsByLetter = async (req, res) => {
    try {

      const { letter } = req.params

      res.send(await Dictionary.find({ letter: { $regex: letter, $options: "i" } }));

    } catch (error) {

      errorHandler(res, error);
    }

};

const getTermsByTerm = async (req, res) => {

    try {

      const { term } = req.params;

      res.send(await Dictionary.find({ term: { $regex: term, $options: "i" } }));

    } catch (error) {

      errorHandler(res, error);
    }
};

const getTermsByQuery = async (req, res) => {

    try {

      const { term } = req.query;

      const regex = new RegExp(term, 'i');

      res.send(await Dictionary.find({term: regex }));

    } catch (error) {

      errorHandler(res, error);

    }
};

module.exports = {
    addTerm,
    getTerms,
    updateTermByID,
    deleteTermById,
    getTermsByLetter,
    getTermsByTerm,
    getTermsByQuery
};