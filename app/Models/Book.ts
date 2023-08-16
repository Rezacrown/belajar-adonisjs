import { DateTime } from 'luxon'
import { BaseModel, column, } from '@ioc:Adonis/Lucid/Orm'

export default class Book extends BaseModel {

  // harus wajib di isi supaya tau ngarah ke table mana
  // aman saja jika tidak ditulis
  // public static table = 'books'

  // untuk atur koneksinya
  // public static connection = 'mysql'

  @column({ isPrimary: true })
  public id: number

  @column()
  public title: string

  @column()
  public tahun_terbit: string

  @column()
  public deskripsi: string | null

  @column.dateTime({ autoCreate: true })
  public created_at: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updated_at: DateTime
}
