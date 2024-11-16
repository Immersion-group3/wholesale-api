import { SubscribeModel } from "../models/subcribe.js";
import { mailTransport } from "../utils/mail.js";

export const addSubcribe = async (req, res, next) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(404).json("Email is required");
        }
        await SubscribeModel.create({email});

        // Send comfirmation email
        await mailTransport.sendMail({
            to: email,
            subject: "Subscription Confirmation!",
            text: "Hello,\n\nThank you for subscribing to our newsletter. We're excited to have you with us!.\n\nBest regards,\nYour Company Team"
        })
        res.status(201).json("Thank you for subscribing!");
    } catch (error) {
        next(error);
    }

} 