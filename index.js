import express from "express"
const app = express()
import dotenv from "dotenv"
import connectDB from "./src/db/index.js"
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoutes from "./src/routes/auth.routes.js"
import companyRoutes from "./src/routes/company.routes.js";
import employeeRoutes from "./src/routes/employee.routes.js";



dotenv.config()



app.use(
  cors({
    origin: ["http://localhost:5173", "https://your-frontend-domain.com"],
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.use("/api/employees", employeeRoutes);
app.use("/api/company", companyRoutes);
app.use("/api/auth", authRoutes);


app.get('/', (req, res) => {
    res.send('HR Management12')
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
