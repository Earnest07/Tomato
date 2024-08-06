import { createContext, useEffect, useState } from "react";
// import { food_list } from "../assets/assets";
import axios from "axios";

const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const url = "http://localhost:4000";
  const [token, setToken] = useState("");
  const [food_list, setFoodList] = useState([]);

  const addToCart = async (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1,
    }));

    const config = {
      headers: {
        token: token,
      },
    };

    if (token) {
      await axios.post(url + "/api/cart/add", { itemId }, config);
    }
  };

  const removeFromCart = async (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    if (token) {
      const config = {
        headers: {
          token: token,
        },
      };
      await axios.post(
        url + "/api/cart/remove",
        { itemId },
        { headers: { token } }
      );
    }
  };

  const [cartTotal, setCartTotal] = useState(0);

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = food_list.find((product) => product._id === item);
        totalAmount += itemInfo.price * cartItems[item];
      }
    }

    return totalAmount;
  };

  const loadCartData = async (token) => {
    console.log("Token : " + token);
    const { data } = await axios.post(
      url + "/api/cart/get",
      {},
      { headers: { token } }
    );

    setCartItems(data.cartData);
  };

  const fetchFoodList = async () => {
    const response = await axios.get(url + "/api/food/list");
    console.log(response.data.data);
    setFoodList(response.data.data);
  };

  useEffect(() => {
    async function loadData() {
      await fetchFoodList();
      let thisUser = localStorage.getItem("token");
      if (localStorage.getItem("token")) {
        setToken(localStorage.getItem("token"));
        await loadCartData(thisUser);
      }
    }
    loadData();
  }, []);

  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url,
    token,
    setToken,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export { StoreContextProvider, StoreContext };
