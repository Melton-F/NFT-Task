import express from'express'
import userController from '../controller/userController'
const router = express.Router()


//Routers
router.route('/')
    .get(userController.showUsers)
    .post(userController.createUser)

router.route('/:id')
    .get(userController.getUserById)
    .delete(userController.deleteUser)
    .patch(userController.updateUser)

module.exports = router