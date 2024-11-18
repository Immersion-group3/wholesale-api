import { Router } from "express";
import { isAuthenticated, hasPermission } from "../middlewares/auth.js";
import { addProductCatalogue, countCatalogProducts, deleteCatalogProductById, filterProducts, getAllCatalogProducts, getCatalogProductById, paginateProducts, updateCatalogProductById, addDeliveryDateToProducts, getProductDeliveryDates } from "../controllers/products.js";
import { wholesaleIconUpload } from "../middlewares/upload.js";

// create a router 

const catalogueRouter = Router();

//define routes

catalogueRouter.post("/products", wholesaleIconUpload.single("icon"), addProductCatalogue);

catalogueRouter.get("/products", getAllCatalogProducts);

catalogueRouter.get("/products/:id", getCatalogProductById);

catalogueRouter.get("/products/count", countCatalogProducts)

catalogueRouter.patch("/products/:id", wholesaleIconUpload.single("icon"), updateCatalogProductById)

catalogueRouter.delete("/products/:id", deleteCatalogProductById);

catalogueRouter.get('/products/filter', filterProducts);

catalogueRouter.get('/products/paginate', paginateProducts);

catalogueRouter.post('/add-delivery-date', addDeliveryDateToProducts);

catalogueRouter.get("/products/delivery-dates/:id", getProductDeliveryDates);



// productRouter.get("/products/count", countProducts);

// export router
export default catalogueRouter;
