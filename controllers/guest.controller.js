const { sendErrorResponse } = require("../helpers/send_error_response");
const guestSchema = require("../schemas/guest");
const { guestValidation } = require("../validation/guest.validation");

const create = async (req, res) => {
  try {
    const { error, value } = guestValidation(req.body);

    if (error) {
      return sendErrorResponse(error, res);
    }

    const newValue = await guestSchema.create(value);
    res.status(201).send({ message: "New guest  added", newValue });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const findAll = async (req, res) => {
  try {
    const values = await guestSchema.find();
    res.status(201).send({ values });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const findById = async (req, res) => {
  let { id } = req.params;
  try {
    const data = await guestSchema.findById(id);
    res.status(201).send({ data: data });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const update = async (req, res) => {
  let { id } = req.params;
  let data = req.body;
  try {
    const { error, value } = guestValidation(data);

    if (error) {
      return sendErrorResponse(error, res);
    }

    const patchValue = await guestSchema.findByIdAndUpdate(id, value);
    res.status(201).send({ message: "Updated successfully", patchValue });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const remove = async (req, res) => {
  let { id } = req.params;
  try {
    await guestSchema.findByIdAndDelete(id);
    res.status(201).send({ message: "guest topic deleted" });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};



module.exports = {
  create,
  findAll,
  findById,
  update,
  remove,
};
