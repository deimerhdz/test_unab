const jwt  = require('jsonwebtoken');

const generarJWT = async (id)=>{
    return new Promise((resolve,reject)=>{
      
        const payload = {id};
        jwt.sign(payload,'aljhfiewocbciwfijd23@ad',{expiresIn:'3h'},(err,token)=>{
            if(err){
                console.log(err);
                reject('No se pudo generar el JWT.');
            }else{
                resolve(token);
            }
        });
    });

}

module.exports = {
    generarJWT
}