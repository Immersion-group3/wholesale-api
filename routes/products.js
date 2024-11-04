import { Router } from "express";
import { addProductCatalogue, getAllCatalogProducts, getCatalogProductById,updateCatalogProductById,deleteCatalogProductById,filterProducts,paginateProducts } from "../controllers/products";
import { catalogueImageUpload } from "../middlewares/upload.js";

// create a router 

const catalogueRouter = Router ();

//define routes

catalogueRouter.post('/products', catalogueImageUpload.single("image"), addProductCatalogue);

catalogueRouter.get('/products', getAllCatalogProducts);

catalogueRouter.get('/products/:id', getCatalogProductById);

catalogueRouter.patch('/products/:id', updateCatalogProductById);

catalogueRouter.delete('/products/:id', deleteCatalogProductById);

catalogueRouter.get('/products/filter', filterProducts);

catalogueRouter.get('/products/paginate', paginateProducts);

catalogueRouter.get('/products/search', searchProducts);

// export router
export default catalogueRouter;
