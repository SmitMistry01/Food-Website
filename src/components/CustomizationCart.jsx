import { useState } from "react";

const VariantsGroup = ({ variantGroups, currentIndex, handleContinue }) => (
  <>
    <div className="text-2xl font-semibold">
      {variantGroups[currentIndex]?.name}
    </div>
    <br />
    <div>
      {variantGroups[currentIndex]?.variations.map((variant) => (
        <>
          <div className="py-2" key={variant.id}>
            {variant.name}
          </div>
          <input type="radio"></input>
        </>
      ))}
    </div>
    <div className="text-2xl font-bold">
      Steps {currentIndex + 1}/{variantGroups.length}
    </div>
    <button
      className="px-5 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition duration-300 ease-in-out"
      onClick={handleContinue}
    >
      Continue
    </button>
  </>
);

const Addons = ({ addons, handleAddToCart }) => (
  <>
    <h2 className="text-2xl font-bold">Add-ons</h2>
    {addons.length > 0 ? (
      addons.map((addon) => (
        <>
        <div key={addon.groupId} className="mb-4">
          <div className="text-xl font-semibold">{addon.groupName}</div>
          <div>
            {addon.choices.map((choice) => (
              <>
              <div className="text-lg py-1" key={choice.id}>
                {choice.name}
              </div>
              <input type="checkbox"></input>
              </>
            ))}
          </div>
          
        </div>
        </>
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

  return trigger ? (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-10">
      <div className="bg-white w-2/5 h-4/6 p-5 rounded-3xl shadow-lg relative overflow-y-auto">
        <button
          className="absolute top-4 right-4 text-xl font-bold border border-neutral-800 rounded-xl p-1"
          onClick={() => setTrigger(false)}
        >
          &times;
        </button>
        <div>
          <h1 className="text-2xl font-bold">
            {name} - ₹{price ? price / 100 : defaultPrice / 100}
          </h1>
          <h2 className="text-2xl font-bold">Customize as per your taste</h2>
        </div>
        <br />
        <hr />
        <div>
          {currentIndex < variantGroups.length ? (
            <VariantsGroup
              variantGroups={variantGroups}
              currentIndex={currentIndex}
              handleContinue={handleContinue}
            />
          ) : (
            <Addons addons={addons} handleAddToCart={handleAddToCart} />
          )}
        </div>
      </div>
    </div>
  ) : null;
};
