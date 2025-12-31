import { Router } from "express";
import { getMe, getUserById, getUsers, updateMe } from "../controllers/user.controller.js";
import authorize from "../middlewares/auth.middleware.js";

const userRouter = Router();

userRouter.get('/', getUsers);

// userRouter.get('/:id',authorize ,getUserById);
// the above is not recommended, i have written the controller for it but below is the better way

userRouter.get('/me', authorize, getMe);

userRouter.put('/me', authorize, updateMe);

// TODO:
userRouter.delete('/:id', (req, res) => res.send({title: `DELETE user with ID ${req.params.id}`}));

export default userRouter;