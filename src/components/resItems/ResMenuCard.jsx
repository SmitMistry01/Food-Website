import { ItemCards } from "./ItemCards";

export const ResMenuCard = ({ data, showItems, setShowIndex }) => {
  //console.log(data);

  const handleToggle = () => {
    //setToggle(!toggle)
    //we have given the rights to show the items to parent component that is ResMenu.jsx
    setShowIndex();
  };
  return (
    <div className="w-[60%] mx-auto my-7 shadow-xl p-6 bg-gray-50 rounded-xl">
      <div className="flex justify-between">
        <span
          className="text-xl font-bold cursor-pointer hover:text-orange-500 hover:text-2xl"
          onClick={handleToggle}
        >
          {data.title} ({data.itemCards.length})
        </span>
        <span
          className="font-bold text-xl cursor-pointer hover:text-orange-500 hover:text-2xl"
          onClick={handleToggle}
        >
          ∇
        </span>
      </div>
      {showItems ? <ItemCards itemData={data?.itemCards} /> : null}
    </div>
  );
};
