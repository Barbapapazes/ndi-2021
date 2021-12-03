import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class PersonPages extends BaseSchema {
  protected tableName = 'person_pages'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.primary(['person_id', 'page_id'])

      table.integer('person_id').unsigned().references('id').inTable('people')
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
