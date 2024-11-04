import { expressjwt } from "express-jwt";
import { ClientModel } from "../models/client.js";
import { permissions } from "../utils/rbac.js"


export const isAuthenticated = expressjwt({
    secret: process.env.JWT_PRIVATE_KEY,
    algorithms: ["HS256"]
});

export const hasPermission = (action) => {
    return async (req, res, next) => {
        try {
            //  find client from database
            const client = await ClientModel.findById(req.auth.id);
            if (!client) {
                res.status(404).json("No client found")
            }
            // use the client role to find their permission
            const permission = permissions.find(value => value.role === client.role);
            if (!permission) {
                return res.status(403).json("No permission found");
            }
            // Check if permission actions include action
            if (permission.actions.includes(action)) {
                next();
            } else {
                res.status(403).json("Action not allowed");
            }
        } catch (error) {
            next(error);
        }

    }

}
