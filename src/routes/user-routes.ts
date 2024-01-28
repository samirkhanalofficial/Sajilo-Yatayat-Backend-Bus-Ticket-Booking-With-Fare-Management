import express, { Response } from "express";
import { userRepository } from "../repository/user.repository";
import { AuthUserRequest } from "../utils/types/auth-user-request";
import { createUserValidation } from "../validation/create-user.validation";

const userRouter = express.Router();
userRouter.post("/create", async (req: AuthUserRequest, res: Response) => {
  try {
    const { error, value } = createUserValidation.validate(req.body);
    if (error) throw error.message;
    if (req.user) throw "User already exists.";
    const user = await userRepository.addUser({
      ...value,
      mobile: req.phone_number!,
    });
    return res.status(201).json(user);
  } catch (error: any) {
    return res.status(400).json({ message: error });
  }
});
userRouter.get("/mydetails", async (req: AuthUserRequest, res: Response) => {
  try {
    if (!req.user) throw "User does not exists.";
    return res.status(200).json(req.user);
  } catch (error: any) {
    return res.status(400).json({ message: error });
  }
});

export default userRouter;
