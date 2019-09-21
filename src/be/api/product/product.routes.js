const router = require ('express').Router ();
const {getProductsList} = require ('./product.service');
const conf = require ('../../../../server.config');

router.route ('/getProductsList').get (async (req, res) => {
  try {
    console.log ('[product.route.js] in getProductsList route');
    const response = await getProductsList ();
    res.status (200).send ({productsList: response});
  } catch (error) {
    console.log ('Error while route /product path in product.route.js');
    const errCode = error.code || 500;
    const errMessage =
      error || `Error in route getProductsList ${conf.BASE_API_PATH}product`;
    res.status (errCode).json ({err: errMessage});
  }
});
module.exports = router;
