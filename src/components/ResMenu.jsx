import { Shimmer } from "./Shimmer";
import { useParams } from "react-router-dom";
import { useResMenuCustomHook } from "../utils/useResMenuCustomHook";
import { useOnlineStatus } from "./useOnlineStatus";

export const ResMenu = () => {
  const { resId } = useParams();

  const restMenu = useResMenuCustomHook(resId);

  const online = useOnlineStatus();

  if (!online) return <h1>Looks like something went wrong</h1>;
  if (restMenu == null) return <Shimmer />;

  const { name, avgRating, costForTwoMessage, totalRatings, city } =
    restMenu?.cards?.[2]?.card?.card?.info || {};

  const itemCards =
    restMenu?.cards?.[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards?.[1]?.card
      ?.card?.itemCards || [];

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
