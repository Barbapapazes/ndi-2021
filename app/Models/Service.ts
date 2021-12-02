import { DateTime } from 'luxon'
import { BaseModel, column, manyToMany, ManyToMany } from '@ioc:Adonis/Lucid/Orm'
import Station from './Station'

export default class Service extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @manyToMany(() => Station, {
    localKey: 'id',
    relatedKey: 'id',
    pivotForeignKey: 'service_id',
    pivotRelatedForeignKey: 'station_id',
    pivotTable: 'service_station',
  })
  public stations: ManyToMany<typeof Station>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
