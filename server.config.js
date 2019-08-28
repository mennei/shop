module.exports = {
  SERVICE_NAME: process.env.SERVICE_NAME || 'shop',
  PORT: process.env.PORT || 3000,
  BASE_API_PATH: '/api/v1/',
  MONGODB_CONNECTION_STRING: 'mongodb://localhost:27017',
  DB_NAME: 'shop',
};
