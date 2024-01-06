import express, { Request, Response } from "express";
import { userRepository } from "../repository/user.repository";
import { AuthUserRequest } from "../utils/types/auth-user-request";
import { createUserValidation } from "../validation/create-user.validation";
const admin = require("firebase-admin");

const userRouter = express.Router();
userRouter.post("/create", async (req: AuthUserRequest, res: Response) => {
  try {
    const { error, value } = createUserValidation.validate(req.body);
    if (error) throw error.message;
    const userExists = await userRepository.getUserByPhone(
      req.user.phone_number
    );
    if (userExists) return res.status(200).json(userExists);
    const user = await userRepository.addUser({
      ...value,
      mobile: req.user.phone_number,
    });
    return res.status(200).json(user);
    // Additional logic based on the validated user information
  } catch (error: any) {
    return res.status(400).json({ message: error });
  }
});
userRouter.get("/mydetails", async (req: AuthUserRequest, res: Response) => {
  try {
    // const mobile = req.params.mobile ?? "";

    const user = await userRepository.getUserByPhone(req.user.phone_number);
    // console.log(user);
    if (!user) throw "User does not exists.";
    return res.status(200).json(user);
  } catch (error: any) {
    return res.status(400).json({ message: error });
  }
});
userRouter.get("/id/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id ?? "";

    const user = await userRepository.getUserById(id);
    return res.status(200).json(user);
  } catch (error: any) {
    return res.status(400).json({ message: error });
  }
});

export default userRouter;
