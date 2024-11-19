export const accessPlatform = (req, res, next) => {

    try {
        const client = req.client;

        // Redirect based on user's role or other criteria
        if (client.role === "client") {

            res.redirect("/client-dashboard");

        } else if (client.role === "vendor") {

            res.redirect("/vendor-dashboard");
        } else {
            res.redirect("/login");
        }

    } catch (error) {
        next(error)

    }

};