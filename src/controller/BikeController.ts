import { Request, Response } from "express";
import { BikeInputDTO } from "../business/entities/Bike";
import { Authenticator } from "../business/services/Authenticator";
import { HashManager } from "../business/services/HashManager";
import { IdGenerator } from "../business/services/IdGenerator";
import { BikeBusiness } from "../business/BikeBusiness";
import { BikeDatabase } from "../data/BikeDatabase";

const bikeBusiness = new BikeBusiness(
   new IdGenerator(),
   new HashManager,
   new Authenticator(),
   new BikeDatabase()
);

export class BikeController {
   async registryBike(req: Request, res: Response) {
      try {

         const input: BikeInputDTO = {
            color: req.body.color,
            gears: req.body.gears,
            brand: req.body.brand,
            model: req.body.model,
            price: req.body.price
         }

         const registry = await bikeBusiness.registryBike(input);

         res.status(200).send({ registry });

      } catch (error) {
         res
            .status(error.statusCode || 400)
            .send({ error: error.message });
      }
   }



   async getBikeById(req: Request, res: Response) {

      try {

         const id = req.params.id;

         const bike = await bikeBusiness.getBikeById(id);

         res.status(200).send({ bike });

      } catch (error) {
         res
            .status(error.statusCode || 400)
            .send({ error: error.message });
      }
   }



async getAllBikes(req: Request, res: Response) {

   try {

      const bikes = await bikeBusiness.getAllBikes();

      res.status(200).send({ bikes });

   } catch (error) {
      res
         .status(error.statusCode || 400)
         .send({ error: error.message });
   }
}

async deleteBikeById(req: Request, res: Response) {

   
   try {

      const id = req.params.id;

      await bikeBusiness.deleteBikeById(id);

      res.status(200).send("bicycle deleted!");

   } catch (error) {
      res
         .status(error.statusCode || 400)
         .send({ error: error.message });
   }
}

}
