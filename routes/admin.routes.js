const express = require("express");

const {
  addAdmin,
  getAdmin,
  updateAdmin,
  deleteAdmin,
  getAdminByName,
  getAdminById,
  loginAdmin,
  logoutAdmin,
  getAdminByToken,
} = require("../controllers/admin.controller");

const router = express.Router();

router.post("/login", loginAdmin);

router.get("/logout", logoutAdmin);

router.get("/token", getAdminByToken);

router.post("/create", addAdmin);

router.get("/get", getAdmin);

router.put("/:id", updateAdmin);

router.delete("/:id", deleteAdmin);

router.get("/name/:name", getAdminByName);

router.get("/:id", getAdminById);

module.exports = router;
