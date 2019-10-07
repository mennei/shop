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
      await collection.find ().toArray (async (err, results) => {
        if (err) {
          return reject (err);
        }
        if (results && results.length === 0) {
          return reject ('Products list is empty');
        }
        const uniq = results.filter ((item, index) => {
          return (
            index ===
            results.findIndex (obj => {
              return (
                JSON.stringify (obj.productHebName) ===
                JSON.stringify (item.productHebName)
              );
            })
          );
        });
        return resolve (uniq);
      });
    });
  } catch (error) {
    return null;
  }
};

module.exports = {getProductsList};
