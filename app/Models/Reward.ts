import { DateTime } from 'luxon'
import { BaseModel, column, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import LifeguardProfile from './LifeguardProfile'

export default class Reward extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @manyToMany(() => LifeguardProfile, {
    pivotTable: 'lifeguard_profile_rewards',
    localKey: 'id',
    relatedKey: 'personId',
    pivotForeignKey: 'reward_id',
    pivotRelatedForeignKey: 'lifeguard_person_id',
    pivotTimestamps: true,
  })
  public lifeguardProfile: ManyToMany<typeof LifeguardProfile>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
