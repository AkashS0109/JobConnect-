import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./Routes/user.route.js";
import companyRoute from "./Routes/company.route.js";
import jobRoute from "./Routes/job.route.js";
import applicationRoute from "./Routes/application.route.js";
 import path from "path";
 import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

 

// Load environment variables
dotenv.config({ });

const app = express();

const _dirname = path.resolve();
     


// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const corsOptions = {
     origin: ["http://localhost:5173","http://localhost:8000"],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization','Access-Control-Allow-Credentials'],
    credentials: true,
};
app.use(cors(corsOptions));

// Routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);

// Serve Frontend Static Files

app.use(express.static(path.join(__dirname, "/frontend/dist")));

app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname, "/frontend/dist/index.html"));
});


 const PORT = process.env.PORT || 3000;
// Start Server
app.listen(PORT, async () => {
    connectDB();
        console.log(`Server Running at port number ${PORT}`);
    });

