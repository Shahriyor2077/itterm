const config = require("config");
const jwt = require("jsonwebtoken");
const { sendErrorResponse } = require("../../helpers/send_error_response");
const jwtService = require("../../services/jwt.service");

module.exports = async(req, res, next) => {
  try {
    const authorization = req.headers.authorization;

    if (!authorization) {
      return res.status(401).send({ msg: "Authorization header not found" });
    }

    const bearer = authorization.split(" ")[0];
    const token = authorization.split(" ")[1];

    if (bearer !== "Bearer" || !token) {
      return res.status(401).send({ msg: "Bearer token not found" });
    }

    // const decodedPayload = jwt.verify(token, config.get("tokenKey"));
    const decodedPayload = await jwtService.verifyAccessToken(token)

    // req.author = decodedPayload;

    // use after the lesson email
    // if(!decodedPayload.is_active){
    //     return res.status(403).send({ msg: "Authorization header not found" });
    // }

    next();
  } catch (error) {
    sendErrorResponse(error, res);
  }
};
