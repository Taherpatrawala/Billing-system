import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/Navbar/Navbar";
import InvoiceForm from "./components/invoice/invoiceComponents/InvoiceForm";
import Login from "./components/authComponents/login";
import SearchInvoices from "./components/invoice/SearchInvoices";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route
          path="/"
          element={
            <div className="min-h-screen bg-gray-100">
              <div className="mx-auto max-w-7xl">
                <InvoiceForm />
              </div>
            </div>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Login />} />
        <Route path="/new-invoice" element={<InvoiceForm />} />
        <Route path="/invoice/:id" element={<InvoiceForm />} />
        <Route path="/invoices" element={<SearchInvoices />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
