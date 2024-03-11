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

export default invoiceController;
