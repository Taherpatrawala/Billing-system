import { createSlice } from "@reduxjs/toolkit";
import { uid } from "uid";

const date = new Date();
const today = date.toLocaleDateString("en-GB", {
  month: "numeric",
  day: "numeric",
  year: "numeric",
});

const invoiceSlice = createSlice({
  name: "invoice",
  initialState: {
    discount: "",
    gst: 18,
    invoiceNumber: 1,
    issueDate: today,
    customerName: "",
    subTotal: 1,
    items: [
      {
        id: uid(6),
        name: "",
        quantity: 1,
        price: "1.00",
      },
    ],
    grandTotal: 1,
  },
  reducers: {
    setDiscount: (state, action) => {
      state.discount = action.payload;
    },
    setGST: (state, action) => {
      state.tax = action.payload;
    },
    setInvoiceNumber: (state, action) => {
      state.invoiceNumber = action.payload;
    },
    setIssueDate: (state, action) => {
      state.issueDate = action.payload;
    },
    setCustomerName: (state, action) => {
      state.customerName = action.payload;
    },
    setSubTotal: (state, action) => {
      state.subTotal = action.payload;
    },
    setSliceItems: (state, action) => {
      state.items = action.payload;
    },
    addItem: (state, action) => {
      state.items.push(action.payload);
    },
    grandTotal: (state, action) => {
      state.grandTotal = action.payload;
    },
  },
});

export const {
  setDiscount,
  setTax,
  setInvoiceNumber,
  setIssueDate,
  setCustomerName,
  setSubTotal,
  setSliceItems,
  addItem,
  setGrandTotal,
} = invoiceSlice.actions;

export default invoiceSlice.reducer;
