import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class Auth {
  public async handle(
    { auth, response }: HttpContextContract,
    next: () => Promise<void>
  ) {
    // code for middleware goes here. ABOVE THE NEXT CALL

    // cek apakah session user masih ada atau belum dan kondisinya masih login atau sudah expire
    if (auth.isLoggedIn) {
      next();
    }

    // jika belum maka akan dilakukan pengecekan ulang authenticate masih session masih layak
    try {
      await auth.use("web").authenticate();

      await next();
    } catch (error) {
      return response.redirect("/login");
    }
  }
}
