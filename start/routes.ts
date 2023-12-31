/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from "@ioc:Adonis/Core/Route";
import AuthController from "App/Controllers/Http/AuthController";

// Route.get("/", async () => {
//   return { hello: "world" };
// });

// Route.post("/", async ({ request }) => {
//   const { nama, sandi }: any = request.body();

//   return { data: { nama, sandi } };
// });

// Route.get('/halo', () => {
//   return 'hello'
// })

// mutltiple route handler
// Route.route("/multiple", ["POST", "PUT", "GET"], () => {
//   return "halo multiple";
// });

// params id
// tanda '?' pada :id adalah sebagai tanda itu opsional pada route tersebut
// Route.get("/index/:id?", ({ params, request }) => {
//   const query = request;

//   return { data: params, query };
// }).as("halo");

// view rendering
// need to install packcage
// Route.get("/view/tes", async ({ view }) => {
//   return view.render("test");
//   // return "testing";
// });

// controller
// cara panggil controller dengan memasukan namanya dan akses methodnya
// Route.get("/controller", "BelajaradonisController.index");
// Route.post("/controller", "BelajaradonisController.create");
// Route.put("/controller", "BelajaradonisController.update");

// register route
Route.get("/register", AuthController.indexRegister).as('register.index');
Route.post("/register", AuthController.Register).as("register");

// login route
Route.get("/login", AuthController.loginIndex).as("login.index");
Route.post("/login", AuthController.login).as("login");
Route.post("/logout", AuthController.logout).as("logout");


//
//
//  parameter kedua path nya relatif dengan folder Htpp pada controller di app
Route.get("/", "buku/HomeController.index").middleware("check");
Route.get("/daftarbuku", "buku/HomeController.daftarBukuRender")
  .middleware("check");
Route.get("/inputbuku", "buku/HomeController.inputBukuRender")
  .middleware(["auth:web", 'check'])

Route.get("/edit/:id", "buku/HomeController.editBukuRender").middleware('auth:web');

// action route
Route.post("/store", "buku/HomeController.store");
Route.post("/update/:id", "buku/HomeController.editBuku");
Route.post("/delete/:id", "buku/HomeController.hapusBuku");
