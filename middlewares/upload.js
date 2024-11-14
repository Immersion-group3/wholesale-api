import multer from "multer";
import { multerSaveFilesOrg } from "multer-savefilesorg";

export const wholesaleIconUpload = multer({
    storage: multerSaveFilesOrg({
        apiAccessToken: process.env.
        SAVEFILESORG_API_KEY,
        relativePath: "/wholesale-api/products/*"
    }),
    preservePath: true
});

export const clientAvatarUpload = multer({
   storage: multerSaveFilesOrg({
    apiAccessToken: process.env.SAVEFILESORG_API_KEY,
        relativePath: "/wholesale-api/clients/*"
   }),
   preservePath: true
});