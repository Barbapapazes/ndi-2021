import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class BoatPerson extends BaseSchema {
  protected tableName = 'boat_person'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.primary(['boat_id', 'person_id'])
      table.integer('boat_id').unsigned().references('id').inTable('boats').notNullable()
      table.integer('person_id').unsigned().references('id').inTable('persons').notNullable()

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
