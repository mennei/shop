const jwt = require ('jsonwebtoken');
const repository = require ('./authorition.repository');

const getToken = async req => {
  console.log ('[authoristion.service.js] in getToken service', req.body);
  // Check Credentials against users DB table.
  const dbCredentials = await repository.getCredentialsFromDb (req.body);
  console.log (
    '[authoristion.service.js] in getToken service after repository.getCredentialsFromDb',
    dbCredentials
  );
  if (!dbCredentials) {
    return null;
  }
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
