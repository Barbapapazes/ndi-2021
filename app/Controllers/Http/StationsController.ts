import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Station from 'App/Models/Station'

export default class StationsController {
  public async index({ view }: HttpContextContract) {
    const stations = await Station.all()

    return view.render('stations/index', { stations })
  }

  public async show({ params, view }: HttpContextContract) {
    const station = await Station.findOrFail(params.id)

    return view.render('stations/show', { station })
  }

  public async create({ view }: HttpContextContract) {
    return view.render('stations/create')
  }

  public async store({ request, response }: HttpContextContract) {
    const name = request.input('name')
    const location = request.input('location')

    const station = new Station()

    station.name = name
    station.location = location

    await station.save()

    return response.redirect().toRoute('StationsController.show', { id: station.id })
  }

  public async edit({ params, view }: HttpContextContract) {
    const station = await Station.findOrFail(params.id)

    return view.render('stations/edit', { station })
  }

  public async update({ params, request, response }: HttpContextContract) {
    const station = await Station.findOrFail(params.id)

    const name = request.input('name')
    const location = request.input('location')

    station.name = name
    station.location = location

    await station.save()

    return response.redirect().toRoute('StationsController.show', { id: station.id })
  }
}
