import { DateTime } from 'luxon'
import {
  BaseModel,
  column,
  hasMany,
  HasMany,
  hasOne,
  HasOne,
  manyToMany,
  ManyToMany,
} from '@ioc:Adonis/Lucid/Orm'
import LifeguardBoatProfile from './LifeguardBoatProfile'
import Person from './Person'
import Station from './Station'
import Excursion from './Excursion'
import TypeBoat from './TypeBoat'

export default class Boat extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public stationId: number

  @column({ serializeAs: 'type_boat_id' })
  public typeBoatId: number

  @hasMany(() => Person, {
    localKey: 'id',
    foreignKey: 'id',
  })
  public persons: HasMany<typeof Person>

  @hasOne(() => LifeguardBoatProfile, {
    localKey: 'id',
    foreignKey: 'boatId',
    serializeAs: 'lifeguard_boat_profile',
  })
  public lifeguardBoatProfile: HasOne<typeof LifeguardBoatProfile>

  @hasOne(() => TypeBoat, {
    localKey: 'typeBoatId',
    foreignKey: 'id',
    serializeAs: 'type_boat',
  })
  public typeBoat: HasOne<typeof TypeBoat>

  @hasOne(() => Station, {
    localKey: 'stationId',
    foreignKey: 'id',
  })
  public station: HasOne<typeof Station>

  @manyToMany(() => Excursion, {
    localKey: 'id',
    relatedKey: 'id',
    pivotForeignKey: 'boat_id',
    pivotRelatedForeignKey: 'excursion_id',
    pivotTable: 'boat_excursion',
    pivotTimestamps: true,
  })
  public excursions: ManyToMany<typeof Excursion>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
