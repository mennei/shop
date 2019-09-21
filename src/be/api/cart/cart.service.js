const repository = require ('./cart.repository');

const getCart = async req => {
  console.log ('[cart.service.js] in getCart service');
  // Check list against products DB table.
  const cart = await repository.getCart (req);
  console.log (
    '[cart.service.js] in getCart service after repository.getCart',
    cart.length
  );
  if (!cart) {
    return null;
  }
  return cart;
};

module.exports = {getCart};
