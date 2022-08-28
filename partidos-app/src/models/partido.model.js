module.exports = (sequelize,type)=>{
    const Partido = sequelize.define('Partido',{
        id:{
            type:type.INTEGER(4),
            primaryKey:true,
            autoIncrement:true
        },
        usuario:{
            type:type.INTEGER(4)
        },
        local:{
            type:type.INTEGER(4)
        },
        visitante:{
            type:type.INTEGER(4)
        },
        fecha:{
            type:type.DATE
        },
        goles_local:{
            type:type.INTEGER(4),
            allowNull:true
        },
        goles_visitante:{
            type:type.INTEGER(4),
            allowNull:true
        },

    },{timestamps:false})

    return Partido
}