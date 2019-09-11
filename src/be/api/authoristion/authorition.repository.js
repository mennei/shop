const {getCollection} = require ('../../../utils/mongoUtils');
const conf = require ('../../../../server.config');

const getCredentialsFromDb = async req => {
  try {
    console.log (
      '[authoristion.repository.js] in getCredentialsFromDb',
      req.email
    );
    const collection = await getCollection (
      req,
      'users',
      conf.DB_NAME,
      `${conf.MONGODB_CONNECTION_STRING}/${conf.DB_NAME}`
    );
    let dbCredentials = await collection
      .findOne ({
        email: {
          $in: [req.email],
        },
      })
      .then (result => {
        console.log (result);
        if (result && result.email === req.email) {
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

const doSignup = async req => {
  console.log ('[authoristion.repository.js] in doSignup', req.email);
  return new Promise (async (resolve, reject) => {
    const collection = await getCollection (
      req,
      'users',
      conf.DB_NAME,
      `${conf.MONGODB_CONNECTION_STRING}/${conf.DB_NAME}`
    );
    await collection.find ({email: req.email}).toArray (async (err, result) => {
      if (err) {
        return reject (err);
      }
      if (result && result[0] && result[0].email) {
        return reject ('Email exist');
      } else {
        await collection.insertOne ({email: req.email}).then (result => {
          return resolve (result.insertedId);
        });
      }
    });
  });
};
module.exports = {getCredentialsFromDb, doSignup};
