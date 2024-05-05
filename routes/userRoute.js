const userController=require('../controller/userController')

const route= require('express').Router()

route.post(`/create`,userController.create)
route.get(`/read/:id`,userController.read)
route.patch(`/update/:id`,userController.update)

module.exports=route