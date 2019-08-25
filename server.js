const express = require ('express');
const bodyParser = require ('body-parser');
//server config
const conf = require ('./server.config');
const next = require ('next');
const dev = process.env.NODE_ENV !== 'production';
const app = next ({dev});
const handle = app.getRequestHandler ();
app
  .prepare ()
  .then (async () => {
    console.info (`bootstrap`, {});
    const server = express ();
    // parse application/x-www-form-urlencoded
    server.use (bodyParser.urlencoded ({extended: false}));
    // parse application/json
    server.use (bodyParser.json ({limit: '200mb'}));
    /*
    this function register backend routes
    */
    const routes = async server => {
      //
      server.route ('/error').post ((req, res) => {
        console.error (JSON.stringify (req.body), req);
      });
      //
      const routesArr = require ('./src/be/api/routes');
      for (let i in routesArr) {
        const {source, name} = routesArr[i];
        console.log (`${conf.BASE_API_PATH}${name}`);
        server.use (`${conf.BASE_API_PATH}${name}`, source);
      }
    };

    //register health check middleware
    server.use (onHealthCheck);
    //register routes
    await routes (server);

    server.get ('*', (req, res) => {
      return handle (req, res, req.url);
    });

    //Express middleware in case of SYNC error in a web request
    server.use (function (err, req, res, next) {
      console.error (`global middleware error, error: ${err}`, req);
      return next ();
    });
    //start server
    server.listen (conf.PORT, err => {
      if (err) throw err;
      console.info (
        `${conf.SERVICE_NAME} ready on http://localhost:${conf.PORT}`,
        {}
      );
    });
  })
  .catch (ex => {
    console.error (ex.stack, {});
    process.exit (1);
  });

/*
this function is for microservice health check used by docker
*/
async function onHealthCheck (req, res, next) {
  try {
    if (req.originalUrl === '/health') {
      res.json ({serviceName: conf.SERVICE_NAME, status: 'UP'});
    } else {
      next ();
    }
  } catch (err) {
    const e = err.message || err;
    console.info (`[Health] - ${e}`, {});
    res.json ({serviceName: conf.SERVICE_NAME, status: 'DOWN'});
  }
}

/*
uncaught error from somewhere
*/
process.on ('uncaughtException', function (error) {
  // let localLogger = logger || console;
  console.error (`uncaughtException, error: ${error}`, {});
  console.log (error);
});
/*
unhandled promise rejection
*/
process.on ('unhandledRejection', function (reason, p) {
  // let localLogger = logger || console;
  console.error (`uncaughtException, reason: ${reason}, p: ${p}`, {});
  console.log (reason, p);
});

process.on ('SIGINT', () => {
  process.exit ();
});
