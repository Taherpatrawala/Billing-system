import axios from "axios";
import { useEffect } from "react";
import { useLocation } from "react-router";
const ReceiptsPayments = () => {
  useEffect(() => {
    const fetchFormData = async () => {
      const res = await axios.get(
        "http://localhost:8000/payment/get-all-payments",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(res);
    };
    fetchFormData();
  }, []);
  return <div></div>;
};
export default ReceiptsPayments;
