import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
export enum IngredientType {
  STARCH = "starch",
  PROTEINS = "proteins",
  VEGETABLE = "vegetable",
}

@Entity()
export class Ingredient {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  price: number;

  @Column({
    type: "enum",
    enum: IngredientType
  })
  type: IngredientType;
}
