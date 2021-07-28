'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', () => {
  return { greeting: 'Api carshop => carshop/v1' }
});

// Grouped
Route.group(() => {

  Route.get('/',() => {
    return { greeting: 'Hello you are inside carshop-api' }
  });

  Route.post('/create/', 'CarshopController.create');
  Route.post('/add_product/', 'CarshopController.add_product');
  Route.get('/delete_product/', 'CarshopController.delete_product');
  Route.get('/update_quantity/', 'CarshopController.update_quantity');
  Route.get('/list_car/', 'CarshopController.list_car');
  Route.get('/success/', 'CarshopController.success');
  Route.get('/cancel/', 'CarshopController.cancel');

}).prefix('carshop/v1')
