import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class charactersTableCreation1658606424025
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "characters",
        columns: [
          {
            name: "id",
            type: "serial",
            isPrimary: true,
          },
          {
            name: "name",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "status",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "species",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "type",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "gender",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "origin",
            type: "text",
            isNullable: true,
          },
          {
            name: "location",
            type: "text",
            isNullable: true,
          },
          {
            name: "image",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "episode",
            isArray: true,
            type: "varchar",
            isNullable: true,
          },
          {
            name: "url",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "created",
            type: "timestamp",
            isNullable: true,
          },
          {
            name: "userId",
            type: "uuid",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("characters");
  }
}
