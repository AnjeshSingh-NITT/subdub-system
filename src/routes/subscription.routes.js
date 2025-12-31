import { Router } from "express";
import authorize from "../middlewares/auth.middleware.js";
import { createSubscription, getUserSubscriptions, getSubscriptions, getSubscriptionById, updateSubscription } from "../controllers/subscription.controller.js";

const subscriptionRouter = Router();

subscriptionRouter.get('/', getSubscriptions);

subscriptionRouter.get('/:id', authorize, getSubscriptionById);

subscriptionRouter.post('/', authorize, createSubscription); 

subscriptionRouter.put('/:id', authorize, updateSubscription);

subscriptionRouter.delete('/:id', (req, res) => res.send({title: `DELETE subscription with ID ${req.params.id}`}));

subscriptionRouter.get('/user/me', authorize, getUserSubscriptions);

subscriptionRouter.put('/:id/cancel', (req, res) => res.send({title: `Cancel subscription with ID ${req.params.id}`}));

subscriptionRouter.get('/upcoming-renewals', (req, res) => res.send({title: `GET all subscriptions with upcoming renewals`}));

export default subscriptionRouter;