import { DataTypes } from "sequelize";
import { sequelize } from "../connection.js";
import {comment} from "./comment.model.js";
export const user =sequelize.define("user" , {
    name : {
        type : DataTypes.STRING,
        allowNull : false , 
        validate : {
            notNull : true ,
        }
    } , 
    email : {
        type : DataTypes.STRING ,
        allowNull : false ,
        unique : true,
        validate : {
            notNull  : true , 
            isEmail: true
        }
    }, 
    password: {
        type: DataTypes.INTEGER , 
        allowNull: false , 
        validate : {
            notNull : true
        }
    }
    ,
    role : {
        type : DataTypes.ENUM("admin" , "user"),
        allowNull : false , 
        validate :{
            notEmpty : true
        }
    }
},{
    paranoid: true
})
user.hasMany(comment)
comment.belongsTo(user)