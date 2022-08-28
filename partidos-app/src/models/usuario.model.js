module.exports = (sequelize,type)=>{
    const Usuario = sequelize.define('Usuario',{
        id:{
            type:type.INTEGER(4),
            primaryKey:true,
            autoIncrement:true
        },
        nombre:{
            type:type.STRING(100)
        },
        correo:{
            type:type.STRING(50),
            unique:true,
        },
        username:{
            type:type.STRING(10),
            unique:true
        },
        password:{
            type:type.STRING(100)
        }

    },{timestamps:false})

    return Usuario
}