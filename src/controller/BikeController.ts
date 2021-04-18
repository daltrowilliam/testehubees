import { Request, Response } from "express";
import { BikeInputDTO } from "../business/entities/Bike";
import { IdGenerator } from "../business/services/IdGenerator";
import { BikeBusiness } from "../business/BikeBusiness";
import { BikeDatabase } from "../data/BikeDatabase";

const bikeBusiness = new BikeBusiness(
   new IdGenerator(),
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

   async getBikeByColor(req: Request, res: Response) {

      try {

         const color = req.query.color;
       
         const bike = await bikeBusiness.getBikeByColor(color);

         res.status(200).send({ bike });

      } catch (error) {
         res
            .status(error.statusCode || 400)
            .send({ error: error.message });
      }
   }

   async getBikeByPrice(req: Request, res: Response) {

      try {

         const price = req.query.price;
       
         const bike = await bikeBusiness.getBikeByPrice(price);

         res.status(200).send({ bike });

      } catch (error) {
         res
            .status(error.statusCode || 400)
            .send({ error: error.message });
      }
   }

   async alterBikePrice(req: Request, res: Response) {
      try {

         const id = req.params.id;

         const price: number = req.body.price

         const message = await bikeBusiness.alterBikePrice(id, price);

         res.status(200).send({ message });

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

      const message = await bikeBusiness.deleteBikeById(id);

      res.status(200).send({ message });

   } catch (error) {
      res
         .status(error.statusCode || 400)
         .send({ error: error.message });
   }
}

}
