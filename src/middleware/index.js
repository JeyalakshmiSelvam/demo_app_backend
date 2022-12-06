// eslint-disable-next-line no-unused-vars
const {unless} = require('express-unless');
const { AuthenticationService, JWTStrategy } = require('@feathersjs/authentication');
module.exports = function (app) {
  // Add your custom middleware here. Remember that
  // in Express, the order matters.

  let validateToken= async function   (req, res, next) {
    if(req.headers.authorization){
      try{
        let data = await app.service('authentication').verifyAccessToken(req.headers.authorization,app.get["authentication.secret"])
        // let payload = await JWTStrategy.authenticate()s
        console.log("data",data)
        next ()
      }catch(err){
        return err
      }
    }else{
      return;
    }
  }

  validateToken['unless'] = unless;
  app.use(validateToken['unless']({
    path: [
      '/authentication',
      { url: '/users', methods: ['POST'] }
    ]
  }));
};
