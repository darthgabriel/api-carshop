'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CarshopProductsSchema extends Schema {
  up () {
    this.create('carshop_products', (table) => {
      table.increments()
      table.bigInteger('id_car').notNullable()
      table.bigInteger('id_product').notNullable()
      table.decimal('quantity').notNullable()
      table.date('date').notNullable().defaultTo(this.fn.now())
    })
  }

  down () {
    this.drop('carshop_products')
  }
}

module.exports = CarshopProductsSchema
