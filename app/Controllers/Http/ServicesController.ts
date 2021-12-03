import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Service from 'App/Models/Service'

export default class ServicesController {
  public async index({ view }: HttpContextContract) {
    const services = await Service.all()

    return view.render('services/index', { services })
  }

  public async show({ params, view }: HttpContextContract) {
    const service = await Service.findOrFail(params.id)

    return view.render('services/show', { service })
  }

  public async create({ view }: HttpContextContract) {
    return view.render('services/create')
  }

  public async store({ request, response }: HttpContextContract) {
    const name = request.input('name')

    const service = new Service()

    service.name = name

    await service.save()

    return response.redirect().toRoute('ServicesController.show', { id: service.id })
  }

  public async edit({ params, view }: HttpContextContract) {
    const service = await Service.findOrFail(params.id)

    return view.render('services/edit', { service })
  }

  public async update({ params, request, response }: HttpContextContract) {
    const service = await Service.findOrFail(params.id)

    const name = request.input('name')

    service.name = name

    await service.save()

    return response.redirect().toRoute('ServicesController.show', { id: service.id })
  }
}
