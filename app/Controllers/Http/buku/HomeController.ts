import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

// schema untuk membuat validation nya sedangkan rule adalah aturan yang bisa dimasukan kedalam schemanya, contoh
// schema.string([rules.email(), rules.required(), dan masih banyak lagi yang bisa diterapkan ])
import { schema, rules } from "@ioc:Adonis/Core/Validator";
import Book from "App/Models/Book";

export default class HomeController {
  // jika mau running front end assetnya baik js atau css ataupun image configure dulu webpack nyaz
  index({ view }: HttpContextContract) {
    return view.render("welcome");
  }

  async daftarBukuRender({ view }: HttpContextContract) {
    // const book = new Book();
    // jangan pakia new Book jika ingin pakai mehtod di orm nya terutama find
    const book = await Book.all();

    console.log(book);

    // view itu relatif dengan folder viewnya
    return view.render("buku/daftar_buku", { data: book });
  }

  inputBukuRender({ view }: HttpContextContract) {
    // view itu relatif dengan folder viewnya
    return view.render("buku/input_buku");
  }

  // untuk simpan buku
  async store({ request, response, session }: HttpContextContract) {
    const { judul, tahun_terbit, deskripsi } = request.body();
    const skemaValidator = schema.create({
      judul: schema.string([rules.required()]),
      tahun_terbit: schema.number([rules.required()]),
      deskripsi: schema.string.nullable(),
    });

    // taruh session untuk validasi input form
    session.put("data-body", {
      data: {
        judul,
        tahun_terbit,
        deskripsi,
      },
    });

    // request.validate berfungsi untuk validasi data yang dikirim dari body, WAJIB PAKAI AWAIT untuk berfungsi
    await request
      .validate({
        schema: skemaValidator,
        messages: {
          // required adalah default nilai message error nya yang mau di tampilkan
          required: "ada error bro",
          "judul.required": "judul harus ada bro",
        },
      })
      .then(async (res) => {
        const book = new Book();

        book.title = res.judul;
        book.tahun_terbit = res.tahun_terbit.toString();
        book.deskripsi = res.deskripsi;

        book.save();

        session.clear();

        response.redirect("/");
      })
      .catch((error) => {
        console.log({ error });
        // langsung kirim response errornya
        // session.put('err', 'eeror')

        session.flash("error", {
          title: `title harus diisi`,
          tahun_terbit: `tahun terbit harus diisi dan value harus integer`,
        });

        // response.badRequest({ error: error.messages.errors });
        response.redirect("/inputbuku");
      });
  }

  async editBukuRender({ view, params }: HttpContextContract) {
    const { id } = params;

    const book = await Book.find(id);

    return view.render("buku/edit_buku", { data: book });
  }

  async editBuku({ params, request, response, session }: HttpContextContract) {
    const skemaValidator = schema.create({
      judul: schema.string([rules.required()]),
      tahun_terbit: schema.number([rules.required()]),
      deskripsi: schema.string.nullable(),
    });

    const { id } = params;

    await request
      .validate({ schema: skemaValidator })
      .then(async (res) => {
        const book = await Book.find(id);
        // salah satu cara untuk update data
        await book
          ?.merge({
            title: res.judul,
            tahun_terbit: res.tahun_terbit.toString(),
            deskripsi: res.deskripsi,
          })
          .save();

        session.flash("sukses", `berhasil update buku`);

        return response.redirect("/daftarbuku");
      })
      .catch((err) => {
        console.log({ err: err.messages.errors });

        let _err = {};

        err.messages.errors.forEach((error,) => {
          switch (error.field) {
            case "judul":
              _err = { ..._err, title: "title tidak boleh kosong" };
              break;
            case "tahun_terbit":
              _err = {
                ..._err,
                tahun_terbit: "tahun terbit tidak boleh kosong",
              };
              break;
            default:
              "";
              break;
          }
          return _err;
        });

        session.flash("error", _err);

        return response.redirect().back();
      });
  }


  async hapusBuku({response, params, session}: HttpContextContract) {
      const {id} = params

      const book = await Book.findOrFail(id)

      await book.delete().then(()=> {
        session.flash('sukses', `berhasil hapus data buku dengan id ${book.id}`)

        return response.redirect('/daftarbuku')
      })

  }

}
