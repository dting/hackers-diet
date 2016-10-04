const errors = require('../components/errors');

module.exports = function configRoutes(app) {
  app.use('/api/users', require('../api/user'));
  app.use('/auth', require('../auth'));

  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|assets)/*')
    .get(errors[404]);

  // All other routes should redirect to the index.html
  if (app.get('env') === 'development') {
    const { devMiddleware } = require('./webpack');

    const indexPath = `${app.get('tempPath')}/index.html`;
    app.use('*', (req, res) => {
      res.set('content-type', 'text/html');
      res.send(devMiddleware.fileSystem.readFileSync(indexPath));
      res.end();
    });
  } else {
    app.route('/*')
      .get((req, res) => {
        res.sendFile(`${app.get('clientPath')}/index.html`);
      });
  }
};
