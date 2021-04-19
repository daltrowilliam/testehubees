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

     if(isNaN(Number(bike.gears))){
      throw new CustomError(400, "Gears must be a valid number");
     }

     if(isNaN(Number(bike.price))){
      throw new CustomError(400, "Price must be a valid number");
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

   
   async alterBikePrice(id: string, price: any) {

      
      await this.bikeDatabase.getBikeById(id);
       
      if (!price) {
         throw new CustomError(400, "'Price' must be informed!");
     }

     if(isNaN(Number(price))){
      throw new CustomError(400, "Price must be a valid number");
     }

      await this.bikeDatabase.alterBikePrice(
         id,
         price
      );

      return "Bicycle price updated!";
   }


   async deleteBikeById(id: string) {

      await this.bikeDatabase.getBikeById(id);

      await this.bikeDatabase.deleteBikeById(id);

      return "Bicycle deleted!"

   }

   async getBikeByColor(color: any) {


      const bike: any = await this.bikeDatabase.getBikeByColor(color);
   
      if (bike.length === 0) {
         throw new CustomError(404, "Bicycle Not Found!");
      }

      return bike;
   }

   async getBikeByPrice(price: any) {

      if(isNaN(Number(price))){
         throw new CustomError(400, "Price must be a valid number");
      }

      const bike: any = await this.bikeDatabase.getBikeByPrice(price);
   
      if (bike.length === 0) {
         throw new CustomError(404, "Bicycle Not Found!");
      }

      return bike;
   }
   

   async getAllBikes() {

      const bikes = await this.bikeDatabase.getAllBikes();

      if (!bikes) {
         throw new CustomError(404, "Bicycle Not Found!");
      }

      return bikes;
   }

}