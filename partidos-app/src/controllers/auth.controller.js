const { Usuario } = require("../database/config");
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');

const login = async(req, res) => {
    const {username,password} =req.body;
    try {
        const usuarioDB = await Usuario.findOne({where: { username:username } });
        //Verificando el email
        if(!usuarioDB){
            return res.status(404).json({
                ok:false,
                msg:'Usuario o contraseña incorrectos.'
            })
        }
        //Verificando la contraseña
        const validPassword = bcrypt.compareSync(password,usuarioDB.password);
        if(!validPassword){
            return res.status(400).json({
                ok:false,
                msg:'Usuario o contraseña incorrectos.'
            })
        }      
        //Generar un token
        const token = await generarJWT(usuarioDB.id);
        res.json({
            ok:true,
            token,
            
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            ok:false,
            msg:'Hable con el administrador.',
            error:err
        })
    }
}

const register = async (req, res) => {
    
  try {
        const { nombre, username, correo, password } = req.body;

        const usuario = Usuario.build({nombre, username, correo, password});
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
        
    } catch (err) {
        return  res.status(500).json({
        ok: false,
        err,
        msg:'Error inesperado... revisar logs'
    });
    }
}

const renewToken = async(req,res) => {
   
    const id = req.id;

    const token = await generarJWT(id);
    //obtener el usuario
    const usuario = await Usuario.findOne({where: { id:id } });
    res.json({
        ok: true,
        token,
        usuario,
    })
}

module.exports = {
    login,
    renewToken,
    register,
}