import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class BoatPages extends BaseSchema {
  protected tableName = 'boat_pages'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.integer('boat_id').unsigned().references('id').inTable('boats')
      table.integer('page_id').unsigned().references('id').inTable('pages')

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
