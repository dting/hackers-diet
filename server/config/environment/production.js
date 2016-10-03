module.exports = {
  ip: process.env.ip || undefined,
  port: process.env.PORT || 8080,
  sequelize: {
    uri: process.env.SEQUELIZE_URI || 'postgres://localhost:5432/hackersdiet-dist',
    options: {
      logging: false,
      dialet: 'postgres',
    },
  },
};
