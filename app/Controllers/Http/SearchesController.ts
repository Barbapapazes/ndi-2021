import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'

export default class SearchesController {
  private LIMIT = 3

  public async index({ request, view }: HttpContextContract) {
    const search = await request.input('search')

    const personPage = request.input('personPage', 1)
    const boatPage = request.input('boatPage', 1)
    const excursionPage = request.input('excursionPage', 1)

    const people = await Database.from('people')
      .where('firstname', 'like', `%${search}%`)
      .paginate(personPage, this.LIMIT)
    const boats = await Database.from('boats')
      .where('boats.name', 'like', `%${search}%`)
      .paginate(boatPage, this.LIMIT)
    const excursions = await Database.from('excursions')
      .where('name', 'like', `%${search}%`)
      .paginate(excursionPage, this.LIMIT)

    return view.render('search.index', { search, people, boats, excursions })
  }
}
