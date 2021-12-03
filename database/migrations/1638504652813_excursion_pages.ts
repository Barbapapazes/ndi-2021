import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class ExcursionPages extends BaseSchema {
  protected tableName = 'excursion_pages'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.primary(['excursion_id', 'page_id'])

      table.integer('excursion_id').unsigned().references('id').inTable('boats')
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
