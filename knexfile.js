// Update with your config settings.

module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './mydb.db'
    }, 
    useNullAsDefault: true,
    migrations: {
      // will create your migrations in the data folder
      directory: './data/migrations'
    },
    // will create your seeds in the data folder automatically
    seeds: {
      directory: './data/seeds'
    }
  },

};
