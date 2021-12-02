import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany, manyToMany, ManyToMany } from '@ioc:Adonis/Lucid/Orm'
import Service from './Service'
import Boat from './Boat'

export default class Station extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public location: string

  @hasMany(() => Boat, {
    foreignKey: 'stationId',
    localKey: 'id',
  })
  public boats: HasMany<typeof Boat>

  @manyToMany(() => Service, {
    localKey: 'id',
    relatedKey: 'id',
    pivotForeignKey: 'station_id',
    pivotRelatedForeignKey: 'service_id',
    pivotTable: 'station_service',
  })
  public services: ManyToMany<typeof Service>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
