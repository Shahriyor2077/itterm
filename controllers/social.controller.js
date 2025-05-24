const { sendErrorResponse } = require("../helpers/send_error_response");
const socialSchema = require("../schemas/Social");
const { socialValidation } = require("../validation/social.validation");

const create = async (req, res) => {
  try {
    const { error, value } = socialValidation(req.body);

    if (error) {
      return sendErrorResponse(error, res);
    }

    const newValue = await socialSchema.create(value);
    res.status(201).send({ message: "New social info added", newValue });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const findAll = async (req, res) => {
  try {
    const values = await socialSchema.find();
    res.status(201).send({ values });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const findById = async (req, res) => {
  let {id} = req.params;
  try {
    const data = await socialSchema.findById(id);
    res.status(201).send({ data: data });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const update = async (req, res) => {
    let { id } = req.params
    let  data  = req.body
    try {

        const { error, value } = socialValidation(data);

        if(error){
            return sendErrorResponse(error, res)
        }

        const patchValue = await socialSchema.findByIdAndUpdate(id, value);
        res.status(201).send({ message: "Updated successfully", patchValue });
    } catch (error) {
    sendErrorResponse(error, res);
        
    }
}

const remove = async (req, res) => {
  let {id} = req.params;
  try {
    await socialSchema.findByIdAndDelete(id);
    res.status(201).send({ message: "Social info deleted" });
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
