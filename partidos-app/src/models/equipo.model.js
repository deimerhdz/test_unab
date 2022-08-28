module.exports = (sequelize,type)=>{
    const Equipo = sequelize.define('Equipo',{
        id:{
            type:type.INTEGER(4),
            primaryKey:true,
            autoIncrement:true
        },
        nombre:{
            type:type.STRING(20)
        },
        

    },{ timestamps:false})

    return Equipo
}