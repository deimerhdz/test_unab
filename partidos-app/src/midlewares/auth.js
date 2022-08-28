const jwt =require('jsonwebtoken');

const validarJWT = (req,res,next)=>{
    const token = req.headers['x-token'];
 console.log(token);
    if(!token){
       return res.status(401).json({
            ok:false,
            msg:'No hay token en la peticion.'
        })
    }
    try {
       const decode = jwt.verify(token, process.env.JWT_SECRET);

        req.id = decode.id;
    
            next();
    } catch (error) {
        return res.status(401).json({
            ok:false,
            msg:'Token no valido.',
            error:error
        })
    }
}

module.exports={
    validarJWT
}