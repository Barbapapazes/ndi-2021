import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Role from 'App/Models/Role'

export default class RolesController {
  public async index({ view }: HttpContextContract) {
    const roles = await Role.all()

    return view.render('roles/index', { roles })
  }

  public async show({ params, view }: HttpContextContract) {
    const role = await Role.findOrFail(params.id)

    return view.render('roles/show', { role })
  }

  public async create({ view }: HttpContextContract) {
    return view.render('roles/create')
  }

  public async store({ request, response }: HttpContextContract) {
    const name = request.input('name')

    const role = new Role()

    role.name = name

    await role.save()

    return response.redirect().toRoute('RolesController.show', { id: role.id })
  }

  public async edit({ params, view }: HttpContextContract) {
    const role = await Role.findOrFail(params.id)

    return view.render('roles/edit', { role })
  }

  public async update({ params, request, response }: HttpContextContract) {
    const role = await Role.findOrFail(params.id)

    const name = request.input('name')

    role.name = name

    await role.save()

    return response.redirect().toRoute('RolesController.show', { id: role.id })
  }
}
