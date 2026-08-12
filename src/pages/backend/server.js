const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const { OAuth2Client } = require("google-auth-library");

dotenv.config();

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use(express.json());

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB error:", err));

// User schema
const userSchema = new mongoose.Schema(
  {
    name: String,
    email: {
      type: String,
      required: true,
      unique: true,
    },
    googleId: String,
    loginMethod: String,
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

// Test backend
app.get("/", (req, res) => {
  res.send("ParkGuardian Backend is running");
});

// EMAIL LOGIN
app.post("/api/login/email", async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email required",
      });
    }

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        email,
        loginMethod: "email",
      });
    }

    res.json({
      success: true,
      message: "Email saved",
      user,
    });
  } catch (error) {
    console.log("Email login error:", error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

// GOOGLE LOGIN
app.post("/api/login/google", async (req, res) => {
  try {
    const { credential } = req.body;

    if (!credential) {
      return res.status(400).json({
        success: false,
        message: "Google credential missing",
      });
    }

    const ticket = await googleClient.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    const googleId = payload.sub;
    const email = payload.email;
    const name = payload.name;

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        name,
        email,
        googleId,
        loginMethod: "google",
      });
    } else {
      user.googleId = googleId;
      user.name = name;
      user.loginMethod = "google";
      await user.save();
    }

    res.json({
      success: true,
      message: "Google login successful",
      user,
    });
  } catch (error) {
    console.log("Google authentication error:", error);

    res.status(401).json({
      success: false,
      message: "Google authentication failed",
    });
  }
});

// START SERVER
app.listen(process.env.PORT || 5000, () => {
  console.log("Backend running on http://localhost:5000");
});