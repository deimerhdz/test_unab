const {Partido} = require('../database/config');

const obtenerPartidos = async (req, res) => {
    
    const Partidos = await Partido.findAll({include: { all: true }, order: [
      // Will escape title and validate DESC against a list of valid direction parameters
      ['fecha', 'DESC'],
    ]});
      res.json({
        ok: true,
        Partidos,
      
      });
  }
  const obtenerPartido = async (req, res) => {
    const id = req.params.id;
  const equipos = await Partido.findOne({where: { id:id },include: { all: true }});
    res.json({
      ok: true,
      equipos,
      
    });
}
  const crearPartido = async (req, res) => {
   
    try {
      const { local,visitante,fecha } = req.body;
   const usuario = req.id;
      if(local === visitante){
        return res.json({
          ok:false,
          msg:"No se puede crear el partido con un solo equipo"
        })
      }
      const partido = await Partido.create({usuario,local,visitante,fecha,goles_local:null,goles_visitante:null});
      res.json({
        ok: true,
        partido,
        mgs: "El Partido se creo satisfactoriamente.",
      });
      
    } catch (err) {
      return  res.status(500).json({
        ok: false,
        err,
        msg:'Error inesperado... revisar logs'
    });
    }
     
  }
  
  
  const editarPartido = async(req, res) => {
    const id = req.params.id;
    try {
      const PartidoDB = await Partido.findOne({ where: { id: id } });
        const {local,visitante,fecha,goles_local,goles_visitante}= req.body;
        
      if (!PartidoDB) {
        return res.status(404).json({
          ok: false,
          msg: "No existe el Partido por ese id",
        });
      }
      await Partido.update({local,visitante,fecha,goles_local,goles_visitante}, { where: { id: id } });
      res.json({
        ok: true,
        mgs: "El Partido se actualizo correctamente.",
      });
    } catch (error) {
      res.status(500).json({
        mgs: "Hable con el administrador",
        error
      });
    }
  }
  
  
  const EliminarPartido = async(req, res) => {
    const id = req.params.id;
    try {
      const PartidoDB = await Usuario.findOne({ where: { id: id } });
  
      if (!PartidoDB) {
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
    obtenerPartidos,
    crearPartido,
    editarPartido,
    EliminarPartido,
    obtenerPartido
  }