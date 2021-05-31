const { Client } = require('pg'); 
const client = new Client({
    user: "postgres",
    host: "localhost",
    database: "postgres",
    password: 'omolola1997.',
    port: 5432
});

client.connect()
.then(()=>console.log("connected succesfully!"))
module.exports = client;