import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Boat from './Boat'

export default class TypeBoat extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @hasMany(() => Boat, {
    foreignKey: 'type_boat_id',
  })
  public boats: HasMany<typeof Boat>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
