import { Shimmer } from "./Shimmer";
import { useParams } from "react-router-dom";
import { useResMenuCustomHook } from "../utils/useResMenuCustomHook";
import { useOnlineStatus } from "./useOnlineStatus";
import { ResMenuCard } from "./ResMenuCard";

export const ResMenu = () => {
  const { resId } = useParams();

  const restMenu = useResMenuCustomHook(resId);

  const online = useOnlineStatus();

  if (!online) return <h1 className="text-3xl font-bold m-auto my-5">Looks like something went wrong</h1>;
  if (restMenu == null) return <Shimmer />;

  const { name, avgRating, costForTwoMessage, totalRatings, city } =
    restMenu?.cards?.[2]?.card?.card?.info || {};

  const itemCards =
    restMenu?.cards?.[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards?.[1]?.card
      ?.card?.itemCards || [];

  const categories =
    restMenu?.cards?.[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
      (c) =>
        c?.card.card?.["@type"] ==
        "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
    );
  console.log(categories);

  return (
    <>
      <div className="flex justify-center my-5">
        <div className="bg-white shadow-2xl rounded-2xl w-[60%] p-5">
          {/* Card Header */}
          <div className="mb-4 font-poppins">
            {/* Name Section */}
            <h1 className="text-3xl font-bold text-gray-800 mb-2">{name}</h1>

            {/* Rating Section */}
            <div className="flex items-center space-x-3 mb-3">
              <svg
                className="w-6 h-6 text-yellow-500 hover:scale-110 transition-transform"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M12 17.75l-6.955 3.69 1.333-7.778L1 8.822l7.88-1.146L12 1.25l3.12 6.426 7.88 1.146-5.378 5.84 1.333 7.778z" />
              </svg>
              <h2 className="text-xl text-gray-600">
                {avgRating}{" "}
                <span className="text-sm text-gray-500">({totalRatings})</span>
              </h2>
            </div>

            {/* Cost Section */}
            <div className="flex items-center space-x-3 mb-3">
              <svg
                className="w-6 h-6 text-green-500 hover:scale-110 transition-transform"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M12 1a11 11 0 1 0 11 11A11 11 0 0 0 12 1zm-1 16h2v2h-2zm0-10h2v8h-2z" />
              </svg>
              <h2 className="text-lg text-gray-500">{costForTwoMessage}</h2>
            </div>

            {/* Location Section */}
            <div className="flex items-center space-x-3">
              <svg
                className="w-6 h-6 text-blue-500 hover:scale-110 transition-transform"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7zm0 9.5a2.5 2.5 0 1 1 2.5-2.5A2.5 2.5 0 0 1 12 11.5z" />
              </svg>
              <h3 className="text-lg text-gray-500 font-bold">
                Outlet: {city}
              </h3>
            </div>
          </div>
        </div>
      </div>
      
        {/* categories accordion */}

        {categories.map((category) => (
          <div key={category?.card?.card?.id}>
            <ResMenuCard data={category?.card?.card} />
          </div>
        ))}
    </>
  );
};
