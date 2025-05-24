const { sendErrorResponse } = require("../helpers/send_error_response");
const synonimSchema = require("../schemas/Synonim");
const { synonimValidation } = require("../validation/synonim.validation");

const create = async (req, res) => {
  try {
    const { error, value } = synonimValidation(req.body);

    if (error) {
      return sendErrorResponse(error, res);
    }

    const newValue = await synonimSchema.create(value);
    res.status(201).send({ message: "New Synonim added", newValue });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const findAll = async (req, res) => {
  try {
    const values = await synonimSchema.find();
    res.status(201).send({ values });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const findById = async (req, res) => {
  let {id} = req.params;
  try {
    const data = await synonimSchema.findById(id);
    res.status(201).send({ data: data });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const update = async (req, res) => {
    let { id } = req.params
    let  data  = req.body
    try {

        const { error, value } = synonimValidation(data);

        if(error){
            return sendErrorResponse(error, res)
        }

        const patchValue = await synonimSchema.findByIdAndUpdate(id, value);
        res.status(201).send({ message: "Updated successfully", patchValue });
    } catch (error) {
    sendErrorResponse(error, res);
        
    }
}

const remove = async (req, res) => {
  let {id} = req.params;
  try {
    await synonimSchema.findByIdAndDelete(id);
    res.status(201).send({ message: "Synonim deleted" });
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
