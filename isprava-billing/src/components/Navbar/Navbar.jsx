import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <div>
      <nav className="bg-gray-800 p-4">
        <div className="container mx-auto">
          <ul className="flex items-center justify-between">
            <li className="flex items-center">
              <NavLink to="/" className="flex items-center text-white">
                <span className="mr-2">
                  <img
                    className="w-12 h-12"
                    src="https://i.postimg.cc/hGZKzdkS/logo.png"
                    alt="arc-invoice"
                  />
                </span>
                <span className="text-xl font-bold">Your Logo</span>
              </NavLink>
            </li>
            <li className="flex space-x-4">
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
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
