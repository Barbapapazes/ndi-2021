import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Boats extends BaseSchema {
  protected tableName = 'boats'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name').notNullable()
      table.integer('station_id').unsigned().references('id').inTable('stations')
      table.integer('boat_type_id').unsigned().references('id').inTable('type_boats')

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
