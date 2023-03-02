import { Request, Response } from "express";
import userModel from "../models/userModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { generateAccessToken, generateActiveToken, generateRefreshToken } from "../config/generateToken";
import sendEmail from "../config/sendEmail";
import { sendText, textOTP, textVerify } from "../config/sendText";
import { validEmail, validPhone } from "../middleware/validator";
import { DecodedTokenInt, ReqAuthInt } from "../config/interface";

export const registerUser = async (req: Request, res: Response) => {
 const { name, account, password } = req.body;

 try {
  const user = await userModel.findOne({ account });
  if (user) return res.status(400).json({ msg: "Account already exists" });

  const hashedPassword = await bcrypt.hash(password, 15);

  const newUser = {
   name,
   account,
   password: hashedPassword
  };

  const active_token = generateActiveToken({ newUser });

  const url = `${process.env.BASE_URL}/active/${active_token}`;

  if (validEmail(account)) {
   sendEmail(account, url, "Verify your email address");
   return res.json({ msg: "Registration successful. Please check your email." });
  } else if (validPhone(account)) {
   sendText(account, url, "Verify your phone number");
   return res.json({ msg: "Registration successful. Please check your phone." });
  }

 } catch (error) {
  res.status(500).json({ msg: error });
 }
}

export const activateAccount = async (req: Request, res: Response) => {
 try {
  const { active_token } = req.body;

  const decoded = <DecodedTokenInt>jwt.verify(active_token, `${process.env.ACTIVE_SECRET_TOKEN}`);

  const { newUser } = decoded; // destructured directly from the interface

  if (!newUser) return res.status(400).json({ msg: "Invalid authorization" });

  const user = await userModel.findOne({ account: newUser.account });
  if (user) return res.status(400).json({ msg: "Account already exists" });

  const new_user = new userModel(newUser);

  await new_user.save();

  res.json({ msg: "Account has been activated" });

 } catch (error: any) {
  return res.status(500).json({ msg: error.message });
 }
}

export const login = async (req: Request, res: Response) => {
 try {
  const { account, password } = req.body;

  const user = await userModel.findOne({ account });

  if (!user) return res.status(400).json({ msg: "Account doesn't exist" });

  const match = await bcrypt.compare(password, user.password);
  
  if (!match) {
   let msgErr = user.type === 'register' ? "Incorrect password" : `Incorrect password. The account login is ${user.type}`
   return res.status(400).json({ msg: msgErr });
  }
  
  const access_token = generateAccessToken({ id: user._id });
  const refresh_token = generateRefreshToken({ id: user._id }, res);
  
  await userModel.findOneAndUpdate({ _id: user._id }, {
   rf_token: refresh_token
  });
  
  res.json({ 
   msg: "Login successful",
   access_token,
   user: {
    ...user._doc,
    password: ''
   } 
  });

 } catch (error: any) {
  res.status(500).json({ msg: error.message });
 }
}

export const logout = async (req: ReqAuthInt, res: Response) => {
 if (!req.user) return res.status(400).json({ msg: "Invalid Authentication" });

 try {
  res.clearCookie("refreshtoken", {
   path: `/api/refresh_token`
  });

  await userModel.findOneAndUpdate({ _id: req.user._id }, {
   rf_token: ""
  });

  res.json({ msg: "Logged out" });
 } catch (error: any) {
  res.status(500).json({ msg: error.message });
 }
}

export const refreshToken = async (req: Request, res: Response) => {
 try {
  const rf_token = req.cookies.refreshtoken;
  if (!rf_token) return res.status(400).json({ msg: "Please login" });

  const decoded = <DecodedTokenInt>jwt.verify(rf_token, `${process.env.REFRESH_SECRET_TOKEN}`);
  if (!decoded.id) return res.status(400).json({ msg: "Please login" });
  
  const user = await userModel.findById(decoded.id).select("-password +rf_token");
  if (!user) return res.status(400).json({ msg: "This account doesn't exist" });

  if (rf_token !== user.rf_token) return res.status(400).json({ msg: "Please login" });

  const access_token = generateAccessToken({ id: user._id });
  const refresh_token = generateRefreshToken({ id: user._id }, res);

  await userModel.findOneAndUpdate({ _id: user._id }, {
   rf_token: refresh_token
  });

  res.json({ access_token, user });
 } catch (error: any) {
  res.status(500).json({ msg: error.message });
 }
}

export const loginText = async (req: Request, res: Response) => {
 try {
  const { phone } = req.body;
  const data = await textOTP(phone, 'text');
  res.json(data);
 } catch (error: any) {
  return res.status(500).json({ msg: error.message });
 }
}

export const verifyText = async (req: Request, res: Response) => {
 try {
  const { phone, code } = req.body;
  const data = await textVerify(phone, code);

  if (!data?.valid) return res.status(400).json({ msg: 'Invalid Authentication' });

  const password = phone + "your phone's secret password";

  const hashedPassword = await bcrypt.hash(password, 15);

  const user = await userModel.findOne({ account: phone });

  if (user) {
   const match = await bcrypt.compare(password, user.password);
  
   if (!match) {
    let msgErr = user.type === 'register' ? "Incorrect password" : `Incorrect password. The account login is ${user.type}`
    return res.status(400).json({ msg: msgErr });
   }
   
   const access_token = generateAccessToken({ id: user._id });
   const refresh_token = generateRefreshToken({ id: user._id }, res);
   
   await userModel.findOneAndUpdate({ _id: user._id }, {
    rf_token: refresh_token
   });
   
   res.json({ 
    msg: "Login successful",
    access_token,
    user: {
     ...user._doc,
     password: ''
    } 
   });

  } else {
   const user = {
    name: phone,
    account: phone,
    password: hashedPassword,
    type: 'text'
   };

   const newUser = new userModel(user);
   
   const access_token = generateAccessToken({ id: newUser._id });
   const refresh_token = generateRefreshToken({ id: newUser._id }, res);
   
   await userModel.findOneAndUpdate({ _id: newUser._id }, {
    rf_token: refresh_token
   });
   
   newUser.rf_token = refresh_token;
   await newUser.save();
   
   res.json({ 
    msg: "Login successful",
    access_token,
    user: {
     ...newUser._doc,
     password: ''
    } 
   });
  }
  
 } catch (error: any) {
  return res.status(500).json({ msg: error.message });
 }
}

export const forgotPassword = async (req: Request, res: Response) => {
 try {
  const { account } = req.body;

  const user = await userModel.findOne({ account });

  if (!user) return res.status(400).json({ msg: "This account doesn't exist" });

  if (user.type !== 'register') return res.status(400).json({ msg: `Login with ${user.type} can't use this function.` });

  const access_token = generateAccessToken({ id: user._id });

  const url = `${process.env.BASE_URL}/reset_password/${access_token}`;

  if (validPhone(account)) {
   sendText(account, url, "Forgot Password?");
   return res.json({ msg: "Success! Please check your phone."});
  } else if (validEmail(account)) {
   sendEmail(account, url, "Forgot Password?");
   return res.json({ msg: "Success! Please check your email."});
  }
  
 } catch (error: any) {
  return res.status(500).json({ msg: error.message });
 }
}