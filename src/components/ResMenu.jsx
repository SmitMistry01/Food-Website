import { useState, useEffect } from "react";
import { MENU_URL } from "../utils/constants";
import { Shimmer } from "./Shimmer";
import { useParams } from "react-router-dom";

export const ResMenu = () => {
  const [restMenu, setRestMenu] = useState(null);
  const {resId} = useParams();
  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    const data = await fetch(MENU_URL + resId);
    const json = await data.json();
    console.log(json);

    setRestMenu(json.data);
  };

  if (restMenu == null) return <Shimmer />;

  const { name, avgRating, costForTwoMessage, totalRatings, city } =
    restMenu?.cards?.[2]?.card?.card?.info || {};

  const { itemCards } =
    restMenu?.cards?.[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards?.[1]?.card
      ?.card || {};
  console.log(itemCards);
  return (
    <>
      <div className="menu">
        <h1>{name}</h1>
        <h2>
          {avgRating}-({totalRatings})
        </h2>
        <h2>{costForTwoMessage}</h2>
        <h3>Outlet {city}</h3>
      </div>
      <div className="items">
        {itemCards.map((item) => (
          <li key={item?.card?.info?.id}>{item?.card?.info?.name}</li>
        ))}
      </div>
    </>
  );
};
