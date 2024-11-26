import { useDispatch } from "react-redux";
import { CDN_URL } from "../../utils/constants";
import { addItem } from "../../utils/redux/cartSlice";
import { CustomizationCart } from "../customization/CustomizationCart";
import { useState } from "react";

export const ItemCards = ({ itemData }) => {
  const [btnpop, setBtnpop] = useState(false);
  const [selectedAddons, setSelectedAddons] = useState([]);
  const dispatch = useDispatch();
  //by click the add btn will dispatch the action
  //console.log(itemData);
  
  //whatever u pass to the dispatch it turns into payload and then in cartSlice it consoles to action.payload
  const handleCartItem = (items) => {
    dispatch(addItem(items));
    if (items?.card?.info?.addons?.length > 0) {
      setSelectedAddons(items.card.info);
      setBtnpop(true);
    }
    
  };

  return (
    <>
      <ul>
        {itemData.map((items) => {
          const { id, name, description, price, defaultPrice, imageId, addons } =
            items?.card?.info;
          return (
            <div key={id}>
              <div className="border-b-8 p-5 flex justify-between">
                <div className="w-9/12 p-5">
                  <div className="text-xl font-semibold text-gray-800">
                    {name}
                  </div>
                  <div className="font-bold text-xl text-slate-900">
                    ₹{price ? price / 100 : defaultPrice / 100}
                  </div>
                  <p className="text-s text-gray-600 font-medium">
                    {description}
                  </p>
                  {addons?.length>0 && <p className="border border-amber-500 text-amber-600 font-semibold w-28 p-1 align-middle rounded-xl">Customisable</p>}
                  <br></br>
                  <button
                    className="px-3 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-700 transition duration-300 ease-in-out font-bold "
                    onClick={() => handleCartItem(items)}
                  >
                    ADD
                  </button>
                </div>
                <div className="w-3/12 p-4 object-contain">
                  <img
                    src={CDN_URL + imageId}
                    className="h-20 w-52 rounded-xl object-contain"
                  ></img>
                </div>
              </div>
              {addons?.length > 0 && <CustomizationCart trigger={btnpop} setTrigger={setBtnpop} itemData={selectedAddons}/>}
            </div>
          );
        })}
      </ul>
    </>
  );
};
