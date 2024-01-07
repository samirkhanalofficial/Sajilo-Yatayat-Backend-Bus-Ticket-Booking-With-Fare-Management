import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";

import mongoose from "mongoose";
import cors from "cors";
import userRouter from "./src/routes/user-routes";
import { authRequired } from "./src/utils/middleware/auth.middleware";
dotenv.config();

const port = process.env.PORT || 3000;
try {
  mongoose.connect(process.env.MONGO_URL!);
  console.log("database connected");
  mongoose.set("strictQuery", false);
} catch (err: any) {
  console.log("mongodb connection error", err);
}

const admin = require("firebase-admin");

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert("./firebase.json"), // Replace with your service account key
});

const app: Express = express();
app.use(cors());
app.use(express.json());
app.use("/public", express.static("public"));
app.use(authRequired);
app.use("/user", userRouter);

// app.get("/", (req: Request, res: Response) => {
//   res.send("Express + TypeScript Server");
// });
// app.use("/khalti", khaltiRouter);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
