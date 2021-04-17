export class Bike {
    constructor(
       public readonly id: string,
       public readonly color: string,
       public readonly gears: number,
       public readonly brand: string,
       public readonly model: string,
       public readonly price: number,
    ) { }
 
 }
 
 export interface BikeInputDTO {
   color: string;
   gears: number;
   brand: string;
   model: string;
   price: number
 }


