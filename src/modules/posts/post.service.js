import { sequelize } from "../../DB/connection.js"
import { comment } from "../../DB/models/comment.model.js"
import { post } from "../../DB/models/posts.model.js"
import { user } from "../../DB/models/user.model.js"
export const createPost  = async (req ,res) =>{
    try {
        const {title , content , userId} =req.body
        const createPost =await post.create({title , content , userId})
        res.status(201).json(createPost)
    } catch (error) {
        return res.status(499).json({message : error})
    }
}
export const DeltePostById = async (req , res)=>{
    try {
        const {id}= req.params
        const {userId}= req.body
        const findpost = await post.findByPk(id)
        if(findpost.userId == userId){
            const deletePost = await post.destroy({where : {
                id : id
            }})
            return res.status(200).json({message : "post deleted succ"})
        }else{
            return res.status(401).json({message : "You dont have permission to delete this post" })
        }
    } catch (error) {
        return res.status(499).json({message : error})
    }
}
export const allPostsWithComments = async (req, res) => {
    try {
        const allPosts = await post.findAll({
            include: [
                {
                    model: comment,
                    attributes: ["titel", "id"]  // Return specific fields from comments
                },
                {
                    model: user,
                    attributes: ["id", "email", "name"]  // Return specific user fields
                }
            ]
        });
        console.log(allPosts)

        return res.status(200).json({ message: allPosts });
    } catch (error) {
        console.error('Error fetching posts:', error);
        return res.status(500).json({ message: 'Failed to retrieve posts' });
    }
};



export const countComments = async (req, res) => {
    try {
        const allPosts = await post.findAll({
            include: [
                {
                    model: comment,
                    attributes: ["titel", "id"]  , 
                    required : false
                },
                {
                    model: user,
                    attributes: ["id", "email", "name"] 
                } , 
                
            ], 
            attributes :{
                include : [
                    [sequelize.fn('count',sequelize.col("comment.id")) , "commentsCount"],
            
                ]
            },
            group : ["post.id" , "user.id"] 

        });

        return res.status(200).json({ message: allPosts });
    } catch (error) {
        console.error('Error fetching posts:', error);
        return res.status(500).json({ message: 'Failed to retrieve posts' });
    }
}; // watch assignment solution////////////////////////////////////////////////////////////////////////////////
