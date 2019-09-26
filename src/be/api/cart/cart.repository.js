const {getCollection} = require ('../../../utils/mongoUtils');
const conf = require ('../../../../server.config');

const getCart = async req => {
  try {
    console.log ('[cart.repository.js] in getCart');
    return new Promise (async (resolve, reject) => {
      const collection = await getCollection (
        req,
        'cart',
        conf.DB_NAME,
        `${conf.MONGODB_CONNECTION_STRING}/${conf.DB_NAME}`
      );
      await collection.find ().toArray (async (err, result) => {
        if (err) {
          return reject (err);
        }
        return resolve (result);
      });
    });
  } catch (error) {
    return null;
  }
};

const checkout = req => {
  try {
    console.log ('[cart.repository.js] in checkout');
    return new Promise (async (resolve, reject) => {
      const collection = await getCollection (
        req,
        'cart',
        conf.DB_NAME,
        `${conf.MONGODB_CONNECTION_STRING}/${conf.DB_NAME}`
      );
      await collection
        .insertOne ({username: req.username, list: req.list, total: req.total})
        .then (result => resolve (result.insertedId), err => reject (err));
    });
  } catch (error) {
    return null;
  }
};
module.exports = {getCart, checkout};
