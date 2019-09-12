const {getCollection} = require ('../../../utils/mongoUtils');
const conf = require ('../../../../server.config');

const getCredentialsFromDb = async req => {
  try {
    console.log (
      '[authoristion.repository.js] in getCredentialsFromDb',
      req.username
    );
    const collection = await getCollection (
      req,
      'users',
      conf.DB_NAME,
      `${conf.MONGODB_CONNECTION_STRING}/${conf.DB_NAME}`
    );
    let dbCredentials = await collection
      .findOne ({
        username: {
          $in: [req.username],
        },
      })
      .then (result => {
        console.log (result);
        if (result && result.username === req.username) {
          return result;
        }
      })
      .catch (err => {
        console.log (err);
        return null;
      });
    console.log (
      '[authoristion.repository.js] username from DB',
      dbCredentials
    );
    return dbCredentials;
  } catch (error) {
    return null;
  }
};

const doSignup = async req => {
  console.log ('[authoristion.repository.js] in doSignup', req);
  return new Promise (async (resolve, reject) => {
    const collection = await getCollection (
      req,
      'users',
      conf.DB_NAME,
      `${conf.MONGODB_CONNECTION_STRING}/${conf.DB_NAME}`
    );
    await collection
      .find ({username: req.username})
      .toArray (async (err, result) => {
        if (err) {
          return reject (err);
        }
        if (result && result[0] && result[0].username) {
          return reject ('username exist');
        } else {
          await collection
            .insertOne ({username: req.username})
            .then (result => {
              return resolve (result.insertedId);
            });
        }
      });
  });
};
module.exports = {getCredentialsFromDb, doSignup};
