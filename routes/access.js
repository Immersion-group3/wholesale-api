import { Router } from "express";
import { accessPlatform } from "../controllers/access.js";


const accessRounter = Router();


accessRounter.get("/access/platform", accessPlatform)





export default accessRounter;