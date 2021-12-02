import { DateTime } from 'luxon'
import { BaseModel, column, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import LifeguardProfile from './LifeguardProfile'

export default class Role extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @manyToMany(() => LifeguardProfile, {
    localKey: 'id',
    relatedKey: 'personId',
    pivotForeignKey: 'role_id',
    pivotRelatedForeignKey: 'person_id',
    pivotTable: 'lifeguard_profile_role',
    pivotTimestamps: true,
  })
  public lifeguardProfile: ManyToMany<typeof LifeguardProfile>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
