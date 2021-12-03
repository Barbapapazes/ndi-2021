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
| import './routes/customer''
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async ({ view }) => {
  return view.render('index')
})

Route.group(() => {
  Route.get('/login', ({ view }) => {
    return view.render('login')
  })
  Route.get('/signup', ({ view }) => {
    return view.render('signup')
  })

  Route.post('/login', 'AuthController.login')
  Route.post('/signup', 'AuthController.signup')
  Route.post('/logout', 'AuthController.logout')
}).namespace('App/Controllers/Http/Auth')

Route.group(() => {
  Route.resource('/boats', 'BoatsController').only(['create', 'store', 'edit', 'update'])

  Route.resource('/persons', 'PersonsController').only(['create', 'store', 'edit', 'update'])
  Route.resource('persons.pages', 'PersonsPagesController')

  Route.resource('/roles', 'RolesController')
  Route.resource('/rewards', 'RewardsController')
}).middleware(['auth'])

Route.resource('/persons', 'PersonsController').only(['index', 'show'])
Route.resource('/boats', 'BoatsController').only(['index', 'show'])
Route.resource('/stations', 'StationsController').only(['index', 'show'])
Route.resource('/services', 'ServicesController').only(['index', 'show'])
Route.resource('/excursions', 'ExcursionsController').only(['index', 'show'])
