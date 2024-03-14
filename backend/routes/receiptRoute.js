import express from "express";
import receiptController from "../controllers/receiptController";

const receiptRoutes = express.Router();

receiptRoutes.post(
  "/create-receipt",
  authorize,
  receiptController.createReceipt
);
receiptRoutes.get(
  "/get-all-receipts",
  authorize,
  receiptController.getReceipts
);
receiptRoutes.delete(
  "/delete-receipt",
  authorize,
  receiptController.deleteReceipt
);
export default receiptRoutes;
