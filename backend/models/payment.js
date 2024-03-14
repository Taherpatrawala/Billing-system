import mongoose from "mongoose";

const paymentModel = mongoose.Schema({
  customerName: {
    type: String,
    required: true,
    trim: true,
  },
  receiptNumber: {
    type: String,
    required: true,
    unique: true,
  },
  issueDate: {
    type: Date,
    required: true,
  },
  particulars: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
});

export default mongoose.model("Payment", paymentModel);
