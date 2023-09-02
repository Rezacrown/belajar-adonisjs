import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "books";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id");
      table.string("title").notNullable();
      table.string("tahun_terbit").notNullable();
      table.text("deskripsi");

      // foregin
      // table.foreign('id', 'books_to_categories').references('id').inTable('categories').onUpdate('cascade').onDelete('cascade')

      table
        .integer("category_id")
        .unsigned()
        .references("id")
        .inTable("categories");

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      // table.timestamp('created_at', { useTz: true })
      // table.timestamp('updated_at', { useTz: true })
      table.timestamps();
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
