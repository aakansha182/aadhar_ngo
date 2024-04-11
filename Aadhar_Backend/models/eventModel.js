module.exports=(sequelize,DataTypes)=>{
const Event=sequelize.define("events",{
    ename:{
        type:DataTypes.STRING,
        allowNull:false
    },
    catagory:{
       type:DataTypes.STRING,
        allowNull:false
    },description:{
        type:DataTypes.STRING,
    },image:{
        type:DataTypes.STRING,
    }
},{

})
return Event;
}
