import axios from "axios";

export const getInvoiceNumber = async () => {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.get(
      "http://localhost:8000/invoice/getInvoicesCount",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    return error.response.data.message;
  }
};
