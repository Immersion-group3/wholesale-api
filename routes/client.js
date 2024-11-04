import { Router } from "express";
import { forgotPassword, getProfile, resetPassword, signinClient, signupClient, updateProfile } from "../controllers/clients.js";
import { hasPermission, isAuthenticated } from "../middlewares/auth.js";


// Create a router
const clientRouter = Router();

// Define routes

clientRouter.post("/clients/signup", signupClient);

clientRouter.post("/clients/signin",
    signinClient
);

clientRouter.post("/clients/forgot-password", forgotPassword);

clientRouter.patch("/clients/reset-password/:token", resetPassword)

clientRouter.get("/clients/me/", isAuthenticated, hasPermission("get_profile"), getProfile)

// clientRouter.post("/client/logout", logoutClient);

clientRouter.patch("/clients/me", updateProfile);

// export Router
export default clientRouter;



