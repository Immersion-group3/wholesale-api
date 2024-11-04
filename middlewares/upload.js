import multer from "multer"
import { multerSaveFilesOrg } from "multer-savefilesorg";

export const catalogueImageUpload = multer({
    storage: multerSaveFilesOrg({
        apiAcessToken: process.env.SAVEFILESORG_API_KEY,
    relativePath: '/product-api/catalogue/*'
}),
    preservePath: true,
});