export const Addons = ({
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