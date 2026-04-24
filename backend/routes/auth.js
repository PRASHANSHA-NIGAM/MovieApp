const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middleware/authMiddleware");

// ✅ SIGNUP
router.post("/signup", async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      email,
      password: hashedPassword,
      favorites: []
    });

    await user.save();

    res.json({ msg: "User registered successfully" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ LOGIN
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid password" });

    const token = jwt.sign({ id: user._id }, "secretkey", {
      expiresIn: "1d"
    });

    res.json({ msg: "Login successful", token });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ❤️ ADD FAVORITE
router.post("/favorite", authMiddleware, async (req, res) => {
  const user = await User.findById(req.user.id);

  user.favorites.push(req.body);
  await user.save();

  res.json(user.favorites);
});

// 📄 GET FAVORITES
router.get("/favorites", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.json(user.favorites);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;