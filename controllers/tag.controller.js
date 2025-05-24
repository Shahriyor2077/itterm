const { sendErrorResponse } = require("../helpers/send_error_response");
const tagSchema = require("../schemas/Tag");
const { tagValidation } = require("../validation/tag.validation");

const create = async (req, res) => {
  try {
    const { error, value } = tagValidation(req.body);

    if (error) {
      return sendErrorResponse(error, res);
    }

    const newValue = await tagSchema.create(value);
    res.status(201).send({ message: "New topic added", newValue });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const findAll = async (req, res) => {
  try {
    const values = await tagSchema.find();
    res.status(201).send({ values });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const findById = async (req, res) => {
  let { id } = req.params;
  try {
    const data = await tagSchema.findById(id);
    res.status(201).send({ data: data });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const update = async (req, res) => {
  let { id } = req.params;
  let data = req.body;
  try {
    const { error, value } = tagValidation(data);

    if (error) {
      return sendErrorResponse(error, res);
    }

    const patchValue = await tagSchema.findByIdAndUpdate(id, value);
    res.status(201).send({ message: "Updated successfully", patchValue });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const remove = async (req, res) => {
  let { id } = req.params;
  try {
    await tagSchema.findByIdAndDelete(id);
    res.status(201).send({ message: "Topic deleted" });
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
