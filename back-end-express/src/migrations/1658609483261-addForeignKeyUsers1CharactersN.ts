import { MigrationInterface, QueryRunner, TableForeignKey } from "typeorm";

export class addForeignKeyUsers1CharactersN1658609483261
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createForeignKey(
      "characters",
      new TableForeignKey({
        name: "user_characters_FK",
        columnNames: ["userId"],
        referencedColumnNames: ["id"],
        referencedTableName: "users",
        onDelete: "cascade",
        onUpdate: "cascade",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey("characters", "user_characters_FK");
  }
}
