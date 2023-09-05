import { DateTime } from "luxon";
import { BaseModel, column, belongsTo, BelongsTo, } from "@ioc:Adonis/Lucid/Orm";
import CategoryModel from "./CategoryModel";

export default class Book extends BaseModel {
  // harus wajib di isi supaya tau ngarah ke table mana
  // aman saja jika tidak ditulis
  // public static table = 'books'

  // untuk atur koneksinya
  // public static connection = 'mysql'

  @column({ isPrimary: true })
  public id: number;

  @column()
  public title: string;

  @column()
  public tahun_terbit: string;

  @column()
  public deskripsi: string | null;




  // relation belongsTo
  @column()
  // column category_id adalah nama & tempat foreign Id field di database yang kemudian akan jadi reference
  public category_id: number;


  @belongsTo(() => CategoryModel, {
    // wajib sebutkan foreignKey untuk memberi tahu field apa yang akan di reference, karena by default foreignKey akan mengacu pada model ini bukan model relationnya
    foreignKey: "category_id",
  })
  public category: BelongsTo<typeof CategoryModel>;

  

  // date
  @column.dateTime({ autoCreate: true })
  public created_at: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updated_at: DateTime;
}
