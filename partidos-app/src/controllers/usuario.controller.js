const {Usuario} = require('../database/config');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');
const obtenerUsuarios = async (req, res) => {
    
    const Usuarios = await Usuario.findAll();
      res.json({
        ok: true,
        Usuarios,
      });
  }
  const crearUsuario = async (req, res) => {
    try {
      const { nombre, username, correo, password } = req.body;

      const usuario = await Usuario.build({nombre, username, correo, password});
      const salt = bcrypt.genSaltSync();
      usuario.password = bcrypt.hashSync(password, salt);
      await usuario.save();
     
    const token = await generarJWT(usuario.id);
      
      res.json({
      ok: true,
      token,
      usuario,

      mgs: "El Usuario se creo satisfactoriamente.",
      });
      
  } catch (error) {
      return  res.status(500).json({
      ok: false,
      error,
      msg:'Error inesperado... revisar logs'
  });
  }
     
  }
  
  
  const editarUsuario = async(req, res) => {
    const id = req.params.id;
    try {
      const UsuarioDB = await Usuario.findOne({ where: { id: id } });
        const {nombre, username, correo, password}= req.body;
        
      if (!UsuarioDB) {
        return res.status(404).json({
          ok: false,
          msg: "No existe el Usuario por ese id",
        });
      }
      await Usuario.update({nombre, username, correo, password}, { where: { id: id } });
      res.json({
        ok: true,
        mgs: "El Usuario se actualizo correctamente.",
      });
    } catch (error) {
      res.status(500).json({
        mgs: "Hable con el administrador",
        error
      });
    }
  }
  
  
  const EliminarUsuario = async(req, res) => {
    const id = req.params.id;
    try {
      const UsuarioDB = await Usuario.findOne({ where: { id: id } });
  
      if (!UsuarioDB) {
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
    obtenerUsuarios,
    crearUsuario,
    editarUsuario,
    EliminarUsuario
  }