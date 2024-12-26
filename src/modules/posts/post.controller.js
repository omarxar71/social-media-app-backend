import { Router } from "express";
import * as postServices from "./post.service.js"
const router = Router()


router.post("/" , postServices.createPost)
router.delete("/:id" ,postServices.DeltePostById )
router.get("/" , postServices.allPostsWithComments)
router.get("/count-comments" , postServices.countComments)

export default router;