import { Router } from "express";

const subscriptionRouter = Router();

subscriptionRouter.get('/', (req, res) => res.send({title: `GET all subscriptions`}));
subscriptionRouter.get('/:id', (req, res) => res.send({title: `GET subscription with ID ${req.params.id}`}));

subscriptionRouter.post('/', (req, res) => res.send({title: `POST (create) a new subscription`}));

subscriptionRouter.put('/', (req, res) => res.send({title: `PUT (update) a subscription`}));

subscriptionRouter.delete('/:id', (req, res) => res.send({title: `DELETE subscription with ID ${req.params.id}`}));

subscriptionRouter.get('/user/:id', (req, res) => res.send({title: `GET all subscriptions for user with ID ${req.params.id}`}));

subscriptionRouter.put('/:id/cancel', (req, res) => res.send({title: `Cancel subscription with ID ${req.params.id}`}));

subscriptionRouter.get('/upcoming-renewals', (req, res) => res.send({title: `GET all subscriptions with upcoming renewals`}));

export default subscriptionRouter;