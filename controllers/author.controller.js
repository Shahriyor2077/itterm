const { sendErrorResponse } = require("../helpers/send_error_response");
const Author = require("../schemas/Author");
const { authorValidation } = require("../validation/author.validation");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const config = require("config");
const { authorJwtService } = require("../services/jwt.service");

const create = async (req, res) => {
  try {
    const { error, value } = authorValidation(req.body);

    if (error) {
      return sendErrorResponse(error, res);
    }

    const hashedPassword = bcrypt.hashSync(value.password, 7);
    const newAuthor = await Author.create({
      ...value,
      password: hashedPassword,
    });
    res.status(201).send({ message: "New Author added", newAuthor }); //newAuthor
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const loginAuthor = async (req, res) => {
  try {
    const { email, password } = req.body;

    const author = await Author.findOne({ email });

    if (!author) {
      return res.status(401).send({ message: "Email yoki password noto'g'ri" });
    }

    const validPassword = bcrypt.compareSync(password, author.password);

    if (!validPassword) {
      return res.status(401).send({ message: "Email yoki password noto'g'ri" });
    }

    const payload = {
      id: author._id,
      email: author.email,
      is_active: author.is_active,
      is_expert: author.is_expert,
    };

    // const token = jwt.sign(payload, config.get("tokenKey"), {
    //   expiresIn: config.get("tokenExpTime"),
    // });

    const tokens = authorJwtService.generateTokens(payload);
    author.refresh_token = tokens.refreshToken;
    await author.save();

    res.cookie("refreshToken", tokens.refreshToken, {
      httpOnly: true,
      maxAge: config.get("cookie_refresh_time"),
    });

    res.status(201).send({
      message: " Logged in succefully",
      id: author.id,
      accessToken: tokens.accessToken,
    }); //
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const logoutAuthor = async (req, res) => {
  try {
    console.log(req.cookies);
    console.log(req.headers.cookie);
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
      return res
        .status(400)
        .send({ message: "Cookieda refresh token topilmadi" });
    }
    const author = await Author.findOneAndUpdate(
      { refresh_token: refreshToken },
      {
        refresh_token: "",
      },
      { new: true }
    );

    if (!author) {
      return res.status(400).send({ message: "Token noto'g'ri" });
    }

    res.clearCookie("refreshToken");
    res.send({ author });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const findAll = async (req, res) => {
  try {
    const authors = await Author.find();
    res.status(201).send({ authors });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const findById = async (req, res) => {
  let { id } = req.params;
  try {
    const data = await Author.findById(id);
    res.status(201).send({ data: data });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const update = async (req, res) => {
  let { id } = req.params;
  let data = req.body;
  try {
    const { error, value } = authorValidation(data);

    if (error) {
      return sendErrorResponse(error, res);
    }

    const patchValue = await Author.findByIdAndUpdate(id, value);
    res.status(201).send({ message: "Updated successfully", patchValue });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const remove = async (req, res) => {
  let { id } = req.params;
  try {
    await Author.findByIdAndDelete(id);
    res.status(201).send({ message: "Author deleted" });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

module.exports = {
  loginAuthor,
  logoutAuthor,
  findAll,
  create,
  findById,
  update,
  remove,
};
