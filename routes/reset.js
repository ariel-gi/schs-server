import User from "../models/user.js";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";

const resetRoute = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) return console.log("user doesn't exist");
    const name = user.name;
    const secret = process.env.JWT_SECRET + user.password;
    const userId = user._id.toString();
    const payload = {
      email: email,
      id: userId,
    };
    const token = jwt.sign(payload, secret, { expiresIn: "15m" });
    const link = `https://schshomework.netlify.app/reset-password/${userId}/${token}`;

    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.GOOGLE_USER,
        pass: process.env.GOOGLE_PASSWORD,
      },
    });

    let emailOptions = {
      from: process.env.GOOGLE_USER,
      to: email,
      subject: "Hello ✔",
      text: "Hello world?",
      html: `
      <h3> Hello ${name} </h3>
      <p>Click this <a href=${link}>link</a> to reset your password</p>
      `,
    };

    await transporter.sendMail(emailOptions);
  } catch (error) {
    res.status(422).send("Oops, something went wrong");
  }
};

export default resetRoute;
