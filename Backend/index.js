const express = require("express");
const app = express();
const cors = require("cors");
const { initialiseDatabase } = require("./db/db.connect");

const Product = require("./models/product.model");
const Cart = require("./models/cart.model");
const Wishlist = require("./models/wishlist.model");
const Order = require("./models/order.model");
const User = require("./models/user.model");

app.use(express.json());
app.use(cors({ origin: "*" }));

initialiseDatabase();

// ---------- PRODUCTS ----------
app.post("/products", async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/products", async (req, res) => {
  try {
    const products = await Product.find();
    if (!products.length)
      return res.status(404).json({ error: "No products found." });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/products/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: "Product not found." });
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ---------- USERS ----------

app.post("/users", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/users/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ---------- CART ----------
app.get("/cart/:userId", async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.params.userId }).populate(
      "items.product"
    );
    res.json(cart || { items: [] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/cart/:userId", async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    let cart = await Cart.findOne({ user: req.params.userId });
    if (!cart) cart = new Cart({ user: req.params.userId, items: [] });

    const existing = cart.items.find((i) => i.product.toString() === productId);
    if (existing) existing.quantity += quantity || 1;
    else cart.items.push({ product: productId, quantity: quantity || 1 });

    await cart.save();
    res.status(201).json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put("/cart/:userId/:itemId", async (req, res) => {
  try {
    const { quantity } = req.body;
    const cart = await Cart.findOne({ user: req.params.userId });
    if (!cart) return res.status(404).json({ error: "Cart not found" });

    const item = cart.items.id(req.params.itemId);
    if (!item) return res.status(404).json({ error: "Item not found" });

    item.quantity = quantity;
    await cart.save();
    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete("/cart/:userId/:itemId", async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.params.userId });
    if (!cart) return res.status(404).json({ error: "Cart not found" });

    const initialLength = cart.items.length;
    cart.items = cart.items.filter(
      (item) => item._id.toString() !== req.params.itemId
    );

    if (cart.items.length === initialLength)
      return res.status(404).json({ error: "Item not found" });

    await cart.save();
    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ---------- WISHLIST ----------
app.get("/wishlist/:userId", async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({
      user: req.params.userId,
    }).populate("products");
    res.json(wishlist || { products: [] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/wishlist/:userId", async (req, res) => {
  try {
    const { productId } = req.body;
    let wishlist = await Wishlist.findOne({ user: req.params.userId });
    if (!wishlist)
      wishlist = new Wishlist({ user: req.params.userId, products: [] });

    const index = wishlist.products.indexOf(productId);
    if (index > -1) wishlist.products.splice(index, 1);
    else wishlist.products.push(productId);

    await wishlist.save();
    res.json(wishlist);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ---------- ADDRESSES ----------
app.get("/addresses/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    res.json(user?.addresses || []);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/addresses/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    user.addresses.push(req.body);
    await user.save();
    res.status(201).json(user.addresses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put("/addresses/:userId/:addressId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    const address = user.addresses.id(req.params.addressId);
    Object.assign(address, req.body);
    await user.save();
    res.json(address);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete("/addresses/:userId/:addressId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    const initialLength = user.addresses.length;
    user.addresses = user.addresses.filter(
      (addr) => addr._id.toString() !== req.params.addressId
    );

    if (user.addresses.length === initialLength)
      return res.status(404).json({ error: "Address not found" });

    await user.save();
    res.json(user.addresses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ---------- ORDERS ----------
app.post("/orders/:userId", async (req, res) => {
  try {
    const order = new Order({ user: req.params.userId, ...req.body });
    await order.save();
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/orders/:userId", async (req, res) => {
  try {
    const orders = await Order.find({ user: req.params.userId }).populate(
      "items.product"
    );
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ---------- SERVER ----------
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
