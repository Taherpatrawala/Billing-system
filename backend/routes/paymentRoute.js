import express from "express";
import authorize from "../middlewares/authMiddleware.js";
import paymentController from "../controllers/paymentController.js";

const paymentRoutes = express.Router();

paymentRoutes.post(
  "/create-payment",
  authorize,
  paymentController.createPayment
);

export default paymentRoutes;
