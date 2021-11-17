const knex = require('knex')
const config = require('../knexfile')

const db = knex(config.development)
module.exports = {     
  getAll,
  getOne,
  getRoom,
  insert,
  update,
  remove
}

function getAll () {
  return db('users')
    .select('*')
}

function getOne (id) {
  return db('users')
    .select('*')
    .where('id', id)
}

function getRoom (room_name) {
  return db('users')
    .select('*')
    .where('room_name', room_name)
}

function insert (user) {
  return db('users')
    .insert(user)
    .returning('*')
}

function update (id, user) {
  return db('users')
    .update(user)
    .where('id', id)
    .returning('*')
}

function remove (id) {
  return db('users')
    .where('id', id)
    .del()
}
