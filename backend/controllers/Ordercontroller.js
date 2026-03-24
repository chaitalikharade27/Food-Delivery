import OrderModel from "../models/OrderModel.js";
import UserModel from "../models/UserModel.js";


const placeorder = async (req, res) => {
  try {
    const {
      fname,
      lname,
      email,
      street,
      city,
      state,
      zipcode,
      country,
      phone,
      totalAmount,
      userId
    } = req.body;


    const user = await UserModel.findById(userId);
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

   // console.log("USER CART DATA:", user.cartdata);
 //convert object into array
    const items = Object.entries(user.cartdata || {}).map(
      ([itemId, quantity]) => ({
        itemId,
        quantity
      })
    );

    //console.log("ORDER ITEMS:", items);

    const address = {
      fname,
      lname,
      email,
      street,
      city,
      state,
      zipcode,
      country,
      phone
    };

    const newOrder = new OrderModel({
      userId,
      items,
      amount: totalAmount,
      address,
      payment: true
    });

    await newOrder.save();

    user.cartdata = {};
    await user.save();

    res.json({
      success: true,
      message: "Order placed successfully",
      orderId: newOrder._id
    });

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Order failed" });
  }
};

const getUserOrders = async (req, res) => {
  try {
    // auth middleware sets req.userId for logged in users
    const userId = req.userId || (req.body && req.body.userId) || (req.query && req.query.userId);

    if (!userId) {
      return res.json({ success: false, message: "User ID not provided" });
    }

    const orders = await OrderModel.find({ userId }).sort({ date: -1 });
    return res.json({ success: true, message: "User orders fetched", orders });
  } catch (error) {
    console.error("getUserOrders error", error);
    return res.json({ success: false, message: "Error fetching user orders" });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await OrderModel.find().sort({ date: -1 });
    return res.status(200).json({ success: true, message: "All orders fetched", orders });
  } catch (error) {
    console.error("getAllOrders error", error);
    return res.status(500).json({ success: false, message: "Error fetching all orders" });
  }
};

//.sort({date:-1});

export { placeorder, getUserOrders, getAllOrders };



