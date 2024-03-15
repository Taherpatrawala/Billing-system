import { NavLink } from "react-router-dom";
import { useState } from "react";
import MNavbar from "./MNavbar";
import logo from "../../assets/logo.svg";
const NavBar = () => {
  const [width, setWidth] = useState(false);
  return (
    <div>
      {width ? <MNavbar width={width} setWidth={setWidth} /> : null}
      <nav className="bg-gray-800 p-4">
        <div className="container mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <NavLink to="/" className="flex items-center text-white">
                <span className="mr-2">
                  <img className="" src={logo} alt="arc-invoice" />
                </span>
              </NavLink>
            </div>

            <div className="hidden md:flex space-x-4 ">
              <NavLink to="/dashboard" className="text-white">
                Dashboard
              </NavLink>
              <div className="relative group">
                <NavLink to="/new-invoice" className="text-white">
                  Create
                </NavLink>
                <div className="z-30 absolute hidden group-hover:flex flex-col min-w-max p-2 bg-white mt-2 border-2 shadow-md -translate-y-3 space-y-2 text-gray-800 rounded-md ">
                  <NavLink
                    className=" hover:bg-gray-200 rounded-md"
                    to="/new-invoice"
                  >
                    New Invoice
                  </NavLink>
                  <NavLink
                    className=" hover:bg-gray-200 rounded-md"
                    to="/new-payment"
                  >
                    New Payment
                  </NavLink>
                  <NavLink
                    className=" hover:bg-gray-200 rounded-md"
                    to="/new-receipt"
                  >
                    New Receipt
                  </NavLink>
                </div>
              </div>
              <NavLink to="/invoices" className="text-white">
                Invoices
              </NavLink>
              <NavLink to="/payments" className="text-white">
                Payments
              </NavLink>
              <NavLink to="/receipts" className="text-white">
                Receipts
              </NavLink>
            </div>
            <div className="md:hidden z-50">
              <p
                onClick={() => {
                  setWidth((prev) => !prev);
                }}
                className={`z-50 text-2xl text-white touch-none ${
                  width ? "rotate-90" : null
                } transition-all`}
              >
                &#9776;
              </p>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
