const { sendErrorResponse } = require("../helpers/send_error_response");
const descTopicSchema = require("../schemas/Desc_topic");
const { descTopicValidation } = require("../validation/descTopic.validation");

const create = async (req, res) => {
  try {
    const { error, value } = descTopicValidation(req.body);

    if (error) {
      return sendErrorResponse(error, res);
    }

    const newValue = await descTopicSchema.create(value);
    res.status(201).send({ message: "New desc topic added", newValue });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const findAll = async (req, res) => {
  try {
    const values = await descTopicSchema.find();
    res.status(201).send({ values });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const findById = async (req, res) => {
  let {id} = req.params;
  try {
    const data = await descTopicSchema.findById(id);
    res.status(201).send({ data: data });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const update = async (req, res) => {
    let { id } = req.params
    let  data  = req.body
    try {

        const { error, value } = descTopicValidation(data);

        if(error){
            return sendErrorResponse(error, res)
        }

        const patchValue = await descTopicSchema.findByIdAndUpdate(id, value);
        res.status(201).send({ message: "Updated successfully", patchValue });
    } catch (error) {
    sendErrorResponse(error, res);
        
    }
}

const remove = async (req, res) => {
  let {id} = req.params;
  try {
    await descTopicSchema.findByIdAndDelete(id);
    res.status(201).send({ message: "Desc topic deleted" });
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
