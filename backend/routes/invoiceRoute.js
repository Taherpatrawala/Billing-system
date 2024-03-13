import express from "express";
import authorize from "../middlewares/authMiddleware.js";
import invoiceController from "../controllers/invoiceController.js";

const invoiceRoute = express.Router();

invoiceRoute.post("/createInvoice", authorize, invoiceController.createInvoice);
invoiceRoute.get("/getAllInvoice", authorize, invoiceController.getAllInvoice);
invoiceRoute.get(
  "/getInvoicesCount",
  authorize,
  invoiceController.getInvoicesCount
);

export default invoiceRoute;
