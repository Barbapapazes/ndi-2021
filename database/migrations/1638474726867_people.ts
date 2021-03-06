import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class People extends BaseSchema {
  protected tableName = 'people'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('firstname').notNullable()
      table.string('lastname').nullable()
      table.string('gender').nullable()
      table.timestamp('birth', { useTz: true }).nullable()
      table.timestamp('death', { useTz: true }).nullable()
      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
