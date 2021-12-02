import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class StationService extends BaseSchema {
  protected tableName = 'station_service'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.primary(['station_id', 'service_id'])
      table.integer('station_id').unsigned().notNullable().references('id').inTable('stations')
      table.integer('service_id').unsigned().notNullable().references('id').inTable('services')

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
