import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Role from 'App/Models/Role'

export default class RoleSeeder extends BaseSeeder {
  public async run() {
    // Write your database queries inside the run method
    await Role.updateOrCreateMany('name', [
      {
        name: 'Capitaine',
      },
      {
        name: 'Lamaneur',
      },
      {
        name: 'Matelots',
      },
      {
        name: 'Mousse',
      },
      {
        name: 'Officier artillerie',
      },
      {
        name: 'Commissaire de la marine',
      },
      {
        name: 'Marin',
      },
      {
        name: 'Pilote',
      },
    ])
  }
}
