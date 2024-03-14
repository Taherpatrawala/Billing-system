import { createSlice } from "@reduxjs/toolkit";
import { uid } from "uid";

const invoiceSlice = createSlice({
  name: "invoice",
  initialState: {
    discount: "",
    gst: 18,
    invoiceNumber: 1,
    issueDate: "",
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
    setAllProperties: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    setDiscount: (state, action) => {
      state.discount = action.payload;
    },
    setGST: (state, action) => {
      state.gst = action.payload;
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
  setAllProperties,
  setDiscount,
  setGST,
  setInvoiceNumber,
  setIssueDate,
  setCustomerName,
  setSubTotal,
  setSliceItems,
  addItem,
  setGrandTotal,
} = invoiceSlice.actions;

export default invoiceSlice.reducer;
