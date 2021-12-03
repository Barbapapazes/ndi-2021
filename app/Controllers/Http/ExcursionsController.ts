import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Boat from 'App/Models/Boat'
import Excursion from 'App/Models/Excursion'
import Person from 'App/Models/Person'

export default class ExcursionsController {
  public async index({ view }: HttpContextContract) {
    const excursions = await Excursion.all()

    return view.render('excursions.index', { excursions })
  }

  public async show({ params, view }: HttpContextContract) {
    const excursion = await Excursion.findOrFail(params.id)

    return view.render('excursions.show', { excursion })
  }

  public async create({ view }: HttpContextContract) {
    const boats = await Boat.all()
    const people = await Person.all()

    return view.render('boats/create', { people, boats })
  }

  public async store({ request, response }: HttpContextContract) {
    const name = request.input('name')
    const location = request.input('location')
    const date = request.input('date')
    const boats = request.input('boats')
    const people = request.input('people')

    const excursion = new Excursion()

    excursion.name = name
    excursion.location = location
    excursion.date = date

    await excursion.save()

    await excursion.related('boats').attach(boats)
    await excursion.related('savedPersons').attach(people)

    return response.redirect().toRoute('ExcursionsController.show', { id: excursion.id })
  }
}
