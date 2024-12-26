import { Router } from "express";
import * as commentService from "./comments.service.js"
const router = Router()
router.post("/" ,commentService.createComment )
router.patch("/:id" , commentService.updateContent)
router.post ("/find-or-create" , commentService.findOrCreate)
router.get("/search", commentService.serachComment)
router.get("/recent/:postId" ,commentService.recentComments)
router.get("/details/:id" , commentService.commentByPkWithUserAndPost)
export default router ; 