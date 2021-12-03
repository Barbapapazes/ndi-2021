import { BasePolicy } from '@ioc:Adonis/Addons/Bouncer'
import User from 'App/Models/User'

export default class UserPolicy extends BasePolicy {
  public before(user: User | null) {
    if (user?.isAdmin) {
      return true
    }
  }

  public index() {
    return false
  }

  public show() {
    return false
  }

  public create() {
    return false
  }

  public store() {
    return false
  }

  public edit() {
    return false
  }

  public update() {
    return false
  }

  public delete() {
    return false
  }
}
