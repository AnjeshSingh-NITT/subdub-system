import { Router } from "express";

const userRouter = Router();

userRouter.get('/', (req, res) => res.send({title: `GET all users`}));
userRouter.get('/:id', (req, res) => res.send({title: `GET user with ID ${req.params.id}`}));

userRouter.post('/', (req, res) => res.send({title: `POST (create) a new user`}));

userRouter.put('/', (req, res) => res.send({title: `PUT (update) a user`}));

userRouter.delete('/:id', (req, res) => res.send({title: `DELETE user with ID ${req.params.id}`}));

export default userRouter;