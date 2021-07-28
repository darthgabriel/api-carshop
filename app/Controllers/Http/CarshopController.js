'use strict'

/*
Routes:
Route.post('/create/', 'CarshopController.create');
  Route.post('/add_product/', 'CarshopController.add_product');
  Route.get('/delete_product/', 'CarshopController.delete_product');
  Route.get('/update_quantity/', 'CarshopController.update_quantity');
  Route.get('/list_car/', 'CarshopController.list_car');
  Route.get('/success/', 'CarshopController.success');
  Route.get('/cancel/', 'CarshopController.cancel');
*/

const Database = use('Database')

class CarshopController {
    //create a carshop methop post, need id_user
    async create({ request, response }) {

        let data = request.all()

        //verify that there is not a carshop already created active if return id_car active else create new
        let carshop = await Database.table('carshops')
            .select('id')
            .where({ 'id_user': data.id_user, 'status': 'ACTIVE' })
            .first();
        if (carshop) {
            carshop = carshop.id;
        } else {
            carshop = await Database.table('carshops').insert(data);
        }

        return carshop;
    }

    //add product a carshop methop post, need id_car, id_product, quantity
    async add_product({ request, response }) {

        let data = request.all()

        //verify that there is not a carshop already created and active if create else send error
        let carshop = await Database.table('carshops')
            .select('id')
            .where({ 'id': data.id_car, 'status': 'ACTIVE' })
            .first();

        let answer = response.status(400).send('ERROR');
        if (carshop) {
            //verificar si ya agrego ese producto
            let product = await Database.table('carshop_products')
                                        .where({ 'id_car': data.id_car, 'id_product': data.id_product })
                                        .first();
            if (!product) {
                await Database.table('carshop_products').insert(data);
                answer = response.status(200).send('OK');
            }
            
        }

        return answer;
    }

    //delete product a carshop methop get, need id_car, id_product
    async delete_product({ request, response }) {

        let data = request.all()

        //verify that there is not a carshop already created and active if create else send error
        let carshop = await Database.table('carshops')
            .select('id')
            .where({ 'id': data.id_car, 'status': 'ACTIVE' })
            .first();

        let answer = response.status(400).send('ERROR');
        if (carshop) {
            await Database.table('carshop_products')
                .where({ 'id_car': data.id_car, 'id_product': data.id_product })
                .delete();
                answer = response.status(200).send('OK');
        }

        return answer;
    }

    //update quantity product a carshop methop get, need id_car, id_product, quantity
    async update_quantity({ request, response }) {
        let data = request.all()

        //verify that there is not a carshop already created and active if create else send error
        let carshop = await Database.table('carshops')
            .select('id')
            .where({ 'id': data.id_car, 'status': 'ACTIVE' })
            .first();

        let answer = response.status(400).send('ERROR');
        if (carshop) {
            let product = await Database.table('carshop_products')
                                        .where({ 'id_car': data.id_car, 'id_product': data.id_product })
                                        .first();
            if (product) {
                await Database.table('carshop_products')
                .where({ 'id_car': data.id_car, 'id_product': data.id_product })
                .update({ 'quantity': data.quantity})
                answer = response.status(200).send('OK');
            }   
        }

        return answer;
    }

    //list_car product a carshop methop get, need id_car
    async list_car({ request, response }) {
        let data = request.all()

        //verify that there is not a carshop already created and active if create else send error
        let carshop = await Database.table('carshop_products')
            .where({ 'id_car': data.id_car})

        return carshop;

    }

    //success carshop methop get, need id_car
    async success({ request, response }) {
        let data = request.all()

        //verify that there is not a carshop already created and active if create else send error
        let carshop = await Database.table('carshops')
            .select('id')
            .where({ 'id': data.id_car, 'status': 'ACTIVE' })
            .first();

        let answer = response.status(400).send('ERROR');
        if (carshop) {   
                await Database.table('carshops')
                .where({ 'id_car': data.id_car})
                .update({ 'status': 'FINISH'})
                answer = response.status(200).send('OK');           
        }

        return answer;
    }

    //cancel carshop methop get, need id_car
    async cancel({ request, response }) {
        let data = request.all()

        //verify that there is not a carshop already created and active if create else send error
        let carshop = await Database.table('carshops')
            .select('id')
            .where({ 'id': data.id_car, 'status': 'ACTIVE' })
            .first();

        let answer = response.status(400).send('ERROR');
        if (carshop) {   
                await Database.table('carshops')
                .where({ 'id_car': data.id_car})
                .update({ 'status': 'CANCEL'})
                answer = response.status(200).send('OK');           
        }

        return answer;
    }


}

module.exports = CarshopController
