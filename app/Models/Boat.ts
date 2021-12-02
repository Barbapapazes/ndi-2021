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
import SavedBoatProfile from './SavedBoatProfile'
import Person from './Person'
import Station from './Station'
import Excursion from './Excursion'

export default class Boat extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  public stationId: number

  @hasMany(() => Person, {
    localKey: 'id',
    foreignKey: 'id',
  })
  public persons: HasMany<typeof Person>

  @hasOne(() => SavedBoatProfile, {
    localKey: 'id',
    foreignKey: 'boat_id',
    serializeAs: 'saved_boat_profile',
  })
  public savedBoatProfile: HasOne<typeof SavedBoatProfile>

  @hasOne(() => LifeguardBoatProfile, {
    localKey: 'id',
    foreignKey: 'boat_id',
    serializeAs: 'lifeguard_boat_profile',
  })
  public lifeguardBoatProfile: HasOne<typeof LifeguardBoatProfile>

  @hasOne(() => Station, {
    localKey: 'station_id',
    foreignKey: 'id',
  })
  public station: HasOne<typeof Station>

  @manyToMany(() => Excursion, {
    localKey: 'id',
    relatedKey: 'id',
    pivotForeignKey: 'boat_id',
    pivotRelatedForeignKey: 'excursion_id',
    pivotTable: 'boat_excursions',
  })
  public excursions: ManyToMany<typeof Excursion>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
