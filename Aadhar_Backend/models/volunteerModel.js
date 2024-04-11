module.exports=(sequelize,DataTypes)=>{
    const Volunteer=sequelize.define("volunteer",{
        vname:{
            type:DataTypes.STRING,
            allowNull:false
        },
        email:{
            type:DataTypes.STRING,
            allowNull:false
        },phoneno:{
            type:DataTypes.STRING
        },event_name:{
            type:DataTypes.STRING,
            allowNull:false
        },address:{
            type:DataTypes.STRING
        },
        event_catagory:{
        type:DataTypes.STRING
        }
    })

    return Volunteer
}