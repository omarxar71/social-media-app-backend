import * as userService from "./user.service.js"
import { Router } from "express"
const router = Router()
router.post("/" , userService.addUser);
router.put("/:id" , userService.UpdateOrCreate)
router.get("/" , userService.findUserByEmail)
router.get("/:id" , userService.findUserById)
export default router;