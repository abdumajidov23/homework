const { errorHandler } = require("../helpers/error_handler");

const Admin = require("../schemas/Admin");

const { adminValidation } = require("../validations/admin.validation");

const bcrypt = require("bcrypt");

const config = require("config");

const jwt = require("jsonwebtoken");

const loginAdmin = async (req, res) => {
  try {
    const { admin_email, admin_password } = req.body;

    const admin = await Admin.findOne({ admin_email });

    if (!admin)
      return res
        .status(400)
        .send({ message: "Email or Password is incorrect..." });

    const validPassword = bcrypt.compareSync(
      admin_password,
      admin.admin_password
    );

    if (!validPassword)
      return res
        .status(400)
        .send({ message: "Email or Password is incorrect..." });

    const payload = {
      _id: admin._id,
      email: admin.admin_email,
    };

    const token = jwt.sign(payload, config.get("tokenKey"), {
      expiresIn: config.get("tokenTime"),
    });
    res.cookie("tokenKey", token, { httpOnly: true });

    res.send({ message: "Admin logged in...", token });
  } catch (error) {
    errorHandler(res, error);
  }
};

const logoutAdmin = async (req, res) => {
  res.clearCookie("tokenKey");

  res.send({ message: "Admin logged out..." });
};

const getAdminByToken = async (req, res) => {
  try {
    const tokenCookie = req.headers.cookie?.split("=")[1];

    if (!tokenCookie)
      return res
        .status(401)
        .send({ message: "The token key was not accepted..." });

    const decodedToken = jwt.verify(tokenCookie, config.get("tokenKey"));

    if (!decodedToken) {
      return res.status(401).send({ message: "Unauthorized Admin..." });
    } else {
      const { _id } = decodedToken;

      const admin = await Admin.findById(_id);

      if (!admin)
        return res.status(401).send({ message: "Admin not found..." });

      res.send(admin);
    }
  } catch (errors) {
    errorHandler(res, errors);
  }
};

const addAdmin = async (req, res) => {
  try {
    const { error, value } = adminValidation(req.body);

    if (error) return res.status(400).send({ message: error.message });

    const {
      admin_name,
      admin_email,
      admin_phone,
      admin_password,
      admin_is_active,
      admin_is_creater,
      created_date,
      updated_date,
    } = value;

    const admin = await Admin.findOne({
      admin_email: { $regex: admin_email, $options: "i" },
    });

    if (admin)
      return res.status(400).send({ message: "Admin already exists..." });

    const hashedPassword = bcrypt.hashSync(admin_password, 7);

    const newAdmin = await Admin.create({
      admin_name,
      admin_email,
      admin_phone,
      admin_password: hashedPassword,
      admin_is_active,
      admin_is_creater,
      created_date,
      updated_date,
    });

    res
      .status(201)
      .send({ message: "Admin created successfully...", newAdmin });
  } catch (error) {
    errorHandler(res, error);
  }
};

const getAdmin = async (req, res) => {
  try {
    res.send(await Admin.find());
  } catch (error) {
    errorHandler(res, error);
  }
};

const updateAdmin = async (req, res) => {
  try {
    const { error, value } = adminValidation(req.body);

    if (error) return res.status(400).send({ message: error.message });

    const { id } = req.params;

    const {
      admin_name,
      admin_email,
      admin_phone,
      admin_password,
      admin_is_active,
      admin_is_creater,
      created_date,
      updated_date,
    } = value;

    const admin = await Admin.findOne({
      admin_email: { $regex: admin_email, $options: "i" },
    });

    if (admin)
      return res.status(400).send({ message: "Admin already exists..." });

    const updatedAdmin = await Admin.findByIdAndUpdate(
      id,
      {
        admin_name,
        admin_email,
        admin_phone,
        admin_password,
        admin_is_active,
        admin_is_creater,
        created_date,
        updated_date,
      },
      { new: true }
    );

    res
      .status(200)
      .send({ message: "Author updated succesfuly...", updatedAdmin });
  } catch (error) {
    errorHandler(res, error);
  }
};

const deleteAdmin = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedAdmin = await Admin.findByIdAndDelete(id);

    res
      .status(200)
      .send({ message: "Admin deleted succesfuly...", deletedAdmin });
  } catch (error) {
    errorHandler(res, error);
  }
};

const getAdminByName = async (req, res) => {
  try {
    const { name } = req.params;

    const admin = await Admin.find({ admin_name: { $regex: name } });

    res.send(admin);
  } catch (error) {
    errorHandler(res, error);
  }
};

const getAdminById = async (req, res) => {
  try {
    const { id } = req.params;

    const admin = await Admin.findById(id);

    if (!admin)
      return res.status(404).send({ message: "Admin is not available!" });

    res.send(admin);
  } catch (error) {
    errorHandler(res, error);
  }
};

module.exports = {
  addAdmin,
  getAdmin,
  updateAdmin,
  deleteAdmin,
  getAdminByName,
  getAdminById,
  loginAdmin,
  logoutAdmin,
  getAdminByToken,
};
