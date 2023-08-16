import Database from '@ioc:Adonis/Lucid/Database'
import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'

export default class extends BaseSeeder {
  public async run () {
    // Write your database queries inside the run method
     const Book = Database.table('books')

     await Book.insert([{
      title:'The Hobbit',
      tahun_terbit: 2002,
      deskripsi: 'tidak ada deskripsi'
     }])
  }
}
