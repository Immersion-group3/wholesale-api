import { Router } from "express";
import {
  assignDeliveryPerson,
  updateDeliveryStatus,
  trackDelivery,
  completeDelivery,
  addDeliveryPerson,
} from "../controllers/delivery.js";


const deliveryRouter = Router ();

deliveryRouter.post("/deliveryPerson", addDeliveryPerson);

deliveryRouter.post("/delivery/assign", assignDeliveryPerson);

deliveryRouter.patch("/delivery/:deliveryId", updateDeliveryStatus);

deliveryRouter.get("/delivery/:deliveryId", trackDelivery);

deliveryRouter.post("/delivery/:deliveryId/complete", completeDelivery);

export default deliveryRouter;