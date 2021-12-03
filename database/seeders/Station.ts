import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Station from 'App/Models/Station'
export default class StationSeeder extends BaseSeeder {
  public async run () {
    // Write your database queries inside the run method
    await Station.createMany([
      {
        name : "Station de Dunkerque",
        location : "Dunkerque"
      },
      {
        name : "Station de GRAVELINES",
        location : "GRAVELINES"
      },
      {
        name : "Station de Fort-Mardyck",
        location : "Fort-Mardyck"
      },
      {
        name : "Station de Malo-les-Bains",
        location : "Malo-les-Bains"
      },
      {
        name : "Station de Bray-Dunes",
        location : "Bray-Dunes"
      }
    ])
  }
}
