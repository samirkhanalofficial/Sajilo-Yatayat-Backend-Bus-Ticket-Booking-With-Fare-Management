import express, { Express } from "express";
import dotenv from "dotenv";

import mongoose from "mongoose";
import cors from "cors";
import userRouter from "./src/routes/user.routes";
import { authRequired } from "./src/utils/middleware/auth.middleware";
dotenv.config();
import initializeFirebaseApp from "./src/service/firebase";
import busRouter from "./src/routes/bus.routes";
import departureRouter from "./src/routes/departure.routes";
import fareRouter from "./src/routes/fare.routes";
import locationRouter from "./src/routes/location.routes";
import { khaltiRouter } from "./src/routes/khalti.routes";
import transactionRouter from "./src/routes/transaction.routes";
initializeFirebaseApp();
const port = process.env.PORT || 3000;
try {
  mongoose.connect(process.env.MONGO_URL!);
  console.log("database connected");
  mongoose.set("strictQuery", false);
} catch (err: any) {
  console.log("mongodb connection error", err);
}

const app: Express = express();
app.use(cors());
app.use(express.json());

app.use("/public", express.static("public"));
app.use(authRequired);
app.use("/user", userRouter);
app.use("/bus", busRouter);
app.use("/departure", departureRouter);
app.use("/fare", fareRouter);
app.use("/location", locationRouter);
app.use("/pay/khalti", khaltiRouter);
app.use("/transactions", transactionRouter);

// app.use((err: any, req: Request, res: Response, next: NextFunction) => {
//   console.log(err);
//   res.status(500).json({ message: "Something went wrong" });
//   next(err);
// });
// app.use("/khalti", khaltiRouter);

// app.get("/notify",(){
//   const messenging = admin.messaging();
//   messenging.send({
//     topic: fare.bus.id,
//     notification: {
//       title: "New Fare Request",
//       body: `${fare.faredBy.name} fared for your bus, please check it out as soon as possible.`,
//     },
//   });
// })
app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
