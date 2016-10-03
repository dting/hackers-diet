module.exports = {
  sequelize: {
    uri: 'postgres://localhost:5432/hackersdiet-dev',
    options: {
      logging: false,
      dialect: 'postgres',
      pool: {
        max: 5,
        min: 0,
        idle: 10000,
      },
    },
  },
};
