import { useState } from "react";
import { Variants } from "./Variants";
import { Addons } from "./Addons";


export const CustomizationCart = ({ trigger, setTrigger, itemData }) => {
  console.log(itemData);
  const { name, price, defaultPrice, addons = [], variantsV2 } = itemData;
  const [selectedFirstItem, setselectedFirstItem] = useState("");
  const [selectedSecItem, setSelectedSecItem] = useState("");
  const [addonPrice, setAddonPrice] = useState(0);
  const [checked, setChecked] = useState({});
  const variantGroups = variantsV2?.variantGroups || [];

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleContinue = () => {
    if (currentIndex < variantGroups.length) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleAddToCart = () => {
    setTrigger(false);
  };

  const handleRadio = (e, index) => {
    if (index === 0) {
      setselectedFirstItem(e.target.value);
    } else if (index === 1) {
      setSelectedSecItem(e.target.value);
    }
    console.log(e.target.value);
  };

  const useBack = () => {
    setCurrentIndex(currentIndex - 1);
  };

  const changePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleAddonPrice = (e, id) => {
    const price = parseFloat(e.target.value);
    setChecked((prev) => ({ ...prev, [id]: e.target.checked }));
    if (e.target.checked) {
      setAddonPrice(addonPrice + price);
    } else {
      setAddonPrice(addonPrice - price);
    }
    console.log(e.target.value);
  };

  return trigger ? (
    <div className="fixed inset-0 flex items-center justify-center bg-[#02060c] bg-opacity-5">
      <div className=" bg-[#f0f0f5] w-2/5 h-4/6 p-5 rounded-3xl shadow-sm relative overflow-y-auto">
        <button
          className="absolute top-4 right-4 text-xl font-bold border border-neutral-800 rounded-full p-1 bg-white"
          onClick={() => setTrigger(false)}
        >
          &times;
        </button>
        <div>
          <h1 className="text-2xl font-bold text-[#6e7379]">
            {name} - ₹{price ? price / 100 : defaultPrice / 100}
          </h1>
          <h2 className="text-2xl font-bold text-[#2e2f30]">
            Customize as per your taste
          </h2>
        </div>
        <br />
        <hr />
        <div>
          {currentIndex < variantGroups.length ? (
            <Variants
              variantGroups={variantGroups}
              currentIndex={currentIndex}
              handleContinue={handleContinue}
              selectedFirstItem={selectedFirstItem}
              selectedSecItem={selectedSecItem}
              handleRadio={handleRadio}
              useBack={useBack}
            />
          ) : (
            <Addons
              addons={addons}
              handleAddToCart={handleAddToCart}
              selectedSecItem={selectedSecItem}
              changePrevious={changePrevious}
              itemData={itemData}
              handleAddonPrice={handleAddonPrice}
              addonPrice={addonPrice}
              checked={checked}
            />
          )}
        </div>
      </div>
    </div>
  ) : null;
};
