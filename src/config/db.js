const mysql = require('mysql2');
 
// Create the connection pool. The pool-specific settings are the defaults
const dbconfig = ({
  host: process.env.DB_HOST || 'localhost',
  user:  process.env.DB_USER || 'root', // gamedb_user , 1010
  database:  process.env.DB_DATABASE || 'gamedb',
  password:  process.env.DB_PASSWORD,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

const pool = mysql.createPool(dbconfig)

console.log(`Connected to database '${dbconfig.database}' on host '${dbconfig.host}'`)
module.exports = pool