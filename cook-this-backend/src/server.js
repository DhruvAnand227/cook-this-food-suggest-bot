import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

import router from "./routes/index.js";

dotenv.config();

const app = express();

app.use(express.json());

app.use("/api/auth", router);

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("MongoDB connected");

        app.listen(3000, () => {
            console.log("Server running on port 3000");
        });
    })
    .catch((error) => {
        console.error("MongoDB connection error:", error);
    });

