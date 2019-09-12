const {getCollection} = require ('../../../utils/mongoUtils');
const conf = require ('../../../../server.config');

const getProductsList = async req => {
  try {
    console.log ('[product.repository.js] in getProductsList');
    return new Promise (async (resolve, reject) => {
      const collection = await getCollection (
        req,
        'products',
        conf.DB_NAME,
        `${conf.MONGODB_CONNECTION_STRING}/${conf.DB_NAME}`
      );
      await collection.find ().toArray (async (err, result) => {
        if (err) {
          return reject (err);
        }
        if (result && result.length === 0) {
          return reject ('Products list is empty');
        }
        return resolve (result);
      });
    });
  } catch (error) {
    return null;
  }
};

module.exports = {getProductsList};
