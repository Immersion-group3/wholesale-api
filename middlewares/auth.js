import { expressjwt } from "express-jwt";
import { VendorModel } from "../models/vendors.js";
import { permissions } from "../utils/rbac.js";


export const isAuthenticated = expressjwt({
    secret: process.env.JWT_PRIVATE_KEY,
    algorithms: ["HS256"]
});

export const hasPermission = (action) => {
    return async (req, res, next) => {
        try {
            //  find vendor from database
            const vendor = await VendorModel.findById(req.auth.id);
            if (!vendor) {
                res.status(404).json("No vendor found")
            }
            // use the vendor role to find their permission
        }
    }

}