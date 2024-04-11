
//functional model
module.exports=(sequelize,DataTypes)=>{
    const User=sequelize.define("user",{
        name:{
            type:DataTypes.STRING
        },
        email:{
            type:DataTypes.STRING,
            allowNull:false
        },password:{
            type:DataTypes.STRING,
            allowNull:false
        },userType:{
            type:DataTypes.STRING,
            allowNull:false
        }
    },{
        tableName:'users'
    })
    return User;
}
