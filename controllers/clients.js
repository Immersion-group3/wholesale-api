import { signupClientValidator, signinClientValidator, updateProfileValidator } from "../validators/client.js";
import { ClientModel } from "../models/client.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { mailTransport } from "../utils/mail.js";
import crypto from "crypto";

export const signupClient = async (req, res, next) => {
    try {
        // Validate user input
        const { error, value } = signupClientValidator.validate(req.body);
        if (error) {
            return res.status(422).json(error);
        }
        // Check if client does not exist
        const client = await ClientModel.findOne({ email: value.email });
        if (client) {
            return res.status(409).json("Client already exists!");
        }
        // Hash their password
        const hashedPassword = bcrypt.hashSync(value.password, 10);
        // Save cliet into database
        await ClientModel.create({
            ...value,
            password: hashedPassword
        });
        // Send comfirmation email
        await mailTransport.sendMail({
            to: value.email,
            subject: "Welcome to Our Service!",
            text: "Hello ${value.email},\n\nThank you for signing up! We're excited to have you on board.\n\nBest regards,\nYour Company Team"
        })
        // Reponse to request
        res.json("Signed up successfully!");
    } catch (error) {
        next(error);
    }
}

export const signinClient = async (req, res, next) => {
    try {
        // Validate user input
        const { error, value } = signinClientValidator.validate(req.body);
        if (error) {
            return res.status(422).json(error);
        }
        // Find one user with identifier
        const client = await ClientModel.findOne({ email: value.email });
        if (!client) {
            return res.status(404).json("Client does not exist!");
        }
        // Compare their passwords
        const correctPassword = bcrypt.compareSync(value.password, client.password);
        if (!correctPassword) {
            return res.status(401).json
                ("Invalid credentials!");
        }
        // sign a token for user
        const token = jwt.sign(
            { id: client.id }, process.env.JWT_PRIVATE_KEY, { expiresIn: "12h" }
        );
        // respond to resquest
        res.json({ message: "Sign in Successfully!", accessToken: token })

    } catch (error) {
        next(error);
    }

}

export const forgotPassword = async (req, res, next) => {
    try {
        // Validate user input
        // const { error, value } = signupClientValidator.validate(req.body);
        // if (error) {
        //     return res.status(422).json(error);
        // }
        // Find one user with identifier
        const { email } = req.body;
        const client = await ClientModel.findOne({ email });
        if (!client) return res.status(404).json("User not found")


        const resetToken = crypto.randomBytes(32).toString("hex");
        client.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
        client.resetPasswordExpire = Date.now() + 10 * 60 * 1000
        await client.save();

        const resetUrl = "http://localhost:5173/resetpassword";

        await mailTransport.sendMail({
            to: req.body.email,
            subject: "Password Reset Request",
            text: `Please reset your password using the link: ${resetUrl}`
        })
        return res.status(200).json("Password reset link sent successfully");
    } catch (error) {
        next(error)

    }
};

export const resetPassword = async (req, res) => {
    try {

        const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex');
        const client = await ClientModel.findOne({
            resetPasswordToken,
            resetPasswordExpire: { $gt: Date.now() }
        });
        if (!client) return res.status(400).json("Invalid or expired token");

        client.password = req.body.password;
        client.resetPasswordToken = undefined;
        client.resetPasswordExpire = undefined;
        await client.save();
        return res.status(200).json("Password reset successful");

    } catch (error) {
        next(error)

    }
}

export const getProfile = async (req, res, next) => {
    try {
        // Find authenticated user from database
        const client = await ClientModel
            .findById(req.auth.id)
            .select({ password: false });
        // Response request
        res.json(client);
    } catch (error) {
        next(error);

    }
}

export const updateProfile = async (req, res, next) => {
    try {
        // validate user input
        const { error, value } = updateProfileValidator.validate({
            ...req.body,
            // avatar: req.file?.filename
        });
        if (error) {
            return res.status(422).json(error);
        }
        // update user
        await ClientModel.findByIdAndUpdate(req.auth.id, value);
        // respond to request
        res.json("Client profile updated");
    } catch (error) {
        next(error);
    }
}
