const {Router } = require('express');
const { validarJWT } = require('../midlewares/auth');
const {obtenerPartidos,obtenerPartido, crearPartido,EliminarPartido,editarPartido} = require('../controllers/partido.controller');
const router = Router();
router.get('/',[validarJWT],obtenerPartidos);
router.get('/:id',[validarJWT],obtenerPartido);
router.post('/',validarJWT,crearPartido);
router.put('/:id',validarJWT,editarPartido);
router.delete('/:id',validarJWT,EliminarPartido);


module.exports = router;