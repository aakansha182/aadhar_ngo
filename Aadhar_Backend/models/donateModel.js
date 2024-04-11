module.exports=(sequelize,DataTypes)=>{
    const Donate=sequelize.define("donate",{
        dname:{
            type:DataTypes.STRING,
            allowNull:false
        },
        email:{
            type:DataTypes.STRING,
            allowNull:false
        },
        phoneno:{
            type:DataTypes.STRING
        },
        amount:{
            type:DataTypes.INTEGER,
            allowNull:false
        },
        category:{
            type:DataTypes.STRING
        },
        donstatus:{
            type:DataTypes.BOOLEAN
        },
        payment_id:{
        type:DataTypes.STRING,
        allowNull:false
        }
    })

    return Donate
}