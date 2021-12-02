import { DateTime } from 'luxon'
import { BaseModel, column, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import LifeguardProfile from './LifeguardProfile'

export default class Role extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @manyToMany(() => LifeguardProfile, {
    pivotTable: 'lifeguard_profile_roles',
    localKey: 'id',
    relatedKey: 'person_id',
    pivotForeignKey: 'role_id',
    pivotRelatedForeignKey: 'lifeguard_person_id',
    pivotTimestamps: true,
  })
  public lifeguardProfile: ManyToMany<typeof LifeguardProfile>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
