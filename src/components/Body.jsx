import { ResCard } from "./ResCard";
import { RES_URL } from "../utils/constants";
import { useEffect, useState } from "react";
import { Shimmer } from "./Shimmer";

export const Body = () => {
  const [listOfResto, setListOfResto] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filteredRestaurant, setFilteredRestaurant] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const jsonData = await fetch(RES_URL);
      const data = await jsonData.json();

      const card = data?.data?.cards.find(
        (card) => card.card.card["id"] === "restaurant_grid_listing"
      );
      const resData =
        card?.card?.card?.gridElements?.infoWithStyle?.restaurants || [];
      setListOfResto(resData);
      setFilteredRestaurant(resData); // Initialize both states
    } catch (error) {
      console.error("Error fetching restaurant data:", error);
    }
  };

  return (
    <>
      <div className="flex items-center p-6 space-x-3">
        <input
          type="text"
          value={searchText}
          placeholder="Search for restaurants..."
          className="w-96 max-w-md p-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400"
          onChange={(e) => setSearchText(e.target.value)}
        />
        <button
          className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition duration-300 ease-in-out"
          onClick={() => {
            const filteredRes = listOfResto.filter((res) =>
              res.info.name.toLowerCase().includes(searchText.toLowerCase())
            );
            setFilteredRestaurant(filteredRes);
          }}
        >
          Search
        </button>
        <div className="px-7">
          <button
            className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition duration-300 ease-in-out"
            onClick={() => {
              const filteredList = listOfResto.filter(
                (l) => l.info.avgRating > 4
              );
              setFilteredRestaurant(filteredList);
            }}
          >
            Top Rated Restaurants
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
        {listOfResto.length > 0
          ? filteredRestaurant.map((restaurant, index) => (
              <ResCard key={restaurant.id || index} resData={restaurant} />
            ))
          : Array(20)
              .fill()
              .map((_, index) => <Shimmer key={index} />)}
      </div>
    </>
  );
};
