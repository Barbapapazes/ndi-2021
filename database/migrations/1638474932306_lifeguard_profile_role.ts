import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class LifeguardProfileRole extends BaseSchema {
  protected tableName = 'lifeguard_profile_role'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.primary(['person_id', 'role_id'])

      table.integer('person_id').unsigned().references('person_id').inTable('lifeguard_profiles')
      table.integer('role_id').unsigned().references('id').inTable('roles')
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
