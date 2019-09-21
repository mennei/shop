const routes = [
  {
    name: 'authoristion',
    source: require ('./authoristion/authoristion.routes.js'),
  },
  {
    name: 'product',
    source: require ('./product/product.routes.js'),
  },
  {
    name: 'cart',
    source: require ('./cart/cart.routes.js'),
  },
];

module.exports = routes;
