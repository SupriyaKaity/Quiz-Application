// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import connectDB from "./config/db.js";
// import userRouter from "./routes/userRoutes.js";
// import resultRouter from "./routes/resultRoutes.js";

// dotenv.config();

// const app = express();
// const PORT = process.env.PORT || 9999;

// console.log("JWT_SECRET loaded:", process.env.JWT_SECRET ? "Yes" : "No");

// // MIDDLEWARE
// //app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // DB
// connectDB();

// // ROUTES
// app.use("/api/auth", userRouter);
// app.use("/api/results", resultRouter);

// app.get("/", (req, res) => {
//   res.send("API WORKING");
// });

// app.listen(PORT, () => {
//   console.log(`Server Started on port ${PORT}`);
// });



import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRouter from "./routes/userRoutes.js";
import resultRouter from "./routes/resultRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 9999;

console.log("JWT_SECRET loaded:", process.env.JWT_SECRET ? "Yes" : "No");

// CORS configuration - Allow Netlify frontend
const allowedOrigins = [
  "http://localhost:5173",           // Local development
  "http://localhost:3000",           // Alternative local
  "https://your-netlify-app.netlify.app",  // REPLACE with your Netlify URL
  "https://quiz-application-five-azure.vercel.app", // Your Vercel frontend (if any)
];

app.use(cors({
  origin: function(origin, callback) {
    // Allow requests with no origin (like mobile apps or curl)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1 || process.env.NODE_ENV !== 'production') {
      callback(null, true);
    } else {
      console.log('Blocked origin:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// OR for quick testing (allow all origins - use temporarily):
// app.use(cors({
//   origin: '*',
//   credentials: true,
// }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// DB
connectDB();

// ROUTES
app.use("/api/auth", userRouter);
app.use("/api/results", resultRouter);

app.get("/", (req, res) => {
  res.send("API WORKING");
});

app.listen(PORT, () => {
  console.log(`Server Started on port ${PORT}`);
});