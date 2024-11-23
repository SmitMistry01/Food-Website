import { CDN_URL } from "../../utils/constants";
import { Shimmer } from "../Shimmer";
import { useOnlineStatus } from "../../utils/useOnlineStatus";

export const ResCard = ({ resData }) => {
  const {
    name,
    cloudinaryImageId,
    avgRating,
    cuisines,
    costForTwo,
    aggregatedDiscountInfoV3,
  } = resData?.info || {};

  const { deliveryTime } = resData?.info.sla || {};
  const { header, subHeader } = resData?.info.aggregatedDiscountInfoV3 || {};

  const useOnline = useOnlineStatus();
  if (!resData) {
    return <Shimmer />;
  }

  return (
    <div className="max-w-sm rounded-lg overflow-hidden bg-white transition duration-500 ease-in-out transform hover:scale-105 p-5 shadow-lg hover:shadow-2xl border-2 border-gray-200 shadow-bottom-black">
      {/* Restaurant Image */}
      <div  className="relative w-full h-48">
        <img
          src={CDN_URL + cloudinaryImageId}
          alt="Restaurant"
          className={`w-full h-full object-cover rounded-lg transition-all duration-300 ease-in-out transform hover:scale-90 ${
            !useOnline ? "opacity-30" : ""
          }`}
        />

        {/* Discount Info */}
        <div className="absolute bottom-1 left-4 bg-black bg-opacity-50 px-2 py-1 rounded-md">
          <h3 className="text-white text-xl font-black">{header} {subHeader}</h3>
        </div>
      </div>

      {/* Restaurant Details */}
      <div className="p-5">
        {/* Restaurant Name */}
        <h3 className="text-2xl font-semibold text-gray-800">{name}</h3>

        {/* Cuisine */}
        <h4 className="text-sm text-gray-600 mt-2">{cuisines.join(", ")}</h4>

        {/* Rating */}
        <div className="flex items-center mt-2">
          <span className="text-yellow-500 text-lg">⭐</span>
          <span className="ml-1 text-gray-700">{avgRating}</span>
        </div>

        {/* Delivery Time */}
        <h4 className="text-sm text-gray-600 mt-2">
          Delivery Time: {deliveryTime} mins
        </h4>
        <h4 className="text-sm text-gray-600 mt-2">{costForTwo}</h4>

        {/* Order Now Button */}
        <button
          className={`mt-4 px-4 py-2 bg-orange-600 text-white rounded-full w-full hover:bg-orange-700 transition-all duration-300 ease-in-out transform hover:scale-105 ${
            !useOnline ? "opacity-30" : ""
          }`}
        >
          Order Now
        </button>
      </div>
    </div>
  );
};

export const withPromotedLabel = (ResCard) => {
  return (props) => {
    return (
      <div className="relative">
        {/* Promoted Label */}
        <div className="absolute top-0 bg-orange-900 text-white text-xs font-bold px-5 py-2 rounded-md z-10 shadow-lg">
          Most Ratings
        </div>
        <ResCard {...props} />
      </div>
    );
  };
};
