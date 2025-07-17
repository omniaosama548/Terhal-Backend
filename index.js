import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";

import http from "http";
import cors from "cors";
import { Server } from "socket.io";
import redisClient from "./lib/redisClient.js";


import authRoutes from "./routes/authRoutes.js";
import profileRoute from "./routes/profileRoutes.js";
import favouriteRoutes from "./routes/place-routes/FavouritePlace.Route.js";
import ratingRoutes from "./routes/place-routes/RatingPlace.Route.js";
import placeRoutes from "./routes/placesRoutes.js";
import eventRouter from './routes/eventRoutes.js';
import adminRouter from './routes/adminRoutes.js';
import adminAuthRouter from './routes/adminAuthRoutes.js';
import historyRoutes from './routes/user-routes/history.route.js';
import deleteRoutes from './routes/user-routes/deleteUser.route.js';
import favoriteRoutes from './routes/user-routes/favorite.route.js';
import assistantRouter from './routes/assestant.js';
import reviewRoutes from './routes/user-routes/review.route.js';
import categoryRouter from './routes/categoryRoutes.js';
import adminPlaceRoutes from './routes/adminPlaceRoutes.js';
import adminStatsRoutes from "./routes/adminStats.routes.js";
import { initUserSocket } from "./sockets/userSocket.js";
import paymentRoutes from "./routes/paymentRoutes.js";

dotenv.config();

const app = express();
const port = 3000;
app.use(express.json());
app.use(cors());
app.use("/uploads", express.static("uploads"));
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use('/auth', authRoutes);
app.use('/auth/admin',adminAuthRouter);
app.use('/admin', adminRouter);

// admin place curd
app.use('/admin/place', adminPlaceRoutes); 
// [MODIFIED] /places/suggested endpoint is now available for both anonymous and registered users
// favourite routes
app.use("/places", favouriteRoutes);

// Use the rating route
app.use("/places", ratingRoutes);
app.use("/places", placeRoutes);

//  event routes
app.use("/events", eventRouter);

//profile routes
app.use("/profile", profileRoute);

// user routes
app.use("/user", historyRoutes);
app.use("/user", deleteRoutes);
app.use("/user", favoriteRoutes);
app.use("/user/reviews", reviewRoutes);

// payment routes
app.use("/payment", paymentRoutes);

app.use("/assestant", assistantRouter);

app.use("/categories", categoryRouter);

app.use("/admin/stats", adminStatsRoutes);

const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" },
});

initUserSocket(io);

console.log("MONGO_URI =", process.env.MONGO_URI);

// mongoose.connect(process.env.MONGO_URI)
//   .then(() => {
//     console.log('Connected to MongoDB');
//     app.listen(port, () => {
//       console.log(`Server is running at http://localhost:${port}`);
//     });
//   })
//   .catch((err) => {
//     console.error('MongoDB connection error:', err);
//   });


(async () => {
  try {
    await redisClient.connect();
    console.log("Connected to Redis");

    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    server.listen(port||process.env.PORT, () => {
      console.log(`Server is running at http://localhost:${port}`);
    });
  } catch (err) {
    console.error("Startup error:", err);
  }
})();
