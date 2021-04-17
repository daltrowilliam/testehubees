import { BikeInputDTO } from "./entities/Bike";
import { BikeDatabase } from "../data/BikeDatabase";
import { IdGenerator } from "./services/IdGenerator";
import { CustomError } from "./error/CustomError";

export class BikeBusiness {

   constructor(
      private idGenerator: IdGenerator,
      private bikeDatabase: BikeDatabase,
   ) { }

   async registryBike(bike: BikeInputDTO) {


      if (
         !bike.color ||
         !bike.gears ||
         !bike.brand ||
         !bike.model ||
         !bike.price
     ) {
      throw new CustomError(400, "'color', 'gears', 'brand', 'model' and 'price' must be informed!");
     }

      const id = this.idGenerator.generate();

         await this.bikeDatabase.registryBike(
         id,
         bike.color,
         bike.gears,
         bike.brand,
         bike.model,
         bike.price
      );

      return "Registry Done!";
   }

   async getBikeById(id: string) {


      const bike = await this.bikeDatabase.getBikeById(id);

      if (!bike) {
         throw new CustomError(404, "Bicycle Not Found!");
      }

      return bike;
   }

   async deleteBikeById(id: string) {

      const bike = await this.bikeDatabase.getBikeById(id);

      if (!bike) {
         throw new CustomError(404, "Bicycle Not Found!");
      }

      await this.bikeDatabase.deleteBikeById(id);

   }

   async getAllBikes() {

      const bikes = await this.bikeDatabase.getAllBikes();

      if (!bikes) {
         throw new CustomError(404, "Bicycle Not Found!");
      }

      return bikes;
   }

}