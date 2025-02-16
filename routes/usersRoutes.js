import express from "express";

const userRouter = express.Router();

import { getUsers, postUsers, putUsers, deleteUsers, loginUsers } from "../controllers/userControllers.js";

userRouter.post("/", postUsers);
userRouter.get("/", getUsers);
userRouter.post("/login", loginUsers);
userRouter.delete("/", deleteUsers);

export default userRouter;