import Database from "@ioc:Adonis/Lucid/Database";
import BaseSeeder from "@ioc:Adonis/Lucid/Seeder";

export default class extends BaseSeeder {
  public async run() {
    // Write your database queries inside the run method

    const category = Database.table("categories");

    await category.insert([
      {
        name: "historical",
        created_at: Date.now(),
        updated_at: Date.now(),
      },
      {
        name: "science",
        created_at: Date.now(),
        updated_at: Date.now(),
      },
      {
        name: "fiction",
        created_at: Date.now(),
        updated_at: Date.now(),
      },
      {
        name: "novel",
        created_at: Date.now(),
        updated_at: Date.now(),
      },
    ]);
  }
}
