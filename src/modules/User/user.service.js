import { user } from "../../DB/models/user.model.js"

export  const  addUser =async (req , res)=>{
    //data from body 
    const {password , name , email , role}=req.body
    try {
        const bulidUser = user.build({password ,name , email , role})
        await bulidUser.save()
        return res.status(201).json({message : "user created succ!!"})
    } catch (error) {
        return res.status(400).json({message : error})
    }
}

//create or update based on the PK
export const UpdateOrCreate=async (req ,res) =>{
   try {
    const {password , name , email , role} = req.body
    const [userN , created] = await user.findOrCreate({where : {
        id : req.params.id
    } , defaults : {
        password , name , email , role
    }})
    return res.status(201).json({message :userN , created })
   } catch (error) {
    return res.status(499).json({message : error})
   }
}
export const findUserByEmail = async (req , res)=>{
    try {
        const {email} = req.body
        const findUser = await user.findAll({where : {email : email}})
        if(findUser.length == 0)
            return res.status(404).json({message : "user not found"})
        return res.status(200).json({message : findUser})
        
    } catch (error) {
        return res.status(500).json({message : error})
    }
}
export const findUserById = async (req , res)=>{
    try {
        const {id} = req.params
        const findUser = await user.findByPk(id , {
            attributes : {exclude : ['role']}
        })
        if(!findUser)
            return res.status(400).json({message : "no user id found "})
        return res.status(200).json({message : findUser})
    } catch (error) {
        return res.status(400).json({message : error})
    }
}