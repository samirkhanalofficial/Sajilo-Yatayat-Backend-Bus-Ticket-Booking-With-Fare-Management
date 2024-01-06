import { NextFunction, Request, Response } from "express";
import admin from "firebase-admin";

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
    req.user = decoded;
    next();
  } catch (err) {
    res.status(400).json({ message: "Invalid Token", details: err });
  }
}
