import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import AuthModel from "App/Models/AuthModel";

export default class AuthController {
  // register
  public static indexRegister({ view }: HttpContextContract) {
    return view.render("auth/register");
  }

  public static async Register({ request, response }: HttpContextContract) {
    const { email, password } = request.body();

    try {
      await AuthModel.create({
        email,
        password,
      });

      return response.redirect("/");
    } catch (err) {
      return response.badRequest(err);
    }
  }

  // login
  public static loginIndex({ view }: HttpContextContract) {
    return view.render("auth/login");
  }

  public static async login({ auth, request, response }: HttpContextContract) {
    const { email, password } = request.body();

    console.log({ email, password });

    try {
      await auth.use("web").attempt(email, password);

      response.redirect("/");
    } catch (err) {
      // return response.redirect('/daftarbuku');
      return response.json({ err });
    }
  }
}
