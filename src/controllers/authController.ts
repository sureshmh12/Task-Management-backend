import { Request, Response } from "express";
import User from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;

    const exists = await User.findOne({ email });
    if (exists)
      return res.status(400).json({ message: "Email already exists" });

    const hash = await bcrypt.hash(password, 10);

    const user = await User.create({ username, email, password: hash });

    return res.json({
      message: "Registered successfully",
      user,
    });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    console.log("Login body:", req.body);
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    console.log("User found:", user);
    if (!user)
      return res.status(400).json({ message: "Invalid email or password" });

    const match = await bcrypt.compare(password, user.password);
    console.log("Password match:", match);
    if (!match)
      return res.status(400).json({ message: "Invalid email or password" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string, {
      expiresIn: "7d",
    });

    return res.json({
      message: "Login successful",
      token,
      user,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error });
  }
};
