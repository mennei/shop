const MongoClient = require ('mongodb').MongoClient;
const path = require ('path');
const fs = require ('fs');
const root = path.dirname (require.main.filename);
const conf = fs.existsSync (path.resolve (root, 'server.config.js'))
  ? require (path.resolve (root, 'server.config'))
  : null;
let connection;

/***
* @param mongodb_connection_string
* @param opts
* @return mongodb connection
* */

async function getConnection (url, opts) {
  opts = opts || {};
  if (typeof url !== 'string') {
    throw new TypeError ('Expected url to be a string');
  }
  if (!connection) {
    try {
      connection = await MongoClient.connect (url, opts);
    } catch (err) {
      throw new Error ('Could not establish connection, dig in logs');
    }
  }
  return connection;
}

/***
* close connection
* */

function closeConnection () {
  if (connection) {
    connection.close ();
  }
}

/**
*
* @param {Request} req for error logs.
* @param {string} collectionName
* @param {string} dbName uses conf.DB_NAME if argument is undefiend
* @param {string} connectionString uses if argument is conf.MONGODB_CONNECTION_STRING
*/

async function getCollection (
  req,
  collectionName,
  dbName = conf.DB_NAME,
  connectionString = conf.MONGODB_CONNECTION_STRING
) {
  try {
    if (!connectionString || !dbName || !collectionName) {
      console.error (
        `Error connecting mongodb, missing connection parameters:
         [
           connectionString: ${JSON.stringify (connectionString)} ,
           dbName: ${JSON.stringify (dbName)} ,
           collectionName: ${JSON.stringify (collectionName)}
          ]`
      );
      throw 'could not establish db connection';
    }

    const connection = await getConnection (connectionString, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    const db = await connection.db (dbName);
    return await db.collection (collectionName);
  } catch (e) {
    console.error (`Error connecting mongodb : ${JSON.stringify (e)}`, req);
    throw 'could not establish db connection';
  }
}

module.exports = {
  getConnection,
  getCollection,
};

//close connection when process is destroyed
process.once ('SIGINT', () => {
  closeConnection ();
});
