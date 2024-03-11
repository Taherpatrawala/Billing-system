import { BrowserRouter, Routes, Route } from "react-router-dom";
import InvoiceForm from "./components/InvoiceForm";
import Login from "./components/authComponents/login";

function App() {
  return (
    <BrowserRouter>
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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
