import { useState, useEffect } from "react";
import axios from "axios";
import { uid } from "uid";
import toast, { Toaster } from "react-hot-toast";
import InvoiceItem from "./InvoiceItem";
import InvoiceModal from "./InvoiceModal";
import { createInvoice } from "../../../helpers/createInvoice";
import { useLocation, useParams } from "react-router";
import {
  setDiscount,
  setGST,
  setInvoiceNumber,
  setIssueDate,
  setCustomerName,
  setSliceItems,
  addItem,
} from "../../../slices/invoiceSlice";
import { useSelector, useDispatch } from "react-redux";
import { getInvoiceNumber } from "../../../helpers/getInvoiceNumber";

const date = new Date();
const today = date.toLocaleDateString("en-GB", {
  month: "numeric",
  day: "numeric",
  year: "numeric",
});

const InvoiceForm = () => {
  const [isOpen, setIsOpen] = useState(false);

  const discount = useSelector((state) => state.invoiceSlice.discount);
  const tax = useSelector((state) => state.invoiceSlice.gst);
  const invoiceNumber = useSelector(
    (state) => state.invoiceSlice.invoiceNumber
  );
  const issueDate = useSelector((state) => state.invoiceSlice.issueDate);
  const customerName = useSelector((state) => state.invoiceSlice.customerName);
  const items = useSelector((state) => state.invoiceSlice.items);

  const dispatch = useDispatch();
  const location = useLocation();
  const { id } = useParams();
  const reviewInvoiceHandler = (event) => {
    event.preventDefault();
    setIsOpen(true);
  };

  const addNextInvoiceHandler = async () => {
    const InvoiceNumber = await getInvoiceNumber();
    dispatch(
      setInvoiceNumber(
        `#${InvoiceNumber + 1}S${Math.floor(Math.random() * 1000)}`
      )
    );

    dispatch(
      addItem({
        id: uid(6),
        name: "",
        quantity: 1,
        price: "1.00",
      })
    );
  };

  const addItemHandler = () => {
    const id = uid(6);

    dispatch(
      addItem({
        id: id,
        name: "",
        quantity: 1,
        price: "1.00",
      })
    );
  };

  const deleteItemHandler = (id) => {
    dispatch(setSliceItems(items.filter((item) => item.id !== id)));
  };

  const edtiItemHandler = (event) => {
    const editedItem = {
      id: event.target.id,
      name: event.target.name,
      value: event.target.value,
    };

    const newItems = items.map((item) => {
      if (item.id === editedItem.id) {
        return { ...item, [editedItem.name]: editedItem.value };
      }
      return item;
    });

    dispatch(setSliceItems(newItems));
  };

  const subtotal = items.reduce((prev, curr) => {
    if (curr.name.trim().length > 0)
      return prev + Number(curr.price * Math.floor(curr.quantity));
    else return prev;
  }, 0);

  const taxRate = (tax * subtotal) / 100;
  const discountRate = (discount * subtotal) / 100;
  const total = subtotal - discountRate + taxRate;

  const invoice = {
    invoiceNumber: invoiceNumber,
    invoiceDate: issueDate,
    customerName: customerName,
    items: items,
    subtotal: subtotal,
    gst: tax,
    discount: discountRate,
    grandTotal: total,
  };

  const handleSaveInvoice = async () => {
    const newInvoice = await createInvoice(invoice)
      .then((res) => {
        toast.success(res.message);
        setIsOpen(true);
      })
      .catch((err) => {
        console.log(err.response);
        toast.error(err.response.data.message || err.response);
      });
    console.log(newInvoice);
  };

  const handleEditInvoice = async () => {
    await axios
      .put(
        `${import.meta.env.VITE_SERVER_LINK}/invoice/editInvoice/${id}`,
        invoice,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        toast.success(res.data.message);
        setIsOpen(true);
      })
      .catch((err) => {
        console.log(err.response);
        toast.error(err.response.data.message || err.response);
      });
  };

  useEffect(() => {
    const fetchInvoice = async () => {
      const InvoiceNumber = await getInvoiceNumber();
      dispatch(
        setInvoiceNumber(
          `#${InvoiceNumber + 1}S${Math.floor(Math.random() * 1000)}`
        )
      );
    };
    if (location.pathname == "/new-invoice") {
      console.log("fetching invoice");
      fetchInvoice();
    } else null;
  }, []);

  return (
    <form
      className="relative flex flex-col px-2 md:flex-row"
      onSubmit={reviewInvoiceHandler}
    >
      <div className="my-6 flex-1 space-y-2  rounded-md bg-white p-4 shadow-sm sm:space-y-4 md:p-6">
        <div className="flex flex-col justify-between space-y-2 border-b border-gray-900/10 pb-4 md:flex-row md:items-center md:space-y-0">
          <div className="flex space-x-2">
            <span className="font-bold">Current Date: </span>
            <span>{today}</span>
          </div>
          <div className="flex items-center space-x-2">
            <label className="font-bold" htmlFor="invoiceNumber">
              Invoice Number:
            </label>
            <input
              required
              className="max-w-[130px]"
              type="text"
              name="invoiceNumber"
              id="invoiceNumber"
              min="1"
              value={invoiceNumber}
              readOnly
            />
          </div>
        </div>
        <h1 className="text-center text-lg font-bold">INVOICE</h1>
        <div className="flex pt-4 pb-8">
          <div className="m-3">
            <label
              htmlFor="customerName"
              className="col-start-2 row-start-1 text-sm font-bold md:text-base"
            >
              Customer:
            </label>
            <input
              required
              className="flex-1"
              placeholder="Customer name"
              type="text"
              name="customerName"
              id="customerName"
              value={customerName}
              onChange={(event) =>
                dispatch(setCustomerName(event.target.value))
              }
            />
          </div>
          <div className="m-3">
            <label
              htmlFor="issueDate"
              className="col-start-2 row-start-1 text-sm font-bold md:text-base"
            >
              Issued On:
            </label>
            <input
              type="date"
              name="date"
              required
              id=""
              value={issueDate}
              onChange={(e) => dispatch(setIssueDate(e.target.value))}
            />
          </div>
        </div>
        <div className="overflow-scroll">
          <table className="w-full p-4 text-left">
            <thead>
              <tr className="border-b border-gray-900/10 text-sm md:text-base">
                <th>ITEM</th>
                <th>QTY</th>
                <th className="text-center">PRICE</th>
                <th className="text-center">TOTAL</th>
                <th className="text-center">ACTION</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <InvoiceItem
                  key={item.id}
                  id={item.id}
                  name={item.name}
                  quantity={item.quantity}
                  price={item.price}
                  onDeleteItem={deleteItemHandler}
                  onEdtiItem={edtiItemHandler}
                />
              ))}
            </tbody>
          </table>
        </div>
        <button
          className="rounded-md bg-blue-500 px-4 py-2 text-sm text-white shadow-sm hover:bg-blue-600"
          type="button"
          onClick={addItemHandler}
        >
          Add Item
        </button>
        <div className="flex flex-col items-end space-y-2 pt-6">
          <div className="flex w-full justify-between md:w-1/2">
            <span className="font-bold">Subtotal:</span>
            <span>₹{subtotal.toFixed(2)}</span>
          </div>
          <div className="flex w-full justify-between md:w-1/2">
            <span className="font-bold">Discount:</span>
            <span>
              ({discount || "0"}%)₹{discountRate.toFixed(2)}
            </span>
          </div>
          <div className="flex w-full justify-between md:w-1/2">
            <span className="font-bold">GST:</span>
            <span>
              ({tax || "0"}%)₹{taxRate.toFixed(2)}
            </span>
          </div>
          <div className="flex w-full justify-between border-t border-gray-900/10 pt-2 md:w-1/2">
            <span className="font-bold">Total:</span>
            <span className="font-bold">
              ₹{total % 1 === 0 ? total : total.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
      <div className="basis-1/4 bg-transparent">
        <div className="sticky top-0 z-10 space-y-4 divide-y divide-gray-900/10 pb-8 md:pt-6 md:pl-4">
          <button
            className="w-full rounded-md bg-blue-500 py-2 text-sm text-white shadow-sm hover:bg-blue-600"
            type="submit"
          >
            Review Invoice
          </button>
          <InvoiceModal
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            invoiceInfo={{
              invoiceNumber,
              issueDate,
              customerName,
              subtotal,
              taxRate: tax,
              discountRate,
              total,
            }}
            items={items}
            onAddNextInvoice={addNextInvoiceHandler}
          />
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <label className="text-sm font-bold md:text-base" htmlFor="tax">
                GST rate:
              </label>
              <div className="flex items-center">
                <input
                  className="w-full rounded-r-none bg-white shadow-sm"
                  type="number"
                  min="0"
                  name="tax"
                  id="tax"
                  placeholder="GST Rate"
                  value={tax}
                  onChange={(event) =>
                    dispatch(setGST(parseInt(event.target.value)))
                  }
                />
                <span className="rounded-r-md bg-gray-200 py-2 px-4 text-gray-500 shadow-sm">
                  %
                </span>
              </div>
            </div>
            <div className="space-y-2">
              <label
                className="text-sm font-bold md:text-base"
                htmlFor="discount"
              >
                Discount rate:
              </label>
              <div className="flex items-center">
                <input
                  className="w-full rounded-r-none bg-white shadow-sm"
                  type="number"
                  name="discount"
                  id="discount"
                  min="0"
                  step="0.01"
                  placeholder="0.0"
                  value={discount}
                  onChange={(event) =>
                    dispatch(setDiscount(event.target.value))
                  }
                />
                <span className="rounded-r-md bg-gray-200 py-2 px-4 text-gray-500 shadow-sm">
                  %
                </span>
              </div>
            </div>
          </div>
          <button
            onClick={handleSaveInvoice}
            className="border m-2 p-2 bg-green-300 text-white"
            type="submit"
          >
            Save
          </button>
          <button
            onClick={handleEditInvoice}
            className="border m-2 p-2 bg-purple-300 text-white"
            type="submit"
          >
            Update
          </button>
        </div>
        <Toaster />
      </div>
    </form>
  );
};

export default InvoiceForm;
