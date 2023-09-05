import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import AuthModel from "App/Models/AuthModel";

export default class AuthController {
  // register
  public static async indexRegister({
    view,
    auth,
    response,
  }: HttpContextContract) {
    await auth.use("web").check();

    // cek apakah session loggin masih ada
    if (auth.isLoggedIn) {
      return response.redirect("/");
    }

    return view.render("auth/register");
  }

  public static async Register({
    request,
    response,
    session,
  }: HttpContextContract) {
    const { email, password } = request.body();

    try {
      await AuthModel.create({
        email,
        password,
      });

      return response.redirect("/");
    } catch (err) {
      session.flash(
        "error",
        err.code == "ER_DUP_ENTRY" ? "email duplikat" : err.code
      );
      return response.redirect("/");
    }
  }

  // login
  public static async loginIndex({
    view,
    auth,
    response,
  }: HttpContextContract) {
    // cek token/session
    await auth.use("web").check();

    if (auth.use("web").isLoggedIn) return response.redirect("/");

    return view.render("auth/login");
  }

  public static async login({
    auth,
    request,
    response,
    session,
  }: HttpContextContract) {
    const { email, password } = request.body();

    // console.log({ email, password });

    try {
      await auth.use("web").attempt(email, password);

      response.redirect("/");
    } catch (err) {
      switch (err.code) {
        case "E_INVALID_AUTH_UID":
          err.code = "email belum terdaftar";
          break;

        case "E_INVALID_AUTH_PASSWORD":
          err.code = "invalid credential";

        default:
          err.code;
          break;
      }

      session.flash("error", err.code);
      return response.redirect().back();
    }
  }

  // logout
  public static async logout({ auth, response }: HttpContextContract) {
    const verify = await auth.use('web').check()

    if (verify == true) {
      await auth.use('web').logout()

      return response.redirect('/')
    }

  }
}
