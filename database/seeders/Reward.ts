import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Reward from 'App/Models/Reward'
export default class RewardSeeder extends BaseSeeder {
  public async run() {
    // Write your database queries inside the run method
    await Reward.updateOrCreateMany('name', [
      {
        name: 'titre du sauvetage',
      },
      {
        name: 'Légion d’Honneur',
      },
      {
        name: 'Prix de Vertu',
      },
      {
        name: 'Prix Henri Durand',
      },
      {
        name: 'Médaille pour Actes de Courage et Dévouement Ministère de la Marine',
      },
      {
        name: 'Médaille pour Actes de Courage et Dévouement de l’Intérieur',
      },
    ])
  }
}
