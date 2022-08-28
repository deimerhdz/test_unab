const {Equipo} = require('../database/config');

const obtenerEquipos = async (req, res) => {
    
    const equipos = await Equipo.findAll();
      res.json({
        ok: true,
        equipos,
        
      });
  }
  
const obtenerEquipo = async (req, res) => {
    const id = req.params.id;
  const equipos = await Equipo.findOne({where: { id:id } });
    res.json({
      ok: true,
      equipos,
      
    });
}
  const crearEquipo = async (req, res) => {
   
    try {
      const { nombre } = req.body;
   
      const equipo = await Equipo.create({nombre});
      res.json({
        ok: true,
        equipo,
        mgs: "El equipo se creo satisfactoriamente.",
      });
      
    } catch (err) {
      return  res.status(500).json({
        ok: false,
        err,
        msg:'Error inesperado... revisar logs'
    });
    }
     
  }
  
  
  const editarEquipo = async(req, res) => {
    const id = req.params.id;
    try {
      const equipoDB = await Equipo.findOne({ where: { id: id } });
        const {nombre}= req.body;
        
      if (!equipoDB) {
        return res.status(404).json({
          ok: false,
          msg: "No existe el equipo por ese id",
        });
      }
      await Equipo.update({nombre}, { where: { id: id } });
      res.json({
        ok: true,
        mgs: "El equipo se actualizo correctamente.",
      });
    } catch (error) {
      res.status(500).json({
        mgs: "Hable con el administrador",
        error
      });
    }
  }
  
  
  const EliminarEquipo = async(req, res) => {
    const id = req.params.id;
    try {
      const equipoDB = await Usuario.findOne({ where: { id: id } });
  
      if (!equipoDB) {
        return res.status(404).json({
          ok: false,
          msg: "No existe el usuario por ese id",
        });
      }
      await Usuario.update({activo:false},{ where: { id: id } });
      return res.json({
        ok: true,
        msg: "El usuario  se ha eliminado correctamete",
      });
    } catch (error) {
      res.status(500).json({
        mgs: "Hable con el administrador",
      });
    }
  }

  module.exports = {
    obtenerEquipos,
    crearEquipo,
    obtenerEquipo,
    editarEquipo,
    EliminarEquipo
  }