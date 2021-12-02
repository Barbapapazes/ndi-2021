import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Person from './Person'

export default class SavedProfile extends BaseModel {
  @column({ isPrimary: true })
  public person_id: number

  @belongsTo(() => Person, {
    foreignKey: 'person_id',
    localKey: 'id',
  })
  public person: BelongsTo<typeof Person>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
