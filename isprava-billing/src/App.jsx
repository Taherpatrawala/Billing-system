import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/Navbar/Navbar";
import InvoiceForm from "./components/invoice/invoiceComponents/InvoiceForm";
import Login from "./components/authComponents/login";

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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
