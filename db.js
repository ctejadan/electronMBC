var knex = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: "./MBC"
  },
  pool: {min: 0, max: 3}
});
