const repository = require ('./product.repository');

const getProductsList = async req => {
  console.log ('[product.service.js] in getProductsList service');
  // Check list against products DB table.
  const productsList = await repository.getProductsList (req);
  console.log (
    '[product.service.js] in getProductsList service after repository.getProductsList',
    productsList.length
  );
  if (!productsList || productsList.length === 0) {
    return null;
  }
  return productsList;
};

module.exports = {getProductsList};
