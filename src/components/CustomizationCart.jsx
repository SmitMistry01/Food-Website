export const CustomizationCart = ({ trigger, setTrigger, itemData }) => {
  console.log(itemData);
  const { name, price, defaultPrice, addons } = itemData;
  return trigger ? (
    <>
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-10">
        <div className="bg-white w-2/5 h-4/6 p-5 rounded-3xl shadow-lg relative overflow-y-auto">
          <button
            className="absolute top-4 right-4 text-xl font-bold border border-neutral-800 rounded-xl p-1"
            onClick={() => setTrigger(false)}
          >
            &times;
          </button>
          {name} - ₹{price ? price / 100 : defaultPrice / 100}
          <h2 className="text-2xl font-bold">Customise as per your taste</h2>
          <br></br>
          <hr></hr>
          <div className="">
            {addons.map((addon) => (
              <>
                <div className=" text-2xl text-semibold">{addon.groupName}</div>
                <br></br>
                {addon.choices.map((choice) => (
                  <div className="text-xl">{choice.name}</div>
                ))}
              </>
            ))}
          </div>
        </div>
      </div>
    </>
  ) : null;
};
