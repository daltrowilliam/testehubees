import express from "express";
import { BikeController } from "../BikeController";


export const bikeRouter = express.Router();

const bikeController = new BikeController();

bikeRouter.post("/registry", bikeController.registryBike);
bikeRouter.delete("/delete/:id", bikeController.deleteBikeById);
bikeRouter.get("/", bikeController.getAllBikes);
bikeRouter.get("/:id", bikeController.getBikeById);
