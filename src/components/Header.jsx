import { Link } from "react-router-dom";
import { LOGO_URL } from "../utils/constants";
import { useOnlineStatus } from "../utils/useOnlineStatus";
import { useContext, useState } from "react";
import { UserContext } from "../utils/UserContext";
import { useSelector, useDispatch } from "react-redux";
import { FaShoppingCart } from "react-icons/fa"; // Import the cart icon
import { addItem } from "../utils/redux/cartSlice";

export const Header = () => {
  const useOnline = useOnlineStatus();
  const { loggedInUser } = useContext(UserContext);
  const [isClicked, setIsClicked] = useState(false);
  const dispatch = useDispatch();

  //subscribing to the store using a selector
  const cartItems = useSelector((store) => store.cart.items);
  console.log(cartItems);

  const handleCartClick = () => {
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 300);
   
  };

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
          <h1 className="text-xl font-bold text-orange-600">Meals on Click</h1>{" "}
          {/* Orange color for the logo */}
        </div>

        {/* Navigation Section */}
        <nav className="flex items-center space-x-8">
          <ul className="flex space-x-6">
            <li>{useOnline ? "Online 😊" : "Offline 😢"}</li>
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
            <li className="relative">
              <Link
                to="/cart"
                className={`text-gray-700 hover:text-green-500 font-medium transition duration-300 ease-in-out flex items-center ${isClicked ? 'animate-spin' : ''}`}
                onClick={handleCartClick}
              >
                <FaShoppingCart className="text-2xl" /> 
              </Link>
              <span className="bg-orange-600 text-white rounded-full h-6 w-6 flex items-center justify-center absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2">{cartItems.length}</span>
            </li>
          </ul>
          {/* Button Section */}
          <button className="px-5 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition duration-300 ease-in-out">
            Login
          </button>
          <li className="font-bold text-orange-600">{loggedInUser}</li>
          {/* Orange button for the "Login" */}
        </nav>
      </div>
    </header>
  );
};
