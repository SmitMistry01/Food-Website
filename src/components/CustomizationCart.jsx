import { useState } from "react";

const VariantsGroup = ({
  variantGroups,
  currentIndex,
  handleContinue,
  selectedItem,
  handleRadio,
  useBack
}) => (
  <>
    {/* {currentIndex > 0 ? (
      <div className="text-semibold bg-white flex justify-between p-3 rounded-3xl">
        <div>{selectedItem}</div>
        <div className="changebtn">
          <button className="text-xl font-semibold bg-white text-orange-500" onClick={useBack}>
            Change
          </button>
        </div>
      </div>
    ) : (
      ""
    )}
    <br></br> */}
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
                checked={selectedItem === variant.name}
                onChange={handleRadio}
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

const Addons = ({ addons, handleAddToCart }) => (
  <>
    <h2 className="text-2xl font-bold">Add-ons</h2>
    {addons.length > 0 ? (
      addons.map((addon) => (
        <div key={addon.groupId} className="mb-4">
          <div className="text-xl font-semibold">{addon.groupName}</div>
          <div className="bg-white">
            {addon.choices.map((choice) => (
              <div key={choice.id} className="flex justify-between">
                <div className="text-lg py-1">
                  {choice.name} -
                  {choice.price
                    ? choice.price / 100
                    : choice.defaultPrice / 100}
                </div>

                <input type="checkbox"></input>
              </div>
            ))}
          </div>
        </div>
      ))
    ) : (
      <div className="text-xl text-gray-500">No add-ons available.</div>
    )}
    <button
      className="px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-300 ease-in-out mt-4"
      onClick={handleAddToCart}
    >
      Add items to cart
    </button>
  </>
);

export const CustomizationCart = ({ trigger, setTrigger, itemData }) => {
  console.log(itemData);
  const { name, price, defaultPrice, addons = [], variantsV2 } = itemData;
  const [selectedItem, setSelectedItem] = useState("");
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

  const handleRadio = (e) => {
    setSelectedItem(e.target.value);
    console.log(e.target.value);
  };

  const useBack = () =>{
    setCurrentIndex(currentIndex-1)
  }
  return trigger ? (
    <div className="fixed inset-0 flex items-center justify-center bg-[#02060c] bg-opacity-5">
      <div className=" bg-[#f0f0f5] w-2/5 h-4/6 p-5 rounded-3xl shadow-sm relative overflow-y-auto">
        <button
          className="absolute top-4 right-4 text-xl font-bold border border-neutral-800 rounded-xl p-1"
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
              selectedItem={selectedItem}
              handleRadio={handleRadio}
              useBack={useBack}
            />
          ) : (
            <Addons addons={addons} handleAddToCart={handleAddToCart} />
          )}
        </div>
      </div>
    </div>
  ) : null;
};
