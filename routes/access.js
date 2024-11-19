import { Router } from "express";
import { accessPlatform } from "../controllers/access.js";
import { isAuthenticated } from "../middlewares/auth.js";


const accessRounter = Router();


accessRounter.get("/access/platform", isAuthenticated, accessPlatform)





export default accessRounter;