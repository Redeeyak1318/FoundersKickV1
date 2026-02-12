import jwt from "jsonwebtoken";
import User from "../database/models/User.js";

export const requireAuth = async (req, res, next) => {
  try {
    // ===== DEBUG LOGS =====
    console.log("=== AUTH DEBUG ===");
    console.log("Auth header:", req.headers.authorization);
    console.log("JWT secret exists:", !!process.env.JWT_SECRET);

    // ===== READ TOKEN =====
    const header = req.headers.authorization || "";

    if (!header.startsWith("Bearer ")) {
      console.log("No Bearer token");
      return res.status(401).json({ message: "Unauthorized" });
    }

    const token = header.slice(7);

    if (!token) {
      console.log("Empty token");
      return res.status(401).json({ message: "Unauthorized" });
    }

    // ===== VERIFY JWT =====
    let decoded;

    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log("JWT valid:", decoded);
    } catch (err) {
      console.log("JWT ERROR:", err.message);
      return res.status(401).json({ message: "Invalid token" });
    }

    // ===== LOAD USER =====
    const user = await User.findById(decoded.sub || decoded.id).select("-password");

    if (!user) {
      console.log("User not found");
      return res.status(401).json({ message: "Unauthorized" });
    }

    // ===== ATTACH USER =====
    req.user = user;

    console.log("Auth success:", user._id);

    next();

  } catch (err) {
    console.error("Auth middleware crash:", err);
    res.status(500).json({ message: "Server auth error" });
  }
};
