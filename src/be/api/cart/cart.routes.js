const router = require ('express').Router ();
const {getCart} = require ('./cart.service');
const conf = require ('../../../../server.config');

router.route ('/getCart').get (async (req, res) => {
  try {
    console.log ('[cart.route.js] in getCart route');
    const response = await getCart (req);
    res.status (200).send ({cart: response});
  } catch (error) {
    console.log ('Error while route /cart path in cart.route.js');
    const errCode = error.code || 500;
    const errMessage =
      error || `Error in route getCart ${conf.BASE_API_PATH}cart`;
    res.status (errCode).json ({err: errMessage});
  }
});
module.exports = router;
