import express from "express";
import { createCategories  } from "../controllers/categoryController.js";

const categoryRouter = express.Router();

categoryRouter.post("/", createCategories);


export default categoryRouter;