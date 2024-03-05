import express, { Response } from "express";
import { AuthUserRequest } from "../utils/types/auth-user-request";

import { khaltiRepository } from "../repository/khalti.repository";
import {
  KhaltiValidation,
  VerifyKhaltiPayment,
} from "../validation/khalti-validation";
import { fareRepository } from "../repository/fare.repository";
import { transactionRepository } from "../repository/transaction.repository";
import { busRepository } from "../repository/bus.repository";
import admin from "firebase-admin";
const messenging = admin.messaging();
const khaltiRouter = express.Router();
// init payment
khaltiRouter.post(
  "/initpayment",
  async (req: AuthUserRequest, res: Response) => {
    try {
      const { error, value } = KhaltiValidation.validate(req.body);
      if (error) throw error.message;
      const fare = await fareRepository.getFareById(value.fare);
      if (!fare) throw "No Fare found";
      const data = await fetch("https://khalti.com/api/v2/payment/initiate/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          public_key: process.env.KHALTI_PUBLIC_KEY!,
          mobile: value.mobile,
          transaction_pin: value.transaction_pin,
          amount: fare.amount * 100,
          product_identity: value.fare,
          product_name: `ticket: ${value.fare}`,
          product_url:
            "https://sajilo-yatayat.samirk.com.np/fare?id=" + value.fare,
        }),
      })
        .then(async (res) => {
          const body = await res.json();
          console.log(body);
          if (res.status != 200) {
            throw "Incorrect mobile number or Pin";
          }
          return body;
        })
        .then(async (body) => {
          return body;
        });
      const khaltiData = await khaltiRepository.addData({
        isPaid: false,
        fare: value.fare,
        mobile: value.mobile,
        amount: fare.amount,
        token: data?.token ?? "",
      });
      if (!khaltiData) throw "error saving khaltiData";
      return res.status(200).json(data);
    } catch (e: any) {
      return res.status(400).json({ message: e.toString() });
    }
  }
);
// get khalti data by token

khaltiRouter.post("/verify", async (req: AuthUserRequest, res: Response) => {
  try {
    const { error, value } = VerifyKhaltiPayment.validate(req.body);
    if (error) throw error.message;
    const khaltiData = await khaltiRepository.getDataByToken(value.token);

    if (!khaltiData) throw "error making payment";

    const data = await fetch("https://khalti.com/api/v2/payment/confirm/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        public_key: process.env.KHALTI_PUBLIC_KEY!,
        transaction_pin: value.transaction_pin,
        token: value.token,
        confirmation_code: value.confirmation_code,
      }),
    })
      .then(async (res) => {
        const body = await res.json();
        console.log(body);
        if (res.status != 200) {
          throw "Error verifying confirmation code.";
        }
        return body;
      })
      .then(async (body) => {
        return body;
      });

    const updateKhalti = await khaltiRepository.updateKhaltiData(
      khaltiData._id
    );
    if (!updateKhalti) throw "error updating khaltiData";
    const setpaid = await fareRepository.payFareById(khaltiData.fare);
    if (!setpaid) throw "error updating to Paid status";
    const addTransactionForUser = await transactionRepository.addTransaction({
      amount: setpaid.amount,
      isUser: true,
      method: "Khalti Payment Gateway",
      who: setpaid.faredBy.id,
      isIncomming: false,
      isDone: true,
    });
    const addTransactionForBus = await transactionRepository.addTransaction({
      amount: setpaid.amount,
      isUser: false,
      method: "Khalti Payment Gateway",
      who: setpaid.bus.id,
      isIncomming: true,
      isDone: true,
    });
    await busRepository.increasebalance(setpaid.bus.id, setpaid.amount);
    if (!addTransactionForUser) throw "error updating user transaction";
    if (!addTransactionForBus) throw "error updating bus transaction";
    await messenging.send({
      topic: setpaid.bus.id,
      notification: {
        title: `Amount Received @ Rs ${setpaid.amount}`,
        body: `${setpaid.bus.busnumber}  : (${setpaid.departure.from.name} - ${setpaid.departure.to.name}, Thank you for using our service`,
      },
    });
    await messenging.send({
      topic: setpaid.faredBy.id,
      notification: {
        title: `Amount Paid @ Rs ${setpaid.amount}`,
        body: `${setpaid.bus.busnumber}  : (${setpaid.departure.from.name} - ${setpaid.departure.to.name}, Thank you for using our service`,
      },
    });
    return res.status(200).json(data);
  } catch (e: any) {
    return res.status(400).json({ message: e.toString() });
  }
});
export { khaltiRouter };
