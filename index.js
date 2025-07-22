import express from "express"
const app = express()
import dotenv from "dotenv"
import connectDB from "./src/db/index.js"
import cookieParser from "cookie-parser";
import cors from "cors";
import mongoose from "mongoose";
import authRoutes from "./src/routes/auth.routes.js"




app.use(express.json());
app.use(cookieParser());

dotenv.config()

app.use("/api/auth", authRoutes);


app.get('/', (req, res) => {
  res.send('HR Management1!')
})

connectDB()
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`⚙️  Server is running at port : ${process.env.PORT}`);
        });
    })
    .catch((err) => {
        console.log("MONGO DB connection failed !!! ", err);
    });
