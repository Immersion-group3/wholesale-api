import { Router } from "express";
import {
  assignDeliveryPerson,
  updateDeliveryStatus,
  trackDelivery,
} from "../controllers/delivery.js";


const deliveryRouter = Router ();

deliveryRouter.post("/delivery/assign", assignDeliveryPerson);


deliveryRouter.patch("/delivery/assign", updateDeliveryStatus);


deliveryRouter.get("/delivery/assign", trackDelivery);

