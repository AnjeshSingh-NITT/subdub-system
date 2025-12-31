import Subscription from "../models/subscription.model.js";

export const createSubscription = async (req,res,next) => {
    try {
        const subscription = await Subscription.create({
            ...req.body,
            user: req.user._id,
        });

        res.status(201).json({success: true, data: subscription});
    } catch (error) {
        next(error);
    }
}

export const getUserSubscriptions = async (req, res, next) => {
    try {
        const subscriptions = await Subscription.find({ user: req.user._id });
        res.status(200).json({ success: true, count: subscriptions.length, data: subscriptions });
    } catch (error) {
        next(error);
    }
}

export const getSubscriptions = async (req, res, next) => {
    try {
        const subscriptions = await Subscription.find()
            .populate("user", "name email"); // optional, but useful

        res.status(200).json({
            success: true,
            count: subscriptions.length,
            data: subscriptions
        });
    } catch (error) {
        next(error);
    }
}

export const getSubscriptionById = async (req, res, next) => {
    try {
        //check if id passed in token is the owner of the subscription
        if (!req.user) {
            return res.status(401).json({ success: false, message: "Unauthorized" });
        }

        const subscription = await Subscription.findById(req.params.id)
            .populate("user", "name email");

        if (!subscription) {
            return res.status(404).json({ success: false, message: "Subscription not found" });
        }

        if (subscription.user._id.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                success: false,
                message: "You are not allowed to access this resource"
            });
        }

        res.status(200).json({ success: true, data: subscription });
    } catch (error) {
        next(error);
    }
}

export const updateSubscription = async (req, res, next) => {
    try {
        const subscription = await Subscription.findById(req.params.id);

        if (!subscription) {
            return res.status(404).json({ success: false, message: "Subscription not found" });
        }

        // Ownership check FIRST
        if (subscription.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                success: false,
                message: "Unauthorized"
            });
        }

        Object.assign(subscription, req.body);
        await subscription.save();

        res.status(200).json({
            success: true,
            data: subscription
        });
    } catch (error) {
        next(error);
    }
};

export const deleteSubscription = async (req, res, next) => {
    try {
        const subscription = await Subscription.findById(req.params.id);

        if (!subscription) {
            return res.status(404).json({ success: false, message: "Subscription not found" });
        }

        // Ownership check FIRST
        if (subscription.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                success: false,
                message: "Unauthorized!! You cannot delete this subscription"
            });
        }

        await subscription.deleteOne();

        res.status(200).json({
            success: true,
            message: "Subscription deleted successfully"
        });
    } catch (error) {
        next(error);
    }
};

export const cancelSubscription = async (req, res, next) => {
    try {
        const subscription = await Subscription.findById(req.params.id);

        if (!subscription) {
            return res.status(404).json({ success: false, message: "Subscription not found" });
        }

        // Ownership check FIRST
        if (subscription.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                success: false,
                message: "Unauthorized!! You cannot cancel this subscription"
            });
        }

        if (subscription.status === 'canceled') {
            return res.status(400).json({
                success: false,
                message: "Subscription already canceled"
            });
        }

        subscription.status = 'canceled';
        await subscription.save();

        res.status(200).json({
            success: true,
            message: "Subscription canceled successfully",
            data: subscription
        });
    } catch (error) {
        next(error);
    }
};

export const getUpcomingRenewals = async (req, res, next) => {
    try {
        const now = new Date();
        const nextWeek = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);

        const upcomingRenewals = await Subscription.find({
            user: req.user._id,
            renewalDate: { $gte: now, $lte: nextWeek },
            status: 'active'
        });

        res.status(200).json({
            success: true,
            count: upcomingRenewals.length,
            data: upcomingRenewals
        });
    } catch (error) {
        next(error);
    }
};
