import { Router } from "express";
import {
  assignDeliveryPerson,
  updateDeliveryStatus,
  trackDelivery,
  completeDelivery,
} from "../controllers/delivery.js";


const deliveryRouter = Router ();

deliveryRouter.post("/delivery/assign", assignDeliveryPerson);

deliveryRouter.patch("/delivery/:deliveryId/status", updateDeliveryStatus);

deliveryRouter.get("/delivery/:deliveryId/track", trackDelivery);

deliveryRouter.post("/deliveries/:deliveryId/complete", completeDelivery);

export default deliveryRouter;