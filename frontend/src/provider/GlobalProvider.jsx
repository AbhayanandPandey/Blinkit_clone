import { createContext, useContext, useEffect, useState } from "react";
import Axios from "../utils/Axios";
import Api from "../config/Api";
import AxiosToastError from '../utils/AxiosToastError'
import { useDispatch, useSelector } from "react-redux";
import { handleAddItemCart } from "../store/CartProduct";
import toast from "react-hot-toast";

export const GlobalContext = createContext(null);

export const useGlobal = () => useContext(GlobalContext);

const GlobalProvider = ({ children }) => {
  const dispatch = useDispatch();
  const [totoalPrice, setTotalPrice] = useState(0)
  const [totalQty, setTotalQty] = useState(0)
  const cartItem = useSelector(state => state.cartItem.cartProducts)


  const fetchCartItems = async () => {
    try {

      const response = await Axios({ ...Api.getCartItems });
      const { data: responseData } = response;

      if (responseData.success) {
        dispatch(handleAddItemCart(responseData.data));
      }
    } catch (error) {
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
          fetchCartItems();
        } else if (qty < oldQty) {
          fetchCartItems();
          toast.success("Item Removed");
        }
        fetchCartItems();
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  const deleteCartItem = async (cardId) => {
    try {
      const response = await Axios({
        ...Api.deleteCartItem,
        data: {
          _id: cardId
        }
      })
      const { data: responseData } = response;
      if (responseData.success) {
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


  useEffect(() => {
    const qty = cartItem.reduce(
      (preve, cur) => preve + (cur.quantity || 0),
      0
    );
    const price = parseFloat(
      cartItem.reduce(
        (preve, cur) =>
          preve + ((cur.productId.price - (cur.productId.price * (cur.productId.discount || 0) / 100)) * (cur.quantity || 0)),
        0
      ).toFixed(2)
    );
    setTotalQty(qty);
    setTotalPrice(price);
  }, [cartItem]);


  return (
    <GlobalContext.Provider value={{
      fetchCartItems, handleUpdateQty, deleteCartItem, totoalPrice, totalQty
    }}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
