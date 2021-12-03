import { DateTime } from 'luxon'
import { BaseModel, column, manyToMany, ManyToMany } from '@ioc:Adonis/Lucid/Orm'
import Boat from './Boat'
import Person from './Person'
import Page from './Page'

export default class Excursion extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public location: string

  @column.dateTime()
  public date: DateTime

  @manyToMany(() => Boat, {
    localKey: 'id',
    relatedKey: 'id',
    pivotForeignKey: 'excursion_id',
    pivotRelatedForeignKey: 'boat_id',
    pivotTable: 'boat_excursion',
    pivotTimestamps: true,
  })
  public boats: ManyToMany<typeof Boat>

  @manyToMany(() => Person, {
    localKey: 'id',
    relatedKey: 'id',
    pivotForeignKey: 'excursion_id',
    pivotRelatedForeignKey: 'person_id',
    pivotTable: 'excursion_person',
    pivotTimestamps: true,
  })
  public savedPersons: ManyToMany<typeof Person>

  @manyToMany(() => Page, {
    localKey: 'id',
    relatedKey: 'id',
    pivotForeignKey: 'excursion_id',
    pivotRelatedForeignKey: 'page_id',
    pivotTable: 'excursion_pages',
  })
  public pages: ManyToMany<typeof Page>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
