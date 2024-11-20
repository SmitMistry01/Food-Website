export const useResData = () =>
{
    const [listOfResto, setListOfResto] = useState([]);
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
        setFilteredRestaurant(resData); 
      } catch (error) {
        console.error("Error fetching restaurant data:", error);
      }
    };

    return listOfResto;
}