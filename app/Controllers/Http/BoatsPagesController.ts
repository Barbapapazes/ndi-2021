import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Page from 'App/Models/Page'
import Boat from 'App/Models/Boat'

export default class BoatsPagesController {
  public async index({ params, view }: HttpContextContract) {
    const boatId = params.boat_id

    const boat = await Boat.findOrFail(boatId)

    const pages = await boat.related('pages').query().wherePivot('boat_id', boatId).preload('boats')

    return view.render('boats.pages.index', { pages: pages.filter((page) => page.toCheck) })
  }

  public async create({ view, params }: HttpContextContract) {
    return view.render('boats.pages.create', { boat_id: params.boat_id })
  }

  public async edit({ params, view }: HttpContextContract) {
    const page = await Page.findOrFail(params.id)

    return view.render('boats.pages.edit', { page: page, boat_id: params.boat_id })
  }

  public async store({ params, request, response }: HttpContextContract) {
    const boat = await Boat.findOrFail(params.boat_id)
    const content = request.input('content')

    await boat.related('pages').create({ content })

    return response.redirect().toRoute('boats.show', { id: params.boat_id })
  }

  public async update({ response, params }: HttpContextContract) {
    const boat = await Boat.findOrFail(params.boat_id)
    const newPage = await Page.findOrFail(params.id)

    const page = await boat
      .related('pages')
      .query()
      .wherePivot('boat_id', params.boat_id)
      .firstOrFail()

    newPage.toCheck = false

    await newPage.save()

    await page.delete()

    return response.redirect().toRoute('boats.show', { id: params.boat_id })
  }

  public async destroy({ params, view }: HttpContextContract) {
    const page = await Page.findOrFail(params.id)

    await page.delete()

    return view.render('/')
  }
}
