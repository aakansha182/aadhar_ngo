const userController=require('../controllers/userController')
const router=require('express').Router()

router.post('/register',userController.addUser)
router.get('/allusers',userController.getAllUsers)
router.get('/:id',userController.getOneUser)
router.put('/:id',userController.updateUser)
router.delete('/:id',userController.deleteUser)

module.exports=router;