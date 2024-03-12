import { configureStore } from "@reduxjs/toolkit";
import invoiceSlice from "../slices/invoiceSlice";
export const store = configureStore({
  reducer: { invoiceSlice },
});
