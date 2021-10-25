const express = require('express');
const router = express.Router();
const passport = require('passport');

const auth = require('../middleware/auth.middleware');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');
const userController = require('../controllers/user.controller');
const productController = require('../controllers/product.controller');

const authBearer = require('../middleware/auth').authenticateBearer
const authLocal = require('../middleware/auth').authenticateLocal;
// const { authenticateLocal } = require('../middleware/auth');

// router.get('/', auth(), awaitHandlerFactory(userController.getAllUsers));
router.get('/v1/users/list', authBearer,userController.getAllUsers); // localhost:3000/api/v1/users/list
router.post('/v1/users/create', authBearer,userController.createUser); // localhost:3000/api/v1/users/create
router.patch('/v1/users/delete/:id', authBearer,userController.deleteUser); // localhost:3000/api/v1/users/delete/1



router.post('/v1/users/login', authLocal,function(req, res, next) {res.send({token: req.user});});
// router.post('/login',auth ,userController.userLogin); // localhost:3000/api/v1/users/login
router.get('/id/:id', userController.getUserById); // localhost:3000/api/v1/users/username/julia

router.get('/username/:username', userController.getUserByuserName); // localhost:3000/api/v1/users/username/julia
router.post('/validate', userController.validateToken); // localhost:3000/api/v1/users/login

router.get('/v1/products', productController.getAllProducts); // localhost:3000/api/v1/products


module.exports = router;

