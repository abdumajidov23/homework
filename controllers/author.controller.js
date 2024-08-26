const { errorHandler } = require("../helpers/error_handler");

const Author = require("../schemas/Author");

const { authorValidation } = require("../validations/author.validation");

const bcrypt = require("bcrypt");

const config = require("config")

const jwt = require('jsonwebtoken');

const addAuthor = async (req, res) => {

  try {

    const {error, value} = authorValidation(req.body)

    if (error) return res.status(400).send({message:error.message});

    const { 
      first_name,
      last_name,
      full_name,
      nick_name,
      email,
      phone,
      password,
      info,
      position,
      photo_url,
      is_expert,
      is_active 
    } = value;

    const author = await Author.findOne({

      email: { $regex: email, $options: "i" }

    });

    if (author) return res.status(400).send({message: "Author already exists..."})
    
    const hashedPassword = bcrypt.hashSync(password, 7);

    const newAuthor = await Author.create({ 
      first_name, 
      last_name, 
      full_name,
      nick_name,
      email,
      phone,
      password: hashedPassword,
      info,
      position,
      photo: photo_url,
      is_expert,
      is_active
    });

    res.status(201).send({ message: "Author created successfully...", newAuthor });

  } catch (error) {

    errorHandler(res, error);

  }
};

const loginAuthor = async (req, res) => {
  try {

    const { email, password } = req.body;

    const author = await Author.findOne({ email });

    if (!author) return res.status(400).send({ message: "Email or Password is incorrect..." });

    const validPassword = bcrypt.compareSync(password, author.password);

    if (!validPassword) return res.status(400).send({ message: "Email or Password is incorrect..." });

    const payload = {
      _id: author._id,
      email: author.email,
    };

    const token = jwt.sign(payload, config.get("tokenKey"),{

      expiresIn: config.get("tokenTime"),

    });
    res.cookie(
      "tokenKey",    
      token,
      { httpOnly: true },
    )
    
    res.send({message:"Author logged in...", token})

  }catch (error) {

    errorHandler(res, error);

  }
};

const logoutAuthor = async (req, res) => {
  
    res.clearCookie("tokenKey")

    res.send({ message: "Author logged out..." });

};

const getAuthorByToken = async (req, res) => {
  
  try{

    const tokenCookie = req.headers.cookie?.split('=')[1]
    
    if (!tokenCookie) return res.status(401).send({ message: "The token key was not accepted..." })
    
    const decodedToken = jwt.verify(tokenCookie,config.get("tokenKey"))
    
    if (!decodedToken){

      return res.status(401).send({ message: "Unauthorized Author..." })

    }else{

      const { _id } = decodedToken;
      
      const author = await Author.findById(_id);
      
      if (!author) return res.status(401).send({ message: "Author not found..." });
      
      res.send(author);
  
    }
  } catch (errors) {

    errorHandler(res, errors);

  }
};

const getAuthors = async (req, res) => {

  try {

    res.send(await Author.find());
    
    
  } catch (error) {
    
    errorHandler(res, error);

  }
};

const updateAuthor = async (req, res) => {
  try {

    const {error, value} = authorValidation(req.body)

    if (error) return res.status(400).send({message:error.message});

    const {id} = req.params

    const {
      first_name,
      last_name,
      nick_name,
      full_name,
      email,
      phone,
      password,
      info,
      position,
      photo_url,
      is_expert,
      is_active,
    } = value;

    const author = await Author.findOne({

      email: { $regex: email, $options: "i" },

    });

    if (author) return res.status(400).send({ message: "Author already exists..." });
    
    const updatedAuthor = await Author.findByIdAndUpdate(
      id,
      {
        first_name,
        last_name,
        nick_name,
        full_name,
        email,
        phone,
        password,
        info,
        position,
        photo: photo_url,
        is_expert,
        is_active,
      },
      { new: true }
    );

    res.status(200).send({message:"Author updated succesfuly...",updatedAuthor})

  } catch (error) {

    errorHandler(res, error);

  }
};

const deleteAuthor = async (req, res) => {

  try {

    const { id } = req.params

    const deletedAuthor = await Author.findByIdAndDelete(id)

    res.status(200).send({message:"Author deleted succesfuly...", deletedAuthor})

  } catch (error) {

    errorHandler(res, error);

  }
};

const getAuthorByName = async (req, res) => {

  try {

    const { name }   = req.params;

    const author = await Author.find({ nick_name: { $regex: name} });

    res.send(author);

  } catch (error) {

    errorHandler(res, error);

  }
};

const getAuthorById = async (req, res) => {

  try {

    const { id } = req.params;

    const author = await Author.findById(id);

    if (!author) return res.status(404).send({ message: "Author is not available!" });
    
    res.send(author);

  } catch (error) {

    errorHandler(res, error);

  }
};

module.exports = {
  addAuthor,
  getAuthors,
  updateAuthor,
  deleteAuthor,
  getAuthorByName,
  getAuthorById,
  loginAuthor,
  logoutAuthor,
  getAuthorByToken,
};
