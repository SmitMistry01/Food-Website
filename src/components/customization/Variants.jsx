export const Variants = ({
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