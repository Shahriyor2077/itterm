const { sendErrorResponse } = require("../helpers/send_error_response");
const descSchema = require("../schemas/Description");
const { descValidation } = require("../validation/desc.validation");

const create = async (req, res) => {
  try {
    const { error, value } = descValidation(req.body);
    if (error) {
      return sendErrorResponse(error, res);
    }

    const newDesc = await descSchema.create(value);
    res.status(201).send({ message: "New desc added", newDesc });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const findAll = async (req, res) => {
  try {
    const descs = await descSchema.find();
    res.status(201).send({ descs });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const findById = async (req, res) => {
  let {id} = req.params;
  try {
    const data = await descSchema.findById(id);
    res.status(201).send({ data: data });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const update = async (req, res) => {
    let { id } = req.params
    let  data  = req.body
    try {

        const { error, value } = descValidation(data);

        if(error){
            return sendErrorResponse(error, res)
        }

        const newValue = await descSchema.findByIdAndUpdate(id, value);
        res.status(201).send({message: "Updated successfully", newValue})
    } catch (error) {
    sendErrorResponse(error, res);
        
    }
}

const remove = async (req, res) => {
  let {id} = req.params;
  try {
    await descSchema.findByIdAndDelete(id);
    res.status(201).send({ message: "Desc deleted" });
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
