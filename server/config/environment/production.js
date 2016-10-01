module.exports = {
  ip: process.env.ip || undefined,
  port: process.env.PORT || 8080,
  sequelize: {
    uri: process.env.SEQUELIZE_URI || 'sqlite://',
    options: {
      logging: false,
      storage: 'dist.sqlite',
      define: {
        timestamps: false,
      },
    },
  },
};
