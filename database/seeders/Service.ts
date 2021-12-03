import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Service from "app/Models/Service"
export default class ServiceSeeder extends BaseSeeder {
  public async run () {
    // Write your database queries inside the run method
    await Service.createMany([
      {
        name : "Garde des quais"
      },
      {
        name : "Garde des tentes"
      },
      {
        name : "Lamanage"
      },
      {
        name : "Phare"
      },
      {
        name : "balise"
      },
      {
        name : "remorquage"
      }
    ])
  }
}
