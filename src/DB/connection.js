import { Sequelize } from "sequelize";
export const sequelize = new Sequelize("socialapp" , "root" , "root" , {
    host: "localhost",
    dialect: "mysql",
})

export const connectedDb = async function (){
   await sequelize.authenticate().then(()=>console.log("connected to the database")).catch((error)=> console.log("couldnt connect to the database =>" + error))
}

export const syncTables =async function (){
   await sequelize.sync().then(()=>console.log("tables sync")).catch((error)=>console.log("couldnt sync tables =>" + error))
}