import { DateTime } from 'luxon'
import { BaseModel, column, manyToMany, ManyToMany } from '@ioc:Adonis/Lucid/Orm'
import Boat from './Boat'
import Person from './Person'

export default class Excursion extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @manyToMany(() => Boat, {
    localKey: 'id',
    relatedKey: 'id',
    pivotForeignKey: 'excursion_id',
    pivotRelatedForeignKey: 'boat_id',
    pivotTable: 'boat_excursions',
  })
  public boats: ManyToMany<typeof Boat>

  @manyToMany(() => Person, {
    localKey: 'id',
    relatedKey: 'id',
    pivotForeignKey: 'excursion_id',
    pivotRelatedForeignKey: 'person_id',
    pivotTable: 'excursion_persons',
  })
  public savedPerson: ManyToMany<typeof Person>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
