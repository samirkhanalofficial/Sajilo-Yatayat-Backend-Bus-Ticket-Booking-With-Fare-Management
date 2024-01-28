import express, { Response } from "express";
import { AuthUserRequest } from "../utils/types/auth-user-request";
import { busRepository } from "../repository/bus.repository";
import { createBusValidation } from "../validation/create-bus.validation";
const busRouter = express.Router();
busRouter.post("/add", async (req: AuthUserRequest, res: Response) => {
  try {
    const { error, value } = await createBusValidation.validate(req.body);
    if (error) throw error.message;
    const bus = await busRepository.addBus({
      ...value,
      owners: [req.user!.id],
    });
    return res.status(201).json(bus);
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

busRouter.get("/mybuses", async (req: AuthUserRequest, res: Response) => {
  try {
    const buses = await busRepository.getBusByOwner(req.user!.id);
    return res.status(200).json(buses);
  } catch (error: any) {
    return res.status(400).json({ message: error });
  }
});
export default busRouter;
