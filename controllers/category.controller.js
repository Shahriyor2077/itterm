const { sendErrorResponse } = require("../helpers/send_error_response");
const catSchema = require("../schemas/Category");
const { categoryValidation } = require("../validation/category.validation");

const addCategory = async (req, res) => {
  try {
    const { error, value } = categoryValidation(req.body);

    if (error) {
      return sendErrorResponse(error, res);
    }

    const newCategory = await catSchema.create(value);
    res.status(201).send({ message: "New Category added", newCategory });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const findAll = async (req, res) => {
  try {
    const categories = await catSchema.find();
    res.status(201).send({ categories });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const findById = async (req, res) => {
  let {id} = req.params;
  try {
    const data = await catSchema.findById(id);
    res.status(201).send({ data: data });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const update = async (req, res) => {
    let { id } = req.params
    let  data  = req.body
    try {

        const { error, value } = categoryValidation(data);

        if(error){
            return sendErrorResponse(error, res)
        }

        const newValue = await catSchema.findByIdAndUpdate(id, value);
        res.status(201).send({message: "Updated successfully", newValue})
    } catch (error) {
    sendErrorResponse(error, res);
        
    }
}

const remove = async (req, res) => {
  let {id} = req.params;
  try {
    await catSchema.findByIdAndDelete(id);
    res.status(201).send({ message: "Category deleted" });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};



module.exports = {
  addCategory,
  findAll,
  findById,
  update,
  remove,
};
