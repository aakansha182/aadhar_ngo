require('dotenv').config()
const mysql = require('mysql');
// module.exprorts={
//     HOST:'localhost',
//     USER:'root',
//     PASSWORD:'',
//     DB:'aadhar_ngo_new',
//     dialect:'mysql',

//     pool:{
//         Max:5,
//         Min:0,
//         acquire:30000,
//         idle:10000
//     }
    
// }

module.exports={

    USER: process.env.DATABASE_USER,
PASSWORD: process.env.DATABASE_PASSWORD,
DB: process.env.DATABASE_NAME,
HOST: process.env.DATABASE_HOST,
dialect: 'mysql',
}