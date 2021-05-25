const dotenv = require('dotenv')
const assert =  require('assert')

dotenv.config();

const {PORT, HOST, HOST_URL, SQL_USER, SQL_PASSWORD, SQL_DATABASE, SQL_SERVER,SQL_PORT } = process.env;

const sql_Encrypt = process.env.ENCRYPT === "true";

assert(PORT, 'port is required');
assert(HOST, 'Host is required');

module.exports={
    port:PORT,
    host:HOST,
    url:HOST_URL,
    sql:{
        database:SQL_DATABASE,
        user:SQL_USER,
        password:SQL_PASSWORD,
        host:SQL_SERVER,
        port:SQL_PORT,
        sslmode:'require'
    }
}