const Joi = require("joi");
const { sendErrorResponse } = require("../helpers/send_error_response");
const dictSchema = require("../schemas/Dict");
const { dictValidation } = require("../validation/dict.validation");

const addDict = async (req, res) => {
  try {
     

    const { error, value } = dictValidation(req.body)

    if (error) {
      return sendErrorResponse(error, res);
    }

    const { term } = value;
    const newDict = await dictSchema.create({ term, letter: term[0] });
    res.status(201).send({ message: "New Term added", newDict });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const findAll = async (req, res) => {
  try {
    const terms = await dictSchema.find();
    res.status(201).send({ terms });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const findByterm = async (req, res) => {
  let term = req.body;
  try {
    const data = await dictSchema.find({ term });
    res.status(201).send({ data: data });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const findByLet = async (req, res) => {
  let letter = req.body;
  try {
    const data = await dictSchema.find({ letter });
    res.status(201).send({ data: data });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

module.exports = {
  addDict,
  findAll,
  findByterm,
  findByLet,
};
