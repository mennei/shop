const router = require ('express').Router ();
const {getToken, verifyToken, doSignup} = require ('./authoristion.service');
const conf = require ('../../../../server.config');

router.route ('/getToken').post (async (req, res) => {
  try {
    console.log ('[authoristion.route.js] in getToken route');
    const response = await getToken (req);
    res.status (200).send ({token: response});
  } catch (error) {
    console.log (
      'Error while route /authoristion path in authoristion.route.js'
    );
    const errCode = error.code || 500;
    const errMessage =
      error.message ||
      `Error in route getToken ${conf.BASE_API_PATH}authoristion`;
    res.status (errCode).json ({err: errMessage});
  }
});

router.route ('/verifyToken').post (async (req, res) => {
  try {
    console.log ('[authoristion.route.js] in verifyToken route');
    const response = await verifyToken (req);
    res.status (200).send ({token: response});
  } catch (error) {
    console.log (
      'Error while route /authoristion path in authoristion.route.js'
    );
    const errCode = error.code || 500;
    const errMessage =
      error.message ||
      `Error in route verifyToken ${conf.BASE_API_PATH}authoristion`;
    res.status (errCode).json ({err: errMessage});
  }
});

router.route ('/doSignup').post (async (req, res) => {
  try {
    console.log ('[authoristion.route.js] in doSignup route');
    const response = await doSignup (req);
    res.status (200).send ({userId: response});
  } catch (error) {
    console.log (
      'Error while route /authoristion path in authoristion.route.js'
    );
    const errCode = error.code || 500;
    const errMessage =
      error.message ||
      `Error in route signup ${conf.BASE_API_PATH}authoristion`;
    res.status (errCode).json ({err: errMessage});
  }
});
module.exports = router;
