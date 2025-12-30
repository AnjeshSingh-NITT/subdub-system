import { Router } from "express";
import { getUserById, getUsers } from "../controllers/user.controller.js";
import authorize from "../middlewares/auth.middleware.js";

const userRouter = Router();

userRouter.get('/', getUsers);
userRouter.get('/:id',authorize ,getUserById);

userRouter.post('/', (req, res) => res.send({title: `POST (create) a new user`}));

userRouter.put('/', (req, res) => res.send({title: `PUT (update) a user`}));

userRouter.delete('/:id', (req, res) => res.send({title: `DELETE user with ID ${req.params.id}`}));

export default userRouter;