import express, { Response } from "express";
import { AuthUserRequest } from "../utils/types/auth-user-request";
import Joi from "joi";
import { locationRepository } from "../repository/location.repository";
const locationRouter = express.Router();
locationRouter.post("/add", async (req: AuthUserRequest, res: Response) => {
  try {
    const { error, value } = Joi.object({
      name: Joi.string().required(),
    }).validate({ ...req.body });
    if (error) throw error.message;
    const location = await locationRepository.addLocation(value);
    return res.status(201).json(location);
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});
locationRouter.get(
  "/get-all-locations",
  async (_: AuthUserRequest, res: Response) => {
    try {
      const locations = await locationRepository.getAllLocations();
      return res.status(201).json(locations);
    } catch (error) {
      return res.status(400).json({ message: error });
    }
  }
);
export default locationRouter;
