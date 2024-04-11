// const dbConfig=require('../config/dbConfig');
const {Sequelize,DataTypes}=require('sequelize');

// const sequelize=new Sequelize(
//   dbConfig.DB,
//   dbConfig.USER,
//   dbConfig.PASSWORD,{
//     host:dbConfig.HOST,
//     dialect:dbConfig.dialect,
//     operatorsAliases:false,

//     pool:{
//       max:5,
//       min:0,
//       acquire:30000,
//       idle:10000
//     }
//   }
// )

// sequelize.authenticate()
// .then(()=>{
//   console.log("connected")
// })
// .catch(err=>{
//   console.log('error'+err)
// })

// const db={}

// db.Sequelize=Sequelize
// db.sequelize=sequelize

// db.users=require('./userModel')(sequelize,DataTypes)
// db.events=require('./eventModel')(sequelize,DataTypes)
// db.donates=require('./donateModel')(sequelize,DataTypes)
// db.volunteers=require('./volunteerModel')(sequelize,DataTypes)

// db.sequelize.sync({force:false})
// .then(()=>{
//   console.log('yes re-sync done!')
// })

// module.exports=db;

const sequelize=new Sequelize('aadhar_ngo_2','root','aakansha123',{
  host:'localhost',
  dialect:'mysql'
});

try{
  sequelize.authenticate();
  console.log("connected db");
}catch(err){
  console.log('unable to connect',err)
}

const db={}

db.Sequelize=Sequelize;
db.sequelize=sequelize;


db.user=require('./userModel')(sequelize,DataTypes)
db.event=require('./eventModel')(sequelize,DataTypes)
db.donate=require('./donateModel')(sequelize,DataTypes)
db.Volunteer=require('./volunteerModel')(sequelize,DataTypes)
db.blog=require('./BlogsModel')(sequelize,DataTypes)
sequelize.sync({force:false});
module.exports=db;