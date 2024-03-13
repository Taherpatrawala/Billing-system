import axios from "axios";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import InvoiceModal from "./invoiceComponents/InvoiceModal";

const SearchInvoices = () => {
  const [invoices, setInvoices] = useState([]);
  const [invoice, setInvoice] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/invoice/getAllInvoice",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setInvoices(response.data);
      } catch (error) {
        console.error("Error fetching invoices:", error);
      }
    };
    fetchInvoices();
  }, []);

  const handleClick = (invoiceId) => {
    const selectedInvoice = invoices.filter(
      (invoice) => invoice._id === invoiceId
    );

    setInvoice(...selectedInvoice);
    setIsOpen(true);
  };

  const handleEdit = () => {};
  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredInvoices = invoices.filter(
    (invoice) =>
      invoice.invoiceNumber.toString().includes(searchTerm) ||
      invoice.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.invoiceDate.includes(searchTerm) ||
      invoice.grandTotal.toString().includes(searchTerm)
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Search invoices..."
        value={searchTerm}
        onChange={handleSearch}
        className="w-full p-2 mb-4 border rounded-md shadow-sm"
      />
      {filteredInvoices.map((invoice) => (
        <div
          key={invoice._id}
          className="flex justify-between items-center m-4 p-4 border rounded-md shadow-sm cursor-pointer"
        >
          <div>
            <p className="font-bold">Invoice Number: {invoice.invoiceNumber}</p>
            <p>Customer Name: {invoice.customerName}</p>
            <p>Invoice Date: {invoice.invoiceDate}</p>
            <p>Grand Total: {invoice.grandTotal}</p>
          </div>
          <div>
            <button
              onClick={() => handleClick(invoice._id)}
              className="bg-blue-500 text-white py-2 px-4 rounded-md mr-2"
            >
              View
            </button>
            <button
              onClick={() => handleEdit(invoice._id)}
              className="bg-yellow-500 text-white py-2 px-4 rounded-md"
            >
              Edit
            </button>
          </div>
        </div>
      ))}
      {isOpen && (
        <InvoiceModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          invoiceInfo={{
            invoiceNumber: invoice.invoiceNumber,
            issueDate: invoice.invoiceDate,
            customerName: invoice.customerName,
            subtotal: invoice.subtotal,
            taxRate: invoice.gst,
            discountRate: invoice.discount,
            total: invoice.grandTotal,
          }} // Pass selected invoice to modal
          onAddNextInvoice={null}
          onCloseModal={handleCloseModal}
          items={invoice.items} // Pass onCloseModal function to close modal
        />
      )}
    </div>
  );
};

export default SearchInvoices;
