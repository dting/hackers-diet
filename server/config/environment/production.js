module.exports = {
  ip: process.env.IP || undefined,
  port: process.env.PORT || 8080,
  sequelize: {
    uri: process.env.DATABASE_URL || 'postgres://localhost:5432/hackersdiet-dist',
    options: {
      logging: false,
      dialet: 'postgres',
    },
  },
};
