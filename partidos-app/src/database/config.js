const Sequelize = require('sequelize')
const UsuarioModel = require('../models/usuario.model');
const EquipoModel = require('../models/equipo.model');
const PartidoModel = require('../models/partido.model');

const sequelize = new Sequelize(process.env.DB_NAME,process.env.DB_USER,process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging:false
});
const Usuario = UsuarioModel(sequelize,Sequelize);
const Equipo = EquipoModel(sequelize,Sequelize);
const Partido = PartidoModel(sequelize,Sequelize);

//add foreign key
Usuario.hasMany(Partido,{
    foreignKey: 'usuario'
});
Partido.belongsTo(Usuario,{
    foreignKey:'usuario'
});
Equipo.hasMany(Partido,{
    foreignKey:'local'
})
Partido.belongsTo(Equipo,{
    foreignKey:'local'
})
Equipo.hasMany(Partido,{
    foreignKey:'visitante'
})
Partido.belongsTo(Equipo,{
    foreignKey:'visitante'

})
sequelize.sync({force:false})
.then(()=>{
    console.log('Tablas creadas');
})
module.exports = {
    Usuario,
    Equipo,
    Partido
}