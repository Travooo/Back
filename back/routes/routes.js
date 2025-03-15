const express = require('express');
const router = express.Router();
const controllerUser = require('../controller/controllerUser');

router.get('/', controllerUser.hello);
router.get('/hello/:nome', controllerUser.helloParam);
router.get('/users', controllerUser.getUsers);

module.exports = router;