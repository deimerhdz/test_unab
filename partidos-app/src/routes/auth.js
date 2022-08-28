const {Router } = require('express');
const { validarJWT } = require('../midlewares/auth');
const {login,register,renewToken } = require('../controllers/auth.controller')
const router = Router();
router.post('/login',login);
router.post('/registrar',register);
router.get('/renew',validarJWT,renewToken);


module.exports = router;