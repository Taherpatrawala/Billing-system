import mongoose from "mongoose";
import Invoice from "../models/invoice.js";
import User from "../models/user.js";

const invoiceController = {};

invoiceController.createInvoice = async (req, res) => {
  const data = req.body;
  const user = await User.findOne({ email: req.user.email });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  await Invoice.create({ ...data, user: user._id })
    .then(() => {
      res.json({ message: "Invoice created successfully" });
    })
    .catch((err) => {
      res.send(err);
    });
};

invoiceController.getAllInvoice = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.user.email });
    const invoiceList = await Invoice.find({ user: user._id }).lean().exec();

    res.send(invoiceList);
  } catch {
    res.status(404).json({ message: "User not found or InvoiceList is empty" });
  }
};

export default invoiceController;
