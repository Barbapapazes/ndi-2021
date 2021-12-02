import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class LifeguardProfileReward extends BaseSchema {
  protected tableName = 'lifeguard_profile_reward'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.primary(['person_id', 'reward_id'])

      table.integer('person_id').unsigned().references('person_id').inTable('lifeguard_profiles')
      table.integer('reward_id').unsigned().references('id').inTable('rewards')

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
