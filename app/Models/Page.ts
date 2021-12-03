import { DateTime } from 'luxon'
import { BaseModel, column, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import { compose } from '@ioc:Adonis/Core/Helpers'
import { SoftDeletes } from '@ioc:Adonis/Addons/LucidSoftDeletes'
import Person from './Person'
import Boat from './Boat'

export default class Page extends compose(BaseModel, SoftDeletes) {
  @column({ isPrimary: true })
  public id: number

  @column()
  public content: string

  @column()
  public toCheck: boolean

  @manyToMany(() => Person, {
    localKey: 'id',
    relatedKey: 'id',
    pivotRelatedForeignKey: 'person_id',
    pivotForeignKey: 'page_id',
    pivotTable: 'person_pages',
  })
  public persons: ManyToMany<typeof Person>

  @manyToMany(() => Boat, {
    localKey: 'id',
    relatedKey: 'id',
    pivotForeignKey: 'page_id',
    pivotRelatedForeignKey: 'boat_id',
    pivotTable: 'boat_pages',
  })
  public boats: ManyToMany<typeof Boat>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
