import axios from "axios";

export const createInvoice = async (invoiceData) => {
  const token = localStorage.getItem("token");

  const response = await axios.post(
    "http://localhost:8000/invoice/createInvoice",
    invoiceData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};
