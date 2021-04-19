import express from "express";
import { BikeController } from "../BikeController";


export const bikeRouter = express.Router();

const bikeController = new BikeController();

bikeRouter.post("/registry", bikeController.registryBike);
bikeRouter.put("/alter/:id", bikeController.alterBikePrice);
bikeRouter.delete("/delete/:id", bikeController.deleteBikeById);
bikeRouter.get("/", bikeController.getAllBikes);
bikeRouter.get("/bycolor?", bikeController.getBikeByColor);
bikeRouter.get("/byprice?", bikeController.getBikeByPrice);
