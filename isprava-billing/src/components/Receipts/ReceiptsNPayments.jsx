import axios from "axios";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useLocation } from "react-router";
import ReceiptModal from "./ReceiptModal";

const ReceiptsPayments = () => {
  const [receipts, setReceipts] = useState([]);
  const [receipt, setReceipt] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const location = useLocation();
  const type = location.pathname.split("/")[1];

  useEffect(() => {
    const fetchReceipts = async () => {
      try {
        let url = "";
        type === "payments"
          ? (url = "payment/get-all-payments")
          : (url = "receipt/get-all-receipts");
        const response = await axios.get(`http://localhost:8000/${url}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setReceipts(response.data.data);
      } catch (error) {
        console.error("Error fetching receipts:", error);
      }
    };

    fetchReceipts();
  }, [type]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleClick = (receiptId) => {
    const selectedInvoice = receipts.filter(
      (invoice) => invoice._id === receiptId
    );

    setReceipt(...selectedInvoice);
    setIsOpen(true);
  };
  const filteredReceipts = receipts.filter((receipt) =>
    receipt.customerName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteReceipt = async (receiptId) => {
    try {
      let url = "";
      type === "payments"
        ? (url = "payment/delete-payment")
        : (url = "receipt/delete-receipt");
      await axios.delete(`http://localhost:8000/${url}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        data: {
          receiptId,
        },
      });
      const newReceipts = receipts.filter(
        (receipt) => receipt._id !== receiptId
      );
      toast.success("Receipt deleted successfully");
      setReceipts(newReceipts);
    } catch (error) {
      toast.error("Error deleting receipt");
      console.error("Error deleting receipt:", error);
    }
  };

  return (
    <div>
      <div className="w-full flex justify-center">
        <input
          type="text"
          placeholder="Search by client name..."
          value={searchTerm}
          onChange={handleSearch}
          className="md:w-[60vw] p-2 m-4 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        />
      </div>
      <div className="flex flex-col justify-center items-center">
        {filteredReceipts.map((receipt) => (
          <div
            key={receipt._id}
            className="border border-green-500 flex justify-between rounded-md shadow-sm m-4 p-4 w-[60vw]"
          >
            <div className="">
              <p className="font-bold">Receipt Number: {receipt.formNumber}</p>
              <p>Client Name: {receipt.customerName}</p>
              <p>Date: {receipt.issueDate}</p>
              <p>Particulars: {receipt.particulars}</p>
              <p>Amount: ₹{receipt.amount}</p>
            </div>
            <div className="">
              <button
                onClick={() => handleClick(receipt._id)}
                className="bg-blue-500 text-white py-2 px-4 rounded-md mr-2"
              >
                View
              </button>
              <button
                onClick={() => handleDeleteReceipt(receipt._id)}
                className="bg-red-500 text-white py-2 px-4 rounded-md mr-2"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      <ReceiptModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        receiptInfo={{
          receiptNumber: receipt.formNumber,
          customerName: receipt.customerName,
          particulars: receipt.particulars,
          issueDate: receipt.issueDate,
          amount: receipt.amount,
        }}
      />
      <Toaster />
    </div>
  );
};

export default ReceiptsPayments;
