module.exports = {
  useNullAsDefault: true,
  client: "sqlite3",
  connection: {
    filename: "dev.sqlite3"
  },
  seeds: {
    directory: "./bin/seeds"
  }
};
