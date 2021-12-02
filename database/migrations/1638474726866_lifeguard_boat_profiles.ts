import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class LifeguardBoatProfiles extends BaseSchema {
  protected tableName = 'lifeguard_boat_profiles'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('boat_id')
      table.timestamp('start_date', { useTz: true }).notNullable()
      table.timestamp('end_date', { useTz: true }).nullable()

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
