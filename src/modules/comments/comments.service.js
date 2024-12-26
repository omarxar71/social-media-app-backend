import { Op, where } from "sequelize"
import { comment } from "../../DB/models/comment.model.js"
import { user } from "../../DB/models/user.model.js"
import { post } from "../../DB/models/posts.model.js"
export const createComment = async (req , res)=>{
    try {
    const comments= req.body
    const createComments = await comment.bulkCreate(comments)
    return res.json({message : "Comment created successfully" , data : createComments})
    } catch (error) {
        return res.status(499).json({message: error})
    }
}
export const updateContent = async (req , res)=>{
    try {
        const {id} = req.params
        const {titel , userId} = req.body
        const findComment = await comment.findByPk(id)
        if(!findComment) return res.status(404).json({message : "Comment not found"})
        if(findComment.userId == userId){
            const [updated] = await comment.update({titel},{where : {id}})
            if(updated)
                return res.json({message : "Comment updated successfully" , data : updated})
        }else{
            return res.status(401).json({message : "You are not authorized to update this comment"})
        }
    } catch (error) {
        return res.status(500).json({messsage : error})
    }
}

export const findOrCreate =async(req ,res)=>{
    try {
        const {postId , userId , titel}= req.body
        const [user , created] =await comment.findOrCreate({where:{postId , userId},defaults: {titel}})
        if(created === true)
            return res.status(201).json({message : "user created"})
        res.status(200).json({message :created , data : user})
    } catch (error) {
        return res.status(500).json({message: error})
    }
}
export const serachComment = async(req ,res)=>{
    try {
        const {titel} = req.body
        const findComment = await comment.findAll({where :{
            titel
        } })
        if(findComment.length ==0)
            return res.status(404).json({message : "Comment not found"})
        return res.status(200).json({message : findComment})
    } catch (error) {
        return res.status(490).json({message : error})
    }
}

export const recentComments = async (req , res)=>{
    try {
        const {postId} =req.params
        const findComments = await comment.findAll(
            {where : {postId}
            , order : [["createdAt" , "DESC"] ], 
            limit : 2
        })
        return res.status(200).json({message : findComments})
    } catch (error) {
        return res.status(400).json({message : error})
    }
}
export const commentByPkWithUserAndPost = async (req ,res)=>{
    try {
        const {id}= req.params
        const findComment= await comment.findAll({
            where : {id},
            include: [
                {model : user} , 
                {model: post}
            ]
        }) 
        if(findComment.length ==0)
            return res.status(499).json({message : "not found comment"})
        return res.status(200).json({message : "found comment" , data : findComment})
    } catch (error) {
        return res.status(499).json({message : error})
    }
}