import axios from "axios";
import { useEffect, useState } from "react";

const ReceiptsPayments = () => {
  const [receipts, setReceipts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchReceipts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/payment/get-all-payments",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setReceipts(response.data.data);
      } catch (error) {
        console.error("Error fetching receipts:", error);
      }
    };

    fetchReceipts();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredReceipts = receipts.filter((receipt) =>
    receipt.customerName.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
            className="border border-green-500 rounded-md shadow-sm m-4 p-4 w-[60vw]"
          >
            <p className="font-bold">Receipt Number: {receipt.formNumber}</p>
            <p>Client Name: {receipt.customerName}</p>
            <p>Date: {receipt.issueDate}</p>
            <p>Particulars: {receipt.particulars}</p>
            <p>Amount: {receipt.amount}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReceiptsPayments;
