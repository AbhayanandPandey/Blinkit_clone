import { createContext, useContext, useEffect } from "react";
import Axios from "../utils/Axios";
import Api from "../config/Api";
import AxiosToastError from '../utils/AxiosToastError'
import { useDispatch } from "react-redux";
import { handleAddItemCart } from "../store/CartProduct";
import toast from "react-hot-toast";

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
      AxiosToastError(error)
    }
  };

  const handleUpdateQty = async (id, qty, oldQty) => {
  try {
    const response = await Axios({
      ...Api.updateCartItem,
      data: {
        _id: id,
        qty: qty
      }
    });

    const { data: responseData } = response;

    if (responseData.success) {
      if (qty > oldQty) {
        toast.success("Item Added");
      } else if (qty < oldQty) {
        toast.success("Item Removed");
      }
      fetchCartItems();
    }
  } catch (error) {
    AxiosToastError(error);
  }
};


  const deleteCartItem = async(cardId)=>{
    try {
      const response = await Axios({
        ...Api.deleteCartItem,
        data:{
          _id : cardId
        }
      })
      const {data : responseData} = response;
      if(responseData.success)
      {
        toast.success(responseData.message)
        fetchCartItems()
      }
    } catch (error) {
      AxiosToastError(errer)
    }
  }

  useEffect(() => {
    fetchCartItems();
  }, []);

  return (
    <GlobalContext.Provider value={{ 
      fetchCartItems,handleUpdateQty,deleteCartItem }}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
