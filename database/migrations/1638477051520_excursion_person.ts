import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class ExcursionPerson extends BaseSchema {
  protected tableName = 'excursion_person'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.primary(['excursion_id', 'person_id'])

      table.integer('excursion_id').unsigned().references('id').inTable('excursions')
      table.integer('person_id').unsigned().references('id').inTable('persons')
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
