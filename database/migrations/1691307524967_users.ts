import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name').notNullable()
      table.string('email').notNullable().unique()
      table.string('hobby').nullable().defaultTo('-|-')
      table.enum('gender', ['pria', 'wanita']).notNullable()

      // uuid
      table.uuid('user_id').notNullable()

      // foreign key
      // table.foreign('data').references('id').onUpdate('CASCADE').onDelete('CASCADE')

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamps()
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
