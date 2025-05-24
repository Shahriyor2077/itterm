const { sendErrorResponse } = require("../helpers/send_error_response");
const userSchema = require("../schemas/User");
const  userValidation = require("../validation/user.validation");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const config = require('config');
const { userJwtService }=require("../services/jwt.service");
const uuid = require('uuid');
const mailService = require("../services/mail.service");



const create = async (req, res) => {
  try {
    const { error, value } = userValidation(req.body);

    if (error) {
      return sendErrorResponse(error, res);
    }

    const hashedPassword = bcrypt.hashSync(value.password, 7);
    const activation_link=uuid.v4()
    const newUser = await userSchema.create({
      ...value,
      password: hashedPassword,
      activation_link
    });
    const link=`${config.get("api_url")}/api/user/activate/${activation_link}`
    await mailService.sendMail(value.email, link)
    res.status(201).send({ message: "New User added", newUser }); 
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userSchema.findOne({ email });

    if (!user) {
      return res.status(401).send({ message: "Email yoki password noto'g'ri" });
    }

    const validPassword = bcrypt.compareSync(password, user.password)

    if (!validPassword) {
      return res.status(401).send({ message: "Email yoki password noto'g'ri" });
    }

    const payload = {
      id: user._id,
      email: user.email,
      is_active: user.user_is_active
    }

    const {accessToken, refreshToken}=userJwtService.generateTokens(payload);

    user.refreshToken=refreshToken,
    await user.save();

    res.cookie("refreshToken", refreshToken, {
      httpOnyl: true,
      maxAge: config.get("userCookie_refresh_time"),
      secure: false,
      sameSite: "strict",
    });

    // const token = jwt.sign(payload, config.get("userKey"), {
    //   expiresIn: config.get("userExpTime"),
    // });

    res
      .status(201)
      .send({ message: " Logged in succefully", id: userSchema.id, accessToken}); 
  } catch (error) {
    console.log(error);
    sendErrorResponse(error, res);
  }
};

const findAll = async (req, res) => {
  try {
    const users = await userSchema.find();
    res.status(201).send({ users });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const findById = async (req, res) => {
  let { id } = req.params;
  try {
    const data = await userSchema.findById(id);
    res.status(201).send({ data: data });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const update = async (req, res) => {
  let { id } = req.params;
  let data = req.body;
  try {
    const { error, value } = userValidation(data);

    if (error) {
      return sendErrorResponse(error, res);
    }

    const patchValue = await userSchema.findByIdAndUpdate(id, value);
    res.status(201).send({ message: "Updated successfully", patchValue });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const remove = async (req, res) => {
  let { id } = req.params;
  try {
    await userSchema.findByIdAndDelete(id);
    res.status(201).send({ message: "User deleted" });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const logout=async(req, res)=>{
  try {
    const {refreshToken}=req.cookies;
    if(!refreshToken){
      return res.status(400).send({message: "refresh token topilmadi"})
    }
    await userSchema.findOneAndUpdate({refreshToken}, 
      {refreshToken: ""}
    );
    // if(!refreshToken){
    //   return res.status(400).send({message: "Refresh token bazada topilmadi"})
    // }
    // user.refreshToken="";
    // await user.save();

    res.clearCookie("refreshToken");
    res.status(200).send({message: "logout bajarildi"})

  } catch (error) {
    sendErrorResponse(error, res)
  }
}



const userRefreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;
    if (!refreshToken) {
      return res
        .status(400)
        .send({ message: "Cookieda refresh token mavjud emas" });
    }

    await userJwtService.verifyRefreshToken(refreshToken);
    const user = await userSchema.findOne({ refreshToken });

    if (!user) {
      return res
        .status(401)
        .send({ message: "Bazada refresh token topilmadi" });
    }

    const payload = {
      id: user.id,
      email: user.email,
      is_active: user.user_is_active,
    };

    const tokens = userJwtService.generateTokens(payload);
    user.refreshToken = tokens.refreshToken;
    await user.save();

    res.cookie("refreshToken", tokens.refreshToken, {
      httpOnly: true,
      maxAge: config.get("cookie_refresh_time")
    });

    res.status(201).send({
      message: "Tokenlar yangilandi",
      id: user.id,
      accessToken: tokens.accessToken,
    });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const userActivate = async (req, res) => {
  try {
    const { link } = req.params;
    const user = await userSchema.findOne({ activation_link: link });

    if (!user) {
      return res.status(400).send({ message: "Noto'g'ri aktivatsiya linki" });
    }

    user.user_is_active = true;
    await user.save();

    res
      .status(200)
      .send({ message: "Foydalanuvchi muvaffaqiyatli aktivatsiya qilindi" });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};



module.exports = {
  login,
  findAll,
  create,
  findById,
  update,
  remove,
  logout,
  userRefreshToken,
  userActivate

};
