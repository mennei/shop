const {getCollection} = require ('../../../utils/mongoUtils');
const conf = require ('../../../../server.config');

const getCredentialsFromDb = async req => {
  console.log (
    '[authoristion.repository.js] in getCredentialsFromDb',
    req.email
  );
  try {
    const collection = await getCollection (
      req,
      'users',
      conf.DB_NAME,
      `${conf.MONGODB_CONNECTION_STRING}/${conf.DB_NAME}`
    );
    let dbCredentials = await collection
      .findOne ({}, {_id: 0, email: req.email})
      .then (result => {
        console.log (result);
        if (result.email === req.email) {
          return result;
        }
      })
      .catch (err => {
        console.log (err);
        return null;
      });
    console.log ('[authoristion.repository.js] email from DB', dbCredentials);
    return dbCredentials;
  } catch (error) {
    return null;
  }
};
module.exports = {getCredentialsFromDb};
