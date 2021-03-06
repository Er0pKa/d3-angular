class Server {
  bootstrap(env) {
    this.express = require('express');
    this.app = this.express();
    this.clientRouter = this.express.Router();

    this.app.disable('x-powered-by');
    this.app.set('view engine', 'jade');
    this.app.set('view cache', this.env === 'production');

    this.setupRouting();
    this.app.listen(8880);
  }

  setupRouting() {
    const path = require('path');
    console.log(path);
    this.app.use('/build', this.express.static(path.join(__dirname, 'build'), {
      maxAge: this.env === 'production' ? 31536000 : 0
    }));
    this.app.use('/vendor', this.express.static(path.join(__dirname, 'vendor'), {
      maxAge: this.env === 'production' ? 31536000 : 0
    }));

    this.clientRouter.get('/', (req, res, next) => {
      res.render('index', {
        pageTitle: 'Main page',
      })
    });

    this.app.use('/', this.clientRouter);
  }
}

Object.create(Server.prototype).bootstrap(process.env.NODE_ENV || 'development');