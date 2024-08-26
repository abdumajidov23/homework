const { errorHandler } = require("../helpers/error_handler");

const Guest = require("../schemas/Guest");

const { guestValidation } = require("../validations/guest.validation");

const addGuest = async (req, res) => {
  try {
    const { guest_ip, guest_os, guest_browser, guest_device } = req.body;
    const newGuest = await Guest.create({
      guest_ip,
      guest_os,
      guest_browser,
      guest_device,
    });
    res
      .status(201)
      .send({ message: "Guest created successfully...", newGuest });
  } catch (error) {
    errorHandler(res, error);
  }
};

const getGuest = async (req, res) => {
  try {
    const guest = await Guest.find();
    res.send(guest);
  } catch (error) {
    errorHandler(res, error);
  }
};

const getGuestById = async (req, res) => {
  try {
    const { id } = req.params;
    const guest = await Guest.findById(id);
    res.send(guest);
  } catch (error) {
    errorHandler(res, error);
  }
};

const updateGuestById = async (req, res) => {
  try {
    const { id } = req.params;
    const { error, value } = guestValidation(req.body);
    if (error) return res.status(400).send({ message: error.message });
    const { guest_ip, guest_os, guest_browser, guest_device } = value;
    const guest = await Guest.findByIdAndUpdate(id, {
      guest_ip,
      guest_os,
      guest_browser,
      guest_device,
    });
    res.send({ message: "Guest updated successfully...", guest });
  } catch (error) {
    errorHandler(res, error);
  }
};

const deleteGuestById = async (req, res) => {
  try {
    const { id } = req.params;
    const guest = await Guest.findByIdAndDelete(id);
    res.send({ message: "Guest deleted successfully...", guest });
  } catch (error) {
    errorHandler(res, error);
  }
};

module.exports = {
  addGuest,
  getGuest,
  getGuestById,
  updateGuestById,
  deleteGuestById,
};
