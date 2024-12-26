import { DataTypes } from "sequelize";
import { sequelize } from "../connection.js";
import {user} from "./user.model.js";
import {comment} from "./comment.model.js";


export const post = sequelize.define("post" , {
    title : {
        type : DataTypes.STRING,
    } , 
    content : {
        type : DataTypes.TEXT,
    } , 

} , {
    paranoid : true
})
//userid in post table 
user.hasMany(post)
post.belongsTo(user)
//postid in comment table 
post.hasMany(comment)
comment.belongsTo(post)




