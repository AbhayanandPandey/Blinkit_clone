// GlobalProvider.jsx
import { createContext, useContext, useEffect } from "react";
import Axios from "../utils/Axios";
import Api from "../config/Api";
import { useDispatch } from "react-redux";
import { handleAddItemCart } from "../store/CartProduct";

export const GlobalContext = createContext(null);

export const useGlobal = () => useContext(GlobalContext);

const GlobalProvider = ({ children }) => {
  const dispatch = useDispatch();

  const fetchCartItems = async () => {
    try {
      const response = await Axios({ ...Api.getCartItems });
      const { data: responseData } = response;

      if (responseData.success) {
        dispatch(handleAddItemCart(responseData.data));
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  return (
    <GlobalContext.Provider value={{ fetchCartItems }}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
