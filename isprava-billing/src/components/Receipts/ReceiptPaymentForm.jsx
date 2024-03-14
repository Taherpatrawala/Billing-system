import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  setFormNumber,
  setClientName,
  setDate,
  setParticulars,
  setAmount,
} from "../../slices/ReceiptPaymentSlice";
import ReceiptModal from "./ReceiptModal";

const ReceiptPaymentForm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const formNumber = useSelector((state) => state.receiptPayment.formNumber);
  const clientName = useSelector((state) => state.receiptPayment.clientName);
  const date = useSelector((state) => state.receiptPayment.date);
  const particulars = useSelector((state) => state.receiptPayment.particulars);
  const amount = useSelector((state) => state.receiptPayment.amount);

  const location = useLocation();
  const type = location.pathname.split("/")[1];

  const formData = {
    formNumber: formNumber,
    customerName: clientName,
    issueDate: date,
    particulars: particulars,
    amount: amount,
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const formNum = Math.floor(Math.random() * 1000);
    dispatch(setFormNumber(`#FN${formNum}`));
    console.log(formData);
    await axios
      .post("http://localhost:8000/payment/create-payment", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        console.log(res);
        setIsOpen(true);
      });
    console.log(formData);
  };
  useEffect(() => {
    dispatch(setFormNumber(`#FN${Math.floor(Math.random() * 1000)}`));
  }, []);
  return (
    <div className="">
      <form
        className="max-w-md mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={handleFormSubmit}
      >
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-center">
            {type === "new-receipt" ? "Receipt" : "Payment"}
          </h2>
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="clientName"
          >
            Client Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="clientName"
            type="text"
            placeholder="Client Name"
            value={clientName}
            onChange={(e) => dispatch(setClientName(e.target.value))}
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="date"
          >
            Date
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="date"
            type="date"
            placeholder="Date"
            value={date}
            onChange={(e) => dispatch(setDate(e.target.value))}
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="paymentMethod"
          >
            Payment Method
          </label>
          <select
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="paymentMethod"
            value={particulars}
            onChange={(e) => dispatch(setParticulars(e.target.value))}
            required
          >
            <option value="">Select Payment Method</option>
            <option value="Cash">Cash</option>
            <option value="Check">Check</option>
            <option value="Bank Transfer">Bank Transfer</option>
            <option value="UPI">UPI</option>
            {/* Add more payment methods as needed */}
          </select>
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="amount"
          >
            Amount
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="amount"
            type="number"
            step="0.01"
            placeholder="Amount"
            value={amount}
            onChange={(e) => dispatch(setAmount(e.target.value))}
            required
          />
        </div>
        <div className="flex items-center justify-center">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
            onClick={(e) => handleFormSubmit(e)}
          >
            Submit
          </button>
        </div>
      </form>
      <ReceiptModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        receiptInfo={{
          receiptNumber: "123",
          customerName: clientName,
          particulars: particulars,
          issueDate: date,
          total: amount,
        }}
      />
    </div>
  );
};

export default ReceiptPaymentForm;
