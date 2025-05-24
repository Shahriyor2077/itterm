const { sendErrorResponse } = require("../helpers/send_error_response");
const adminShcema = require("../schemas/Admin");
const { adminValidation } = require("../validation/admin.validation");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("config");
const { adminJwtService } = require("../services/jwt.service");
const Admin = require("../schemas/Admin");
const uuid = require('uuid');
const mailService = require("../services/mail.service");
const { link } = require("joi");

const create = async(req, res) => {
  try {
    const { error, value } = adminValidation(req.body);

    if (error) {
      return sendErrorResponse(error, res);
    }

    const hashedPassword = bcrypt.hashSync(value.password, 7);
    const activation_link=uuid.v4()
    const newAdmin = await adminShcema.create({
      ...value,
      password: hashedPassword,
      activation_link
    });
    const link=`${config.get("api_url")}/api/admin/activate/${activation_link}`

    await mailService.sendMail(value.email, link )

    res.status(201).send({ message: "New Admin added", newAdmin }); //newAuthor
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await adminShcema.findOne({ email });

    if (!admin) {
      return res.status(401).send({ message: "Email yoki password noto'g'ri" });
    }

    const validPassword = bcrypt.compareSync(password, admin.password);

    if (!validPassword) {
      return res.status(401).send({ message: "Email yoki password noto'g'ri" });
    }

    const payload = {
      id: admin.id,
      email: admin.email,
      is_creator: admin.is_creator,
    };

    const { accessToken, refreshToken } =
      adminJwtService.generateTokens(payload);

      admin.refreshToken = refreshToken;
      await admin.save();

    res.cookie("refreshToken", refreshToken, {
      maxAge: config.get("adminCookie_refresh_time"),
      httpOnly: true,
      secure: false,
      sameSite: "strict",
    });

    res.status(201).send({
      message: " Logged in succefully",
      id: admin.id,
      accessToken,

    }); //
    
  } catch (error) {
    console.log(error);
    sendErrorResponse(error, res);
  }
};




const findAll = async (req, res) => {
  try {
    const admins = await adminShcema.find();
    res.status(201).send({ admins });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const findById = async (req, res) => {
  let { id } = req.params;
  try {
    const data = await adminShcema.findById(id);
    res.status(201).send({ data: data });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const update = async (req, res) => {
  let { id } = req.params;
  let data = req.body;
  try {
    const { error, value } = adminValidation(data);

    if (error) {
      return sendErrorResponse(error, res);
    }

    const patchValue = await adminShcema.findByIdAndUpdate(id, value);
    res.status(201).send({ message: "Updated successfully", patchValue });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const remove = async (req, res) => {
  let { id } = req.params;
  try {
    await adminShcema.findByIdAndDelete(id);
    res.status(201).send({ message: "Admin deleted" });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const logout=async(req, res)=>{
  try {
    const {refreshToken}=req.cookies;
    if(!refreshToken){
      return res.status(400).send({message: "Refresh token topilmadi"})
    }
    await adminShcema.findOneAndUpdate({refreshToken},
      {refreshToken: ""}
    );
    res.clearCookie("refreshToken");
    res.status(200).send({message: "Logout bajarildi"})

  } catch (error) {
    sendErrorResponse(error, res)
  }
}

const adminRefreshToken=async(req, res)=>{
  try {
    const {refreshToken}=req.cookies;
    if(!refreshToken){
      return res.status(400).send({message: "Cookieda refresh token topilmadi"});
    }
    await adminJwtService.verifyRefreshToken(refreshToken);
    const admin=await Admin.findOne({refreshToken});

    if(!admin){
      return res.status(401).send({message: "Bazada refresh token topilmadi"})
    }
    const payload = {
      id: admin.id,
      email: admin.email,
      is_creator: admin.is_creator,
    };

    const tokens=adminJwtService.generateTokens(payload);
    admin.refreshToken=tokens.refreshToken;
    await admin.save();

    res.cookie("refreshToken", tokens.refreshToken,{
      httpOnly: true,
      maxAge: config.get("cookie_refresh_time")
    });
    res.status(201).send({
      message: "tokenlar yangilandi",
      id: admin.id,
      accessToken: tokens.accessToken,
    });
    
  } catch (error) {
    sendErrorResponse(error, res)
  }
}

const adminActivate=async(req, res)=>{
  try {
    const {link}=req.params;
    const admin=await admin.findOne({activation_link: link});

    if(!admin){
      return res.status(400).send({message: "Admin topilmadi"})
    }
    if(admin.is_active){
      return res.status(400).send({message: "Admin avval aktivlashgan"})
    }
    admin.is_active=true,
    await admin.save();
    res.send({message: "Admin faol", is_active: admin.is_active})
  } catch (error) {
    sendErrorResponse(error, res)
  }
}
 



module.exports = {
  login,
  findAll,
  create,
  findById,
  update,
  remove,
  logout,
  adminRefreshToken,
  adminActivate
};
