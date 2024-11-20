import { ResCard, withPromotedLabel } from "./ResCard";
import { RES_URL } from "../utils/constants";
import { useEffect, useState } from "react";
import { Shimmer } from "./Shimmer";
import { Link } from "react-router-dom";
import { SearchBox } from "./SearchBox";

export const Body = () => {
  const [listOfResto, setListOfResto] = useState([]);
  const [filteredRestaurant, setFilteredRestaurant] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(RES_URL);
      const data = await response.json();
      console.log(data);
      const restaurants =
        data?.data?.cards?.find(
          (card) => card.card.card["id"] === "restaurant_grid_listing"
        )?.card?.card?.gridElements?.infoWithStyle?.restaurants || [];
      console.log(restaurants);
      setListOfResto(restaurants);
      setFilteredRestaurant(restaurants);
    } catch (error) {
      console.error("Error fetching restaurant data:", error);
    }
  };

  const ResCardPromoted = withPromotedLabel(ResCard);

  if (listOfResto.length === 0) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
        {Array(20)
          .fill()
          .map((_, index) => (
            <div key={index} className="border border-gray-300 rounded-lg">
              <Shimmer />
            </div>
          ))}
      </div>
    );
  }

  return (
    <>
      <div className="flex items-center p-6 space-x-3">
        {/* Search Box */}
        <SearchBox resdata={listOfResto} onSearch={setFilteredRestaurant} />
        {/* Top Rated Button */}
        <button
          className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition duration-300 ease-in-out"
          onClick={() =>
            setFilteredRestaurant(
              listOfResto.filter((r) => r.info.avgRating > 4)
            )
          }
        >
          Top Rated Restaurants
        </button>
      </div>

      {/* Restaurant Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
        {filteredRestaurant.map((restaurant) => (
          <Link
            to={`/restaurant/${restaurant.info.id}`}
            key={restaurant.info.id}
          >
            {restaurant.info.avgRating > 4.3 ? (
              <ResCardPromoted resData={restaurant} />
            ) : (
              <ResCard resData={restaurant} />
            )}
          </Link>
        ))}
      </div>
    </>
  );
};
