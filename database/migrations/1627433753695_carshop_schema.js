'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CarshopSchema extends Schema {
  up () {
    this.create('carshops', (table) => {
      table.increments()
      table.bigInteger('id_user').notNullable()
      table.string('status', 254).notNullable().defaultTo('ACTIVE')
      table.date('date').notNullable().defaultTo(this.fn.now())
    })
  }

  down () {
    this.drop('carshops')
  }
}

module.exports = CarshopSchema
