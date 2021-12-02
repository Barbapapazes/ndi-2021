import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Boat from 'App/Models/Boat'
import Station from 'App/Models/Station'
import TypeBoat from 'App/Models/TypeBoat'

export default class BoatsController {
  public async index({ view }: HttpContextContract) {
    const boats = await Boat.query().preload('station')

    return view.render('boats/index', { boats })
  }

  public async show({ params, view }: HttpContextContract) {
    const boat = await Boat.query().preload('station').where('id', params.id).firstOrFail()

    return view.render('boats/show', { boat })
  }

  public async create({ view }: HttpContextContract) {
    const stations = await Station.all()
    console.log(stations)
    const typeBoats = await TypeBoat.all()

    return view.render('boats/create', { stations, typeBoats })
  }

  public async store({ request, response }: HttpContextContract) {
    const name = request.input('name')
    const typeBoatId = request.input('typeBoatId')
    const stationId = request.input('stationId')

    const boat = new Boat()

    boat.name = name
    boat.typeBoatId = typeBoatId
    boat.stationId = stationId

    await boat.save()

    response.redirect().toRoute('BoatsController.show', { id: boat.id })
  }

  public async edit({ params, view }: HttpContextContract) {
    const boat = await Boat.query().where('id', params.id).firstOrFail()
    const stations = await Station.all()
    const typeBoats = await TypeBoat.all()

    return view.render('boats/edit', { boat, stations, typeBoats })
  }

  public async update({ params, request, response }: HttpContextContract) {
    const boat = await Boat.query().where('id', params.id).firstOrFail()

    const name = request.input('name')
    const typeBoatId = request.input('typeBoatId')
    const stationId = request.input('stationId')

    boat.name = name
    boat.typeBoatId = typeBoatId
    boat.stationId = stationId

    await boat.save()

    response.redirect().toRoute('BoatsController.show', { id: boat.id })
  }
}
