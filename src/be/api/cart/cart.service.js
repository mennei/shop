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

const checkout = async req => {
  console.log ('[cart.service.js] in addItemsToCart service');
  const items = await repository.checkout (req.body);
  console.log (
    '[cart.service.js] in addItemsToCart service after repository.getCart'
  );
  if (!items) {
    return null;
  }
  return items;
};

module.exports = {getCart, checkout};
