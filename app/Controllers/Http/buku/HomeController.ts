import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class HomeController {

  // jika mau running front end assetnya baik js atau css ataupun image configure dulu webpack nyaz
  index({view}: HttpContextContract) {
    return view.render('welcome')
  }

  daftarBukuRender({view}: HttpContextContract) {
    // view itu relatif dengan folder viewnya
    return view.render('buku/daftar_buku')
  }

  inputBukuRender({view}: HttpContextContract) {
    // view itu relatif dengan folder viewnya
    return view.render('buku/input_buku')
  }


}
