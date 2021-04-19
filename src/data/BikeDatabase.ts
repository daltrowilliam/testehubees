import { BaseDatabase } from "./BaseDatabase";
import { Bike } from "../business/entities/Bike";
import { CustomError } from "../business/error/CustomError";

export class BikeDatabase extends BaseDatabase {

   private static TABLE_NAME = "hubees_bikes";

   private static toBikeModel(bike: any): Bike {
      return new Bike(
         bike.id,
         bike.color,
         bike.gears,
         bike.brand,
         bike.model,
         bike.price
      );
   }


   public async registryBike(
      id: string,
      color: string,
      gears: number,
      brand: string,
      model: string,
      price: number
   ): Promise<void> {
      try {
         await BaseDatabase.connection
            .insert({
               id,
               color,
               gears,
               brand,
               model,
               price
            })
            .into(BikeDatabase.TABLE_NAME);
      } catch (error) {
         throw new CustomError(500, "An unexpected error ocurred");
      }
   }

   public async alterBikePrice(
      id: string,
      price: number,
   ): Promise<void> {
      try {
         const result = await BaseDatabase.connection.raw(`
            UPDATE ${BikeDatabase.TABLE_NAME}
            SET price = '${price}'
            WHERE id = '${id}';
         `)
      } catch (error) {
         throw new CustomError(500, "An unexpected error ocurred");
      }
   }

   public async getBikeById(id: string): Promise<Bike> {
      try {
         const result = await BaseDatabase.connection.raw(`
            SELECT * FROM ${BikeDatabase.TABLE_NAME}
            WHERE id = '${id}';
         `)

         return BikeDatabase.toBikeModel(result[0][0]);

      } catch (error) {
         throw new CustomError(500, "An unexpected error ocurred");
      }
   }

   public async getAllBikes(): Promise<Bike> {
      try {
         
         const result = await BaseDatabase.connection.raw(`
            SELECT * FROM ${BikeDatabase.TABLE_NAME};
         `)

         return result[0];

      } catch (error) {
         throw new CustomError(500, "An unexpected error ocurred");
      }
   }

   public async getBikeByColor(color: string): Promise<Bike> {
      try {
         const result = await BaseDatabase.connection.raw(`
            SELECT * FROM ${BikeDatabase.TABLE_NAME}
            WHERE color LIKE '%${color}%';
         `)

         return result[0];

      } catch (error) {
         throw new CustomError(500, "An unexpected error ocurred");
      }
   }

   public async getBikeByPrice(price: string): Promise<Bike> {
      try {
         const result = await BaseDatabase.connection.raw(`
            SELECT * FROM ${BikeDatabase.TABLE_NAME}
            WHERE price <= ${price};
         `)

         return result[0];

      } catch (error) {
         throw new CustomError(500, "An unexpected error ocurred");
      }
   }

   public async deleteBikeById(id: string): Promise<any> {
      try {
         await BaseDatabase.connection.raw(`
            DELETE FROM ${BikeDatabase.TABLE_NAME}
            WHERE id = '${id}';
         `)

      } catch (error) {
         throw new CustomError(500, "An unexpected error ocurred");
      }
   }
}