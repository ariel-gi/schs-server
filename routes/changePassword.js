import bcrypt from "bcryptjs";
import User from "../models/user.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

const changePasswordRoute = async (req, res) => {
  const { password, confirmPassword, id, token } = req.body;

  try {
    const user = await User.findById(id);

    const secret = process.env.JWT_SECRET + user.password;

    const payload = jwt.verify(token, secret);

    if (password !== confirmPassword) return res.status(400).json({ message: "Passwords don't match" });

    const hashedPassword = await bcrypt.hash(password, 12);

    const update = { password: hashedPassword };

    const result = await User.findByIdAndUpdate(id, update, { new: true });
  } catch (error) {
    console.log("Something went wrong");
  }
};

export default changePasswordRoute;
