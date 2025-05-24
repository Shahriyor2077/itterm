const { sendErrorResponse } = require("../../helpers/send_error_response");

module.exports = (req, res, next) => {
  try {
    if (!req.admin.is_creator) {
      return res.status(403).send({ msg: "Siz creator emassiz!" });
    }

    next();
  } catch (error) {
    sendErrorResponse(error, res);
  }
};
