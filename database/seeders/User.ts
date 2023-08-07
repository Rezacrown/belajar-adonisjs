import Database from "@ioc:Adonis/Lucid/Database";
import BaseSeeder from "@ioc:Adonis/Lucid/Seeder";

// khusus klo mau generate data dummy pakai factory
import { factory } from "Database/factories";

// yang tanpa factory
export default class extends BaseSeeder {
  public async run() {
    // Write your database queries inside the run method
    const userTable = Database.table('users')

    // contoh seeder
    await userTable.insert([
      {
        name: "ary hidayat",
        email: "aryhidayat@gmail.com",
        hobby: "coding",
        gender: "pria",
        user_id: "1223",
        updated_at: new Date(),
        created_at: new Date(),
      },
      {
        name: "reza",
        email: "reza@gmail.com",
        hobby: "coding",
        gender: "pria",
        user_id: "1223",
        updated_at: new Date(),
        created_at: new Date(),
      },
    ]);

    console.log(userTable)
  }
}

// yang pakai factory
// export default class extends BaseSeeder {
//   public async run() {
//     // Write your database queries inside the run method

//     await factory.createMany(10)

//   }
// }
