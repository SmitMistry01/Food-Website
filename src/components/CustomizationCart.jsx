import { useState } from "react";

const VariantsGroup = ({
  variantGroups,
  currentIndex,
  handleContinue,
  selectedFirstItem,
  selectedSecItem,
  handleRadio,
  useBack,
}) => (
  <>
    {currentIndex > 0 ? (
      <div className="text-semibold bg-white flex justify-between p-3 rounded-3xl">
        <div>{selectedFirstItem}</div>
        <div className="changebtn">
          <button
            className="text-xl font-semibold bg-white text-orange-500"
            onClick={useBack}
          >
            Change
          </button>
        </div>
      </div>
    ) : (
      ""
    )}
    <br></br>
    <div className="text-2xl font-semibold">
      {variantGroups[currentIndex]?.name}
    </div>
    <br />
    <div className=" bg-white rounded-3xl p-2">
      {variantGroups[currentIndex]?.variations.map((variant, key) => (
        <>
          <div key={variant.id}>
            <div className="flex justify-between">
              <div className="py-2">{variant.name}</div>
              <input
                type="radio"
                name="item"
                value={variant.name}
                checked={
                  currentIndex === 0
                    ? selectedFirstItem === variant.name
                    : selectedSecItem === variant.name
                }
                onChange={(e) => handleRadio(e, currentIndex)}
              ></input>
            </div>
          </div>
        </>
      ))}
    </div>
    <div className="flex justify-between mt-16">
      <div className="text-2xl font-bold">
        Steps {currentIndex + 1}/{variantGroups.length}
      </div>
      <button
        className="px-5 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition duration-300 ease-in-out"
        onClick={handleContinue}
      >
        Continue
      </button>
    </div>
  </>
);

const Addons = ({
  addons,
  handleAddToCart,
  selectedSecItem,
  changePrevious,
  itemData,
  handleAddonPrice,
  addonPrice,
  checked,
}) => (
  <>
    <div className="text-semibold bg-white flex justify-between p-3 rounded-3xl">
      <div>{selectedSecItem}</div>
      <div className="changebtn">
        <button
          className="text-xl font-semibold bg-white text-orange-500"
          onClick={changePrevious}
        >
          Change
        </button>
      </div>
    </div>
    {addons.length > 0
      ? addons.map((addon) => (
          <div key={addon.groupId} className="mb-4">
            <div className="text-xl font-semibold mb-2">
              {addon.groupName} (optional)
            </div>
            <div className="bg-white p-2 rounded-2xl shadow-md">
              {addon.choices.map((choice) => (
                <div
                  key={choice.id}
                  className="flex justify-between items-center mb-2"
                >
                  <div className="text-lg py-1">
                    {choice.name} - ₹
                    {choice.price
                      ? choice.price / 100
                      : choice.defaultPrice / 100}
                  </div>
                  <input
                    type="checkbox"
                    name="addons"
                    className="form-checkbox h-5 w-5 text-green-600"
                    onChange={(e) => handleAddonPrice(e, choice.id)}
                    value={choice.price ? choice.price / 100 : choice.defaultPrice / 100}
                    checked={checked[choice.id] || false}
                  ></input>
                </div>
              ))}
            </div>
          </div>
        ))
      : ""}
    <div className="flex justify-between mt-10">
      <div className="text-2xl font-bold text-orange-500">
        ₹{(itemData.price ? itemData.price / 100 : itemData.defaultPrice / 100) + addonPrice}
      </div>
      <div className="">
        <button
          className="p-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-300 ease-in-out"
          onClick={handleAddToCart}
        >
          Add items to cart
        </button>
      </div>
    </div>
  </>
);


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
            <VariantsGroup
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