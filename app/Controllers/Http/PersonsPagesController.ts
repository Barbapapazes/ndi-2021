import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Page from 'App/Models/Page'
import Person from 'App/Models/Person'

export default class PersonsPagesController {
  public async index({ params, view }: HttpContextContract) {
    const personId = params.person_id

    const person = await Person.findOrFail(personId)

    const pages = await person
      .related('pages')
      .query()
      .wherePivot('person_id', personId)
      .preload('persons')

    return view.render('persons.pages.index', { pages: pages.filter((page) => page.toCheck) })
  }

  public async create({ view, params }: HttpContextContract) {
    return view.render('persons.pages.create', { person_id: params.person_id })
  }

  public async edit({ params, view }: HttpContextContract) {
    const page = await Page.findOrFail(params.id)

    return view.render('persons.pages.edit', { page: page, person_id: params.person_id })
  }

  public async store({ params, request, response }: HttpContextContract) {
    const person = await Person.findOrFail(params.person_id)
    const content = request.input('content')

    await person.related('pages').create({ content })

    return response.redirect().toRoute('persons.show', { id: params.person_id })
  }

  public async update({ response, params }: HttpContextContract) {
    const person = await Person.findOrFail(params.person_id)
    const newPage = await Page.findOrFail(params.id)

    const page = await person
      .related('pages')
      .query()
      .wherePivot('person_id', params.person_id)
      .firstOrFail()

    newPage.toCheck = false

    await newPage.save()

    await page.delete()

    return response.redirect().toRoute('persons.show', { id: params.person_id })
  }

  public async destroy({ params, response }: HttpContextContract) {
    const page = await Page.findOrFail(params.id)

    await page.delete()

    return response.redirect().toRoute('persons.show', { id: params.person_id })
  }
}
