import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import clientRouter from "./routes/client.js";
import cartRouter from "./routes/cart.js";
import orderRouter from "./routes/order.js";
import deliveryRouter from "./routes/delivery.js"; 
import manageRouter from "./routes/manage.js";
import catalogueRouter from "./routes/products.js";
import subcrebeRouter from "./routes/subscribe.js";
import accessRounter from "./routes/access.js";





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


app.use(clientRouter,);
app.use(catalogueRouter);
app.use(cartRouter);
app.use(orderRouter);
app.use(manageRouter);
app.use(deliveryRouter);
app.use(subcrebeRouter);
app.use(accessRounter)

// Listen for incoming requests
app.listen(6060, () => {
    console.log("App is listening on port 6060")
});
