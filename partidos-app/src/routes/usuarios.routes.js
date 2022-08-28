const {Router } = require('express');
const { validarJWT } = require('../midlewares/auth');
const {obtenerUsuarios,crearUsuario,EliminarUsuario,editarUsuario} = require('../controllers/usuario.controller');
const router = Router();
router.get('/',validarJWT,obtenerUsuarios);
router.post('/',validarJWT,crearUsuario);
router.put('/:id',validarJWT,editarUsuario);
router.delete('/:id',validarJWT,EliminarUsuario);


module.exports = router;