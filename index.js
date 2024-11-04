import express from "express";
import orderRouter from "./routes/vendor.order.js";





// Connect to database




// Create an express app
const app = express();


// Use Middlewares


// Use routes
app.use(orderRouter)


// Listen for incoming requests
app.listen(6060, () => {
    console.log("App is listening on port 6060")
});