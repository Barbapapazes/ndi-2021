import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'

export default class UserSeeder extends BaseSeeder {
  public async run() {
    await User.updateOrCreateMany('email', [
      {
        email: 'root@root.fr',
        password: 'root',
        isAdmin: true,
      },
    ])
  }
}
