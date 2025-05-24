const { sendErrorResponse } = require("../helpers/send_error_response");
const questionAnswerSchema = require("../schemas/questionAnswer");
const { questionAnswerValidation } = require("../validation/questionAnswer.validation");

const create = async (req, res) => {
  try {
    const { error, value } = questionAnswerValidation(req.body);

    if (error) {
      return sendErrorResponse(error, res);
    }

    const newValue = await questionAnswerSchema.create(value);
    res.status(201).send({ message: "New question  added", newValue });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const findAll = async (req, res) => {
  try {
    const values = await questionAnswerSchema.find();
    res.status(201).send({ values });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const findById = async (req, res) => {
  let { id } = req.params;
  try {
    const data = await questionAnswerSchema.findById(id);
    res.status(201).send({ data: data });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const update = async (req, res) => {
  let { id } = req.params;
  let data = req.body;
  try {
    const { error, value } = questionAnswerValidation(data);

    if (error) {
      return sendErrorResponse(error, res);
    }

    const patchValue = await questionAnswerSchema.findByIdAndUpdate(id, value);
    res.status(201).send({ message: "Updated successfully", patchValue });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const remove = async (req, res) => {
  let { id } = req.params;
  try {
    await questionAnswerSchema.findByIdAndDelete(id);
    res.status(201).send({ message: "question topic deleted" });
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
