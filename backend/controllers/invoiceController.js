import mongoose from "mongoose";
import Invoice from "../models/invoice.js";
import User from "../models/user.js";

const invoiceController = {};

invoiceController.createInvoice = async (req, res) => {
  const data = req.body;
  console.log(req.user.id);
  console.log(req.user, "user");
  await Invoice.create({ ...data, user: req.user.id })
    .then(() => {
      res.json({ message: "Invoice created successfully" });
    })
    .catch((err) => {
      res.send(err);
    });
};

invoiceController.getAllInvoice = async (req, res) => {
  try {
    const invoiceList = await Invoice.find({ user: req.user.id }).lean().exec();

    res.send(invoiceList);
  } catch {
    res.status(404).json({ message: "User not found or InvoiceList is empty" });
  }
};

invoiceController.getInvoicesCount = async (req, res) => {
  const userId = req.user.id;
  if (!mongoose.isValidObjectId(userId)) {
    return res.status(400).json({ message: "Invalid User Id" });
  }
  const invoiceCount = await Invoice.countDocuments({ user: userId });
  res.json(invoiceCount);
};
export default invoiceController;
