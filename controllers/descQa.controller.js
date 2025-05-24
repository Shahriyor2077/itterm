
const { sendErrorResponse } = require("../helpers/send_error_response");
const descQaSchema = require("../schemas/descQa");
const { descQaValidation } = require("../validation/descQa.validation");

const create = async (req, res) => {
  try {
    const { error, value } = descQaValidation(req.body);

    if (error) {
      return sendErrorResponse(error, res);
    }

    const newValue = await descQaSchema.create(value);
    res.status(201).send({ message: "New qa added", newValue });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const findAll = async (req, res) => {
  try {
    const values = await descQaSchema.find();
    res.status(200).send({ values });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const findById = async (req, res) => {
  let { id } = req.params;
  try {
    const data = await descQaSchema.findById(id);
    res.status(200).send({ data });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const update = async (req, res) => {
  let { id } = req.params;
  let data = req.body;
  try {
    const { error, value } = descQaValidation(data);

    if (error) {
      return sendErrorResponse(error, res);
    }

    const patchValue = await descQaSchema.findByIdAndUpdate(id, value, {
      new: true,
    });
    res.status(200).send({ message: "Updated successfully", patchValue });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const remove = async (req, res) => {
  let { id } = req.params;
  try {
    await descQaSchema.findByIdAndDelete(id);
    res.status(200).send({ message: "qa deleted" });
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
