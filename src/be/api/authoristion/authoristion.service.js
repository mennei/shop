const jwt = require ('jsonwebtoken');

const getToken = req => {
  console.log ('[authoristion.service.js] in getToken service', req.body);
  const credentials = req.body;
  const token = jwt.sign (credentials, 'shop.service');
  return token;
};

const verifyToken = req => {
  console.log ('[authoristion.service.js] in verifyToken service');
  const credentials = req.body.token;
  const verify = jwt.verify (credentials, 'shop.service');
  return verify;
};
module.exports = {getToken, verifyToken};
