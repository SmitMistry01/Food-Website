import { Link } from "react-router-dom";
import {LOGO_URL} from '../utils/constants';
import { useOnlineStatus } from "./useOnlineStatus";

export const Header = () => {
  const useOnline = useOnlineStatus();
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo Section */}
        <div className="flex items-center space-x-3">
          <img
            src={LOGO_URL}
            alt="Food Logo"
            className="h-10 w-10 rounded-full border border-gray-300"
          />
          <h1 className="text-xl font-bold text-orange-600">Foody</h1>{" "}
          {/* Orange color for the logo */}
        </div>

        {/* Navigation Section */}
        <nav className="flex items-center space-x-8">
          <ul className="flex space-x-6">
            <li>
              {useOnline ? "Online 😊":"Offline 😢"}
            </li>
            <li>
              <Link
                to="/"
                className="text-gray-700 hover:text-green-500 font-medium transition duration-300 ease-in-out"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="text-gray-700 hover:text-green-500 font-medium transition duration-300 ease-in-out"
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                to="/cart"
                className="text-gray-700 hover:text-green-500 font-medium transition duration-300 ease-in-out"
              >
                Cart
              </Link>
            </li>
          </ul>
          {/* Button Section */}
          <button className="px-5 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition duration-300 ease-in-out">
            Login
          </button>{" "}
          {/* Orange button for the "Login" */}
        </nav>
      </div>
    </header>
  );
};
