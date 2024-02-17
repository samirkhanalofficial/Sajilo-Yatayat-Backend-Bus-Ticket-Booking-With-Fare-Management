import express, { Response } from "express";
import { AuthUserRequest } from "../utils/types/auth-user-request";

const fareRouter = express.Router();
fareRouter.post("/add", async (req: AuthUserRequest, res: Response) => {
  try {
    return;
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});
