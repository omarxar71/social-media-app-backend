import { connectedDb } from "./DB/connection.js"
import { syncTables } from "./DB/connection.js"
import Userrouter from "./modules/User/user.controller.js"
import {user} from "./DB/models/user.model.js"
import {post} from "./DB/models/posts.model.js"
import {comment} from "./DB/models/comment.model.js"
import postRouter from "./modules/posts/post.controller.js"
import commentRouter from "./modules/comments/comments.controller.js"
export const bootstrap= async(app, express)=>{
    await connectedDb()
    await syncTables()
    app.use(express.json())
    app.use("/user" ,Userrouter)
    app.use("/post" , postRouter)
    app.use("/comment" ,commentRouter)









    app.all("*" , (req , res)=>{
        res.status(404).json({message : "page not found"})
    })
}