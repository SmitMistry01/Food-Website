import { ItemCards } from "./ItemCards";

export const ResMenuCard = ({ data }) => {
  console.log(data);
  return (
    <div className="w-[60%] mx-auto my-7 shadow-xl p-6 bg-gray-50 rounded-xl">
      <div className="flex justify-between">
        <span className="text-xl font-bold">
          {data.title} ({data.itemCards.length})
        </span>
        <span className="font-bold text-xl">∇</span>
      </div>
      <ItemCards itemData = {data?.itemCards}/>
    </div>
  );
};
