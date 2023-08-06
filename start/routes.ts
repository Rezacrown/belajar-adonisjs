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

Route.get("/", async () => {
  return { hello: "world" };
});

Route.post("/", async ({ request }) => {
  const { nama, sandi }: any = request.body();

  return { data: { nama, sandi } };
});

// Route.get('/halo', () => {
//   return 'hello'
// })

// mutltiple route handler
Route.route("/multiple", ["POST", "PUT", "GET"], () => {
  return "halo multiple";
});

// params id
// tanda '?' pada :id adalah sebagai tanda itu opsional pada route tersebut
Route.get("/index/:id?", ({ params, request }) => {
  const query = request;

  return { data: params, query };
});

// view rendering
Route.on("/view");
Route.get("/view/tes", ({}) => {
  return "testing";
}).as("get.halo");
