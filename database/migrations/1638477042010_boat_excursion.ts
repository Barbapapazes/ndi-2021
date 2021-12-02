import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class BoatExcursion extends BaseSchema {
  protected tableName = 'boat_excursion'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.primary(['boat_id', 'excursion_id'])

      table.integer('boat_id').unsigned().references('id').inTable('boats')
      table.integer('excursion_id').unsigned().references('id').inTable('excursions')

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
