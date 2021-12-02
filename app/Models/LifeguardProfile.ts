import { DateTime } from 'luxon'
import {
  BaseModel,
  BelongsTo,
  belongsTo,
  column,
  ManyToMany,
  manyToMany,
} from '@ioc:Adonis/Lucid/Orm'
import Reward from './Reward'
import Role from './Role'
import Person from './Person'

export default class LifeguardProfile extends BaseModel {
  @column({ isPrimary: true })
  public person_id: number

  @belongsTo(() => Person, {
    foreignKey: 'person_id',
    localKey: 'id',
  })
  public person: BelongsTo<typeof Person>

  @manyToMany(() => Role, {
    pivotTable: 'lifeguard_profile_roles',
    localKey: 'person_id',
    relatedKey: 'id',
    pivotForeignKey: 'person_id',
    pivotRelatedForeignKey: 'role_id',
    pivotTimestamps: true,
  })
  public roles: ManyToMany<typeof Role>

  @manyToMany(() => Reward, {
    pivotTable: 'lifeguard_profile_rewards',
    localKey: 'person_id',
    relatedKey: 'id',
    pivotForeignKey: 'person_id',
    pivotRelatedForeignKey: 'reward_id',
    pivotTimestamps: true,
  })
  public rewards: ManyToMany<typeof Reward>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
