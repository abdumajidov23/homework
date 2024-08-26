const express = require("express");

const {
  getGuest,
  addGuest,
  updateGuestById,
  deleteGuestById,
  getGuestById,
} = require("../controllers/guest.controller");

const router = express.Router();

router.get("/get", getGuest);

router.get("/:id", getGuestById);

router.post("/create", addGuest);

router.put("/:id", updateGuestById);

router.delete("/:id", deleteGuestById);

module.exports = router;
