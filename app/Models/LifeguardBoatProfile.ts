import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Boat from './Boat'

export default class LifeguardBoatProfile extends BaseModel {
  @column({ isPrimary: true })
  public boatId: number

  @column.dateTime({ serializeAs: 'start_date' })
  public startDate: DateTime

  @column.dateTime({ serializeAs: 'end_date' })
  public endDate?: DateTime

  @belongsTo(() => Boat, {
    foreignKey: 'boatId',
    localKey: 'id',
  })
  public boat: BelongsTo<typeof Boat>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
