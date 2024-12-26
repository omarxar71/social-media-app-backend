import { DataTypes, Model } from "sequelize";
import { sequelize } from "../connection.js";

export const comment = sequelize.define("comment" , {
    titel : {
        type: DataTypes.TEXT,
    }
})