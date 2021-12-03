import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Person from 'App/Models/Person'
import Role from 'App/Models/Role'
import Reward from 'App/Models/Reward'
import LifeguardProfile from 'App/Models/LifeguardProfile'

export default class PersonsController {
  public async index({ view }: HttpContextContract) {
    const persons = await Person.all()

    return view.render('persons/index', { persons })
  }

  public async show({ params, view }: HttpContextContract) {
    const person = await Person.findOrFail(params.id)

    await person.load('pages', (pages) => {
      pages.where('to_check', false)
    })

    return view.render('persons/show', { person })
  }

  public async create({ view }: HttpContextContract) {
    const roles = await Role.all()
    const rewards = await Reward.all()

    return view.render('persons/create', { roles, rewards })
  }

  public async store({ request, response }: HttpContextContract) {
    const firstname = request.input('firstname')
    const lastname = request.input('lastname')
    const birth = request.input('birth')
    const death = request.input('death')
    const createLifeguardProfile = !!request.input('createLifeguardProfile')
    console.log(createLifeguardProfile)
    const startDate = request.input('startDate')
    const endDate = request.input('endDate')
    const rolesIds = request.input('roles')
    const rewardsIds = request.input('rewards')

    const person = new Person()

    person.firstname = firstname
    person.lastname = lastname
    person.birth = birth
    person.death = death

    await person.save()

    if (createLifeguardProfile) {
      const lifeguardProfile = new LifeguardProfile()

      lifeguardProfile.personId = person.id
      lifeguardProfile.startDate = startDate
      lifeguardProfile.endDate = endDate

      await lifeguardProfile.save()

      lifeguardProfile.related('roles').attach(rolesIds.map((id) => Number(id)))
      lifeguardProfile.related('rewards').attach(rewardsIds.map((id) => Number(id)))
    }

    response.redirect().toRoute('PersonsController.show', { id: person.id })
  }
}
