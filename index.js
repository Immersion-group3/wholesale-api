import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import clientRouter from "./routes/client.js";






// Connect to database
await mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("Database connected successfully"))
    .catch((error) => console.log("Error connecting to database", error));




// Create an express app
const app = express();


// Use Middlewares
app.use(express.json());
app.use(cors());


// Use routes
app.use(clientRouter)



// Listen for incoming requests
app.listen(6060, () => {
    console.log("App is listening on port 6060")
});