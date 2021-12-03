import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import TypeBoat from "app/Models/TypeBoat"
export default class TypeBoatSeeder extends BaseSeeder {
  public async run () {
    // Write your database queries inside the run method
    await TypeBoat.createMany([
      {
        name : "Bélandre dunkerquoise"
      },
      {
        name : "BRICK"
      },
      {
        name : "BRICK-GOELETTE"
      },
      {
        name : "CANOT LAMANEUR"
      },
      {
        name : "COTRE"
      },
      {
        name : "DUNDEE"
      },
      {
        name : "Galiote"
      },
      {
        name : "GOELETTE"
      },
      {
        name : "GOELETTE A HUNIER"
      },
      {
        name : "LOUGRE"
      },
      {
        name : "TROIS MATS"
      },
      {
        name : "TROIS MATS BARQUE"
      }
    ])
  }
}
