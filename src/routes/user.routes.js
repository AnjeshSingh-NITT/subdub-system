import { Router } from "express";
import { deleteMe, getMe, getUserById, getUsers, updateMe } from "../controllers/user.controller.js";
import authorize from "../middlewares/auth.middleware.js";

const userRouter = Router();

userRouter.get('/', getUsers);

// userRouter.get('/:id',authorize ,getUserById);
// the above is not recommended, i have written the controller for it but below is the better way

userRouter.get('/me', authorize, getMe);

userRouter.put('/me', authorize, updateMe);

userRouter.delete('/me', authorize, deleteMe);

export default userRouter;