import {
  BadRequestResponse,
  SuccessResponse,
} from "../../../helper/ApiResponse";
import { InternalError, NotFoundError } from "../../../helper/ApiError";
import schema from "./schema";
import asyncHandler from "../../../helper/asyncHandler";
import _ from "lodash";
import { ProtectedRequest } from "../../../helper/app-request";
import CollectionController from "../../../controllers/Collection";
import Razorpay from "razorpay";
import { razorpayKeys } from "../../../config";
import TripController from "../../../controllers/Trip";
import crypto from "crypto";

export const getOrderId = [
  asyncHandler(async (req: ProtectedRequest, res) => {
    const instance = new Razorpay({
      key_id: razorpayKeys.key_id,
      key_secret: razorpayKeys.key_secret,
    });

    const options = {
      amount: req.body.amount*100 ,
      currency: "INR",
      receipt: crypto.randomBytes(10).toString("hex"),
    };

    const order = await instance.orders.create(options);

    if (!order) {
      throw new InternalError("Something Went Wrong");
    }

    new SuccessResponse("Order Created", order).send(res);
  }),
];

export const verifyOrder = [
  asyncHandler(async (req: ProtectedRequest, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
   
    const instance = new Razorpay({
      key_id: razorpayKeys.key_id,
      key_secret: razorpayKeys.key_secret,
    });

    const sign = razorpay_order_id +"|"+ razorpay_payment_id;

    const expectedSign = crypto
      .createHmac("sha256", razorpayKeys.key_secret )
      .update(sign.toString())
      .digest("hex");



    if (razorpay_signature != expectedSign) {
      throw new BadRequestResponse("Invalid Signature");
    }
    

    const payment = await instance.payments.fetch(razorpay_payment_id)
    if(!payment)
    {
      throw new BadRequestResponse("Something went wrong");

    }

    return new SuccessResponse("Payment Verified Successfully", payment).send(res);

  }),
];
