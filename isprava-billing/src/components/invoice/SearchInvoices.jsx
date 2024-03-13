import axios from "axios";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

const SearchInvoices = () => {
  const [invoices, setInvoices] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:8000/invoice/getAllInvoice", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setInvoices(response.data);
      });
  }, []);

  const handleClick = () => {};
  return (
    <div>
      {invoices.map((invoice) => {
        return (
          <div
            onClick={handleClick}
            key={invoice._id}
            className="flex justify-center items-center m-4 p-4 border rounded-md shadow-sm"
          >
            <p>{invoice.invoiceNumber}</p>
            <p>{invoice.customerName}</p>
            <p>{invoice.invoiceDate}</p>
            <p>{invoice.grandTotal}</p>
          </div>
        );
      })}
    </div>
  );
};
export default SearchInvoices;
