const { sendErrorResponse } = require("../helpers/send_error_response");
const topicSchema = require("../schemas/Topic");
const { topicValidation } = require("../validation/topic.validation");

const create = async (req, res) => {
  try {
    const { error, value } = topicValidation(req.body);

    if (error) {
      return sendErrorResponse(error, res);
    }

    const newValue = await topicSchema.create(value);
    res.status(201).send({ message: "New topic added", newValue });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const findAll = async (req, res) => {
  try {
    const values = await topicSchema.find();
    res.status(201).send({ values });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const findById = async (req, res) => {
  let {id} = req.params;
  try {
    const data = await topicSchema.findById(id);
    res.status(201).send({ data: data });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const update = async (req, res) => {
    let { id } = req.params
    let  data  = req.body
    try {

        const { error, value } = topicValidation(data);

        if(error){
            return sendErrorResponse(error, res)
        }

        const patchValue = await topicSchema.findByIdAndUpdate(id, value);
        res.status(201).send({ message: "Updated successfully", patchValue });
    } catch (error) {
    sendErrorResponse(error, res);
        
    }
}

const remove = async (req, res) => {
  let {id} = req.params;
  try {
    await topicSchema.findByIdAndDelete(id);
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
