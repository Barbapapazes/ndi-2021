import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Page from 'App/Models/Page'
import Excursion from 'App/Models/Excursion'

export default class ExcursionsPagesController {
  public async index({ params, view }: HttpContextContract) {
    const excursionId = params.excursion_id

    const excursion = await Excursion.findOrFail(excursionId)

    const pages = await excursion
      .related('pages')
      .query()
      .wherePivot('excursion_id', excursionId)
      .preload('excursions')

    return view.render('excursions.pages.index', { pages: pages.filter((page) => page.toCheck) })
  }

  public async create({ view, params }: HttpContextContract) {
    return view.render('excursions.pages.create', { excursion_id: params.excursion_id })
  }

  public async edit({ params, view }: HttpContextContract) {
    const page = await Page.findOrFail(params.id)

    return view.render('excursions.pages.edit', { page: page, excursion_id: params.excursion_id })
  }

  public async store({ params, request, response }: HttpContextContract) {
    const excursion = await Excursion.findOrFail(params.excursion_id)
    const content = request.input('content')

    await excursion.related('pages').create({ content })

    return response.redirect().toRoute('excursions.show', { id: params.excursion_id })
  }

  public async update({ response, params }: HttpContextContract) {
    const excursion = await Excursion.findOrFail(params.excursion_id)
    const newPage = await Page.findOrFail(params.id)

    const page = await excursion
      .related('pages')
      .query()
      .wherePivot('excursion_id', params.excursion_id)
      .firstOrFail()

    newPage.toCheck = false

    await newPage.save()

    await page.delete()

    return response.redirect().toRoute('excursions.show', { id: params.excursion_id })
  }

  public async destroy({ params, response }: HttpContextContract) {
    const page = await Page.findOrFail(params.id)

    await page.delete()

    return response.redirect().toRoute('excursions.show', { id: params.excursion_id })
  }
}
