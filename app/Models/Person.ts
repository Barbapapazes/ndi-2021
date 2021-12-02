import { DateTime } from 'luxon'
import { BaseModel, column, HasOne, hasOne, manyToMany, ManyToMany } from '@ioc:Adonis/Lucid/Orm'
import LifeguardProfile from './LifeguardProfile'
import SavedProfile from './SavedProfile'
import Excursion from './Excursion'

export default class Person extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public firstname: string

  @column()
  public lastname: string

  @manyToMany(() => Excursion, {
    localKey: 'id',
    relatedKey: 'id',
    pivotForeignKey: 'person_id',
    pivotRelatedForeignKey: 'excursion_id',
    pivotTable: 'excursion_persons',
  })
  public excursions: ManyToMany<typeof Excursion>

  @hasOne(() => LifeguardProfile, {
    foreignKey: 'person_id',
    localKey: 'id',
    serializeAs: 'lifeguard_profile',
  })
  public lifeguardProfile: HasOne<typeof LifeguardProfile>

  @hasOne(() => SavedProfile, {
    foreignKey: 'person_id',
    localKey: 'id',
    serializeAs: 'saved_profile',
  })
  public savedProfile: HasOne<typeof SavedProfile>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
