const config = require("config");
const jwt = require("jsonwebtoken");
const { sendErrorResponse } = require("../../helpers/send_error_response");

module.exports = (req, res, next) => {
  try {
    const authorization = req.headers.authorization;

    if (!authorization) {
      return res.status(401).send({ msg: "Authorization header not found" });
    }

    const bearer = authorization.split(" ")[0];
    const token = authorization.split(" ")[1];

    if (bearer != "Bearer" || !token) {
      return res.status(401).send({ msg: "Bearer token not found" });
    }

    const decodedPayload = jwt.verify(token, config.get("adminKey"));
    req.admin = decodedPayload;

    next();
  } catch (error) {
    sendErrorResponse(error, res);
  }
};
