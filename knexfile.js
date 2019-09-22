module.exports = {
  development: {
    useNullAsDefault: true,
    client: "sqlite3",
    connection: {
      filename: "dev.sqlite3"
    },
    seeds: {
      directory: "./bin/seeds"
    }
  },
  // Todo: use different database in production
  production: {
    useNullAsDefault: true,
    client: "sqlite3",
    connection: {
      filename: "prod.sqlite3"
    },
    seeds: {
      directory: "./bin/seeds"
    }
  },
  test: {
    useNullAsDefault: true,
    client: "sqlite3",
    connection: {
      filename: "test.sqlite3"
    }
  }
};
