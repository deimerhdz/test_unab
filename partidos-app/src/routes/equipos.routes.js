const {Router } = require('express');
const { validarJWT } = require('../midlewares/auth');
const {obtenerEquipos,crearEquipo,obtenerEquipo,EliminarEquipo,editarEquipo} = require('../controllers/equipo.controller');
const router = Router();
router.get('/',validarJWT,obtenerEquipos);
router.get('/:id',validarJWT,obtenerEquipo);
router.post('/',validarJWT,crearEquipo);
router.put('/:id',validarJWT,editarEquipo);
router.delete('/:id',validarJWT,EliminarEquipo);


module.exports = router;