import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateGyms1701587340787 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "gyms",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "name",
            type: "varchar",
          },
          {
            name: "description",
            type: "varchar",
          },
          {
            name: "phone",
            type: "varchar",
          },
          {
            name: "latitude",
            type: "decimal",
            scale: 10,
            precision: 2,
          },
          {
            name: "longitude",
            type: "decimal",
            scale: 10,
            precision: 2,
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
          {
            name: "updated_at",
            type: "timestamp",
            default: "now()",
          },
          {
            name: "active",
            type: "boolean",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("gyms");
  }
}
