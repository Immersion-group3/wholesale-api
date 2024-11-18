import { Router } from "express";
import { addSubcribe } from "../controllers/subscribe.js";


const subcrebeRouter = Router();

subcrebeRouter.post("/subscribe/add", addSubcribe)


export default subcrebeRouter;