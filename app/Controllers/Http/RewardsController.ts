import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Reward from 'App/Models/Reward'

export default class RewardsController {
  public async index({ view }: HttpContextContract) {
    const rewards = await Reward.all()

    return view.render('rewards/index', { rewards })
  }

  public async show({ params, view }: HttpContextContract) {
    const reward = await Reward.findOrFail(params.id)

    return view.render('rewards/show', { reward })
  }

  public async create({ view }: HttpContextContract) {
    return view.render('rewards/create')
  }

  public async store({ request, response }: HttpContextContract) {
    const name = request.input('name')

    const reward = new Reward()

    reward.name = name

    await reward.save()

    return response.redirect().toRoute('RewardsController.show', { id: reward.id })
  }

  public async edit({ params, view }: HttpContextContract) {
    const reward = await Reward.findOrFail(params.id)

    return view.render('rewards/edit', { reward })
  }

  public async update({ params, request, response }: HttpContextContract) {
    const reward = await Reward.findOrFail(params.id)

    const name = request.input('name')

    reward.name = name

    await reward.save()

    return response.redirect().toRoute('RewardsController.show', { id: reward.id })
  }
}
