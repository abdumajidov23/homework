const { errorHandler } = require("../helpers/error_handler");

const User = require("../schemas/User");

const { userValidation } = require("../validations/user.validation");

const bcrypt = require("bcrypt");

const config = require("config")

const jwt = require('jsonwebtoken');

const loginUser = async (req, res) => {

  try {

    const { user_email, user_password } = req.body;

    const user = await User.findOne({ user_email });

    if (!user) return res.status(400).send({ message: "Email or Password is incorrect..." });

    const validPassword = bcrypt.compareSync(user_password, user.user_password);

    if (!validPassword) return res.status(400).send({ message: "Email or Password is incorrect..." });

    const payload = {
      _id: user._id,
      email: user.user_email,
    };

    const token = jwt.sign(payload, config.get("tokenKey"),{

      expiresIn: config.get("tokenTime"),

    });
    res.cookie(
      "tokenKey",    
      token,
      { httpOnly: true },
    )
    
    res.send({message:"User logged in...", token})

  }catch (error) {

    errorHandler(res, error);

  }
};

const logoutUser = async (req, res) => {
  
    res.clearCookie("tokenKey")

    res.send({ message: "User logged out..." });

};

const getUserByToken = async (req, res) => {
  
  try{

    const tokenCookie = req.headers.cookie?.split('=')[1]
    
    if (!tokenCookie) return res.status(401).send({ message: "The token key was not accepted..." })
    
    const decodedToken = jwt.verify(tokenCookie,config.get("tokenKey"))
    
    if (!decodedToken){

      return res.status(401).send({ message: "Unauthorized User..." })

    }else{

      const { _id } = decodedToken;
      
      const user = await User.findById(_id);
      
      if (!user) return res.status(401).send({ message: "User not found..." });
      
      res.send(user);
  
    }
  } catch (errors) {

    errorHandler(res, errors);

  }
};

const addUser = async (req, res) => {

  const {error, value} = userValidation(req.body)

  if (error) return res.status(400).send({message:error.message});

  try {
    const { 
      user_name,
      user_email,
      user_password,
      user_info,
      photo_url,
      created_date,
      update_date,
      user_is_active 
    } = value;

    const user = await User.findOne({

      user_email: { $regex: user_email, $options: "i" }

    });

    if (user) return res.status(400).send({message: "User already exists..."})
    
    const hashedPassword = bcrypt.hashSync(user_password, 7);

    const newUser = await User.create({ 
      user_name, 
      user_email,
      user_password: hashedPassword,
      user_info,
      user_photo: photo_url,
      created_date,
      update_date,
      user_is_active
    });

    res.status(201).send({ message: "User created successfully...", newUser });

  } catch (error) {

    errorHandler(res, error);

  }
};

const getUser = async (req, res) => {

  try {

    res.send(await User.find());

  } catch (error) {

    errorHandler(res, error);

  }
};

const updateUser = async (req, res) => {

  try {

    const {error, value} = userValidation(req.body)

    if (error) return res.status(400).send({message:error.message});

    const {id} = req.params
    const {
      user_name,
      user_email,
      user_password,
      user_info,
      photo_url,
      created_date,
      update_date,
      user_is_active,
    } = value;

    const user = await User.findOne({

      user_email: { $regex: user_email, $options: "i" },

    });

    if (user) return res.status(400).send({ message: "User already exists..." });
    
    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        user_name,
        user_email,
        user_password,
        user_info,
        user_photo: photo_url,
        created_date,
        update_date,
        user_is_active,
      },
      { new: true }
    );

    res.status(200).send({message:"User updated succesfuly...",updatedUser})

  } catch (error) {

    errorHandler(res, error);

  }
};

const deleteUser = async (req, res) => {

  try {

    const { id } = req.params

    const deletedUser = await User.findByIdAndDelete(id)

    res.status(200).send({message:"User deleted succesfuly...", deletedUser})

  } catch (error) {

    errorHandler(res, error);

  }
};

const getUserByName = async (req, res) => {

  try {

    const { name }   = req.params;

    const user = await User.find({ user_name: { $regex: name} });

    res.send(user);

  } catch (error) {

    errorHandler(res, error);

  }
};

const getUserById = async (req, res) => {

  try {

    const { id } = req.params;

    const user = await User.findById(id);

    if (!user) return res.status(404).send({ message: "User is not available!" });
    
    res.send(user);

  } catch (error) {

    errorHandler(res, error);

  }
};

module.exports = {
    addUser,
    getUser,
    updateUser,
    deleteUser,
    getUserByName,
    getUserById,
    loginUser,
    logoutUser,
    getUserByToken,
};
