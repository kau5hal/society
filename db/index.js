var mysql = require('mysql');
var mainDb = 'sql12356338';
var conn = mysql.createConnection({
    host: 'sql12.freemysqlhosting.net',
    user: 'sql12356338',
    password: 'htxnTZPX6Q'
});
conn.connect((err,result) => {
    if(!err) {
        console.log('Database Connected')
    }else{
        console.log('Database not Connected', err)
    }
});

module.exports = conn;