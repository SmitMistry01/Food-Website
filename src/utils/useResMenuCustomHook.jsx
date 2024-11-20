import { useState ,useEffect } from "react";
import { MENU_URL } from "../utils/constants";

export const useResMenuCustomHook = (resId) => {
  const [restMenu, setRestMenu] = useState(null);
  
  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    const data = await fetch(MENU_URL + resId);
    const json = await data.json();
    console.log(json);

    setRestMenu(json.data);
  };

  return restMenu;
};
