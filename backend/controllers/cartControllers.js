import userModel from "../models/UserModel.js";

// add items to user cart
const addToCart = async (req, res) => {
  try {
    const { userId, itemId } = req.body;
    console.log("Add to Cart: userId", userId, "itemId", itemId); // Debugging

    let userData = await userModel.findById(userId);
    let cartData = userData.cartData || {};

    if (!cartData[itemId]) {
      cartData[itemId] = 1;
    } else {
      cartData[itemId] += 1;
    }

    await userModel.findByIdAndUpdate(userId, { cartData });
    res.json({ success: true, message: "Added to Cart" });
  } catch (error) {
    console.error("Add to Cart Error:", error); // Debugging
    if (res && res.status) {
      res.status(500).json({ success: false, message: "Error" });
    }
  }
};

// remove items from user cart
const removeFromCart = async (req, res) => {
  try {
    const { userId, itemId } = req.body;
    console.log("Remove from Cart: userId", userId, "itemId", itemId); // Debugging

    let userData = await userModel.findById(userId);
    let cartData = userData.cartData;

    if (cartData[itemId] > 1) {
      cartData[itemId] -= 1;
    } else {
      delete cartData[itemId];
    }

    await userModel.findByIdAndUpdate(userId, { cartData });
    res.json({ success: true, message: "Removed from Cart" });
  } catch (error) {
    console.error("Remove from Cart Error:", error); // Debugging
    if (res && res.status) {
      res.status(500).json({ success: false, message: "Error" });
    }
  }
};

// fetch user cart data
const getCart = async (req, res) => {
  try {
    const userId = req.body.userId;
    const userData = await userModel.findById(userId);
    const cartData = (await userData.cartData) || {};

    res.json({ success: true, cartData });
  } catch (error) {
    console.error("Get Cart Error:", error);
    res.status(500).json({ success: false, message: "Error" });
  }
};

export { addToCart, removeFromCart, getCart };
