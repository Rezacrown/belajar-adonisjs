import Factory from '@ioc:Adonis/Lucid/Factory'


const users: any = 'users'


// harus pakai model gk bisa diakali pakai nama string table nya wkwkw
export const factory = Factory.define(users, ({faker}) => {
  return {
    name: faker.person.fullName(),
    email: faker.internet.email(),
    hobby: faker.commerce.department(),
    gender: 'pria',
    user_id: faker.number.bigInt(),
    updated_at: new Date(),
    created_at: new Date(),
  };
}).build()



