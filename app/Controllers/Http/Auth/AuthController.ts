import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class AuthController {
  public async login({ request, auth, response }: HttpContextContract) {
    const email = request.input('email')
    const password = request.input('password')
    const rememberMe = request.input('rememberMe')

    await auth.attempt(email, password, rememberMe)

    response.redirect('/')
  }

  public async signup({ request, response }: HttpContextContract) {
    const email = request.input('email')
    const password = request.input('password')

    const user = new User()
    user.email = email
    user.password = password

    await user.save()

    response.redirect('/login')
  }

  public async logout({ auth, response }: HttpContextContract) {
    await auth.use('web').logout()
    response.redirect('/')
  }
}
