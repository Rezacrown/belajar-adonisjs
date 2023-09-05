import { DateTime } from "luxon";
import { BaseModel, HasMany, column, hasMany } from "@ioc:Adonis/Lucid/Orm";
import BookModel from "./BookModel";

export default class Categories extends BaseModel {

  @column({ isPrimary: true })
  public id: number;

  @column()
  public name: string;

  // relationship

  @column()
  // public book_id:
  @hasMany(() => BookModel)
  public book: HasMany<typeof BookModel>


  
  // date
  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
