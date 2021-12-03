import { DateTime } from 'luxon'
import { BaseModel, column, HasOne, hasOne, manyToMany, ManyToMany } from '@ioc:Adonis/Lucid/Orm'
import LifeguardProfile from './LifeguardProfile'
import Excursion from './Excursion'
import Page from './Page'

export default class Person extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public firstname: string

  @column()
  public lastname?: string

  @column.dateTime()
  public birth?: DateTime

  @column.dateTime()
  public death?: DateTime

  @column()
  public gender?: string

  @manyToMany(() => Excursion, {
    localKey: 'id',
    relatedKey: 'id',
    pivotForeignKey: 'person_id',
    pivotRelatedForeignKey: 'excursion_id',
    pivotTable: 'excursion_person',
  })
  public excursions: ManyToMany<typeof Excursion>

  @hasOne(() => LifeguardProfile, {
    foreignKey: 'personId',
    localKey: 'id',
    serializeAs: 'lifeguard_profiles',
  })
  public lifeguardProfile: HasOne<typeof LifeguardProfile>

  @manyToMany(() => Page, {
    localKey: 'id',
    relatedKey: 'id',
    pivotForeignKey: 'person_id',
    pivotRelatedForeignKey: 'page_id',
    pivotTable: 'person_pages',
  })
  public pages: ManyToMany<typeof Page>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
