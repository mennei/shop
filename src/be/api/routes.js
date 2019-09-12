const routes = [
  {
    name: 'authoristion',
    source: require ('./authoristion/authoristion.routes.js'),
  },
  {
    name: 'product',
    source: require ('./product/product.routes.js'),
  },
];

module.exports = routes;
