const userController=require('../controller/userController')

const route= require('express').Router()

route.post(`/create`,userController.create)
route.get(`/read/:id`,userController.read)
route.get(`/readall`,userController.readall)
route.post(`/login`, userController.login);
route.patch(`/update/:id`,userController.update)
route.delete(`/delete/:id`,userController.delete)

module.exports=route