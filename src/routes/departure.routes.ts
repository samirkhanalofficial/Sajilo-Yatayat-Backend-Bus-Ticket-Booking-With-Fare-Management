import express, { Response } from "express";
import { AuthUserRequest } from "../utils/types/auth-user-request";
import { busRepository } from "../repository/bus.repository";
import { createDepartureValidation } from "../validation/create-departure.validation";
import { departureRepository } from "../repository/departure.repository";
import { getDeparturesValidation } from "../validation/get-departures.validation";
const departureRouter = express.Router();
departureRouter.post("/add", async (req: AuthUserRequest, res: Response) => {
  try {
    const { error, value } = await createDepartureValidation.validate(req.body);
    if (error) throw error.message;
    const isOwner = await busRepository.isOwnerOfBus(value.bus, req.user!.id);
    if (!isOwner) throw "You are not owner of this bus";
    const departure = await departureRepository.addDeparture({
      ...value,
    });
    return res.status(201).json(departure);
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

departureRouter.get(
  "/my-departure/:busId",
  async (req: AuthUserRequest, res: Response) => {
    try {
      const busId = req.params.busId || "";
      const isOwner = await busRepository.isOwnerOfBus(busId, req.user!.id);
      if (!isOwner) throw "You are not owner of this bus";
      const departures = await departureRepository.getDepartureByBusId(busId);
      return res.status(200).json(departures);
    } catch (error: any) {
      return res.status(400).json({ message: error });
    }
  }
);
departureRouter.post(
  "/get-departures",
  async (req: AuthUserRequest, res: Response) => {
    try {
      const { error, value } = await getDeparturesValidation.validate(req.body);
      if (error) throw error.message;
      const departures = await departureRepository.getDepartures(
        value.from,
        value.to,
        value.date
      );
      return res.status(200).json(departures);
    } catch (error: any) {
      return res.status(400).json({ message: error });
    }
  }
);
export default departureRouter;
