import { NextFunction, Response } from "express";
import admin from "firebase-admin";
import { userRepository } from "../../repository/user.repository";

export async function authRequired(
  req: any,
  res: Response,
  next: NextFunction
) {
  const token = req.header("Authorization");
  if (!token) {
    return res.status(401).json({ message: "You must login first" });
  }
  try {
    const decoded = await admin.auth().verifyIdToken(token);
    req.phone_number = decoded.phone_number!;
    const user = await userRepository.getUserByPhone(decoded.phone_number!);
    req.user = user;
    if (req.url === "/user/create") return next();
    if (!user) throw "User does not exists.";
    next();
  } catch (err) {
    res.status(400).json({ message: "Invalid Token", details: err });
  }
}
