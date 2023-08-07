import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class BelajaradonisController {
  public async index({ request }: HttpContextContract) {
    // qs itu sama dengan get() fungsinya adalah untuk ambil query params
    const query = request.qs();
    if (query) {
      return { data: query.nama };
    } else {
        return  'index';
    }
  }

  public async create({ request }: HttpContextContract) {
    const data = request.body();

    //  request.only() fungsinya untuk menangkap data yang spesifik dari body
    // begitupun request.expect() adalah untuk menangkap semua data kecuali yang di list di expect
    // const specifikData = request.only(['username', 'kelas'])

    return data;
  }

  public async update() {
    return "update";
  }
}
