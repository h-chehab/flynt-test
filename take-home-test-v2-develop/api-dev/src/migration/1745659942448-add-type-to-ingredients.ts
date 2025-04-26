import {MigrationInterface, QueryRunner} from "typeorm";
import {query} from "express";

export class addTaToIngredients1745659942448 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE ingredient_enum AS ENUM ('vegetable', 'starch', 'proteins');`);
        await queryRunner.query(`ALTER TABLE "ingredient" ADD COLUMN "type" ingredient_enum NULL;`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ingredient" DROP COLUMN "type";`);
        await queryRunner.query(`DROP TYPE "ingredient_enum";`);
    }
}
