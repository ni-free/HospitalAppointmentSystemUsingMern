class error extends Error{
    constructor(message, statusCode){
        super(message);
        this.statusCode =statusCode
    }
}

export const ApiError =(err,req,res,next)=>{
  err.message=  err.message || "Internal Server Error"
    err.statusCode =err.statusCode || 500;
    if(err.code == 11000){
       const message =`Duplicate ${Object.keys(err.keyValue)} Entered`
       err = new error(message,400)
    }
    if(err.name == 'JsonWebTokenError')
    {
        const message = "Json web Token is invalid"
        err = new error(message,400)
    }
    if(err.name == 'TokenExpiredError')
    {
        const message = "Json web Token is Expired"
        err = new error(message,400)
    }
    if(err.name == 'CastError')
    {
        const message = `invalid ${err.path}` 
        err = new error(message,400)
    }
   
    const errorMessage = err.errors ? Object.values(err.errors).map(er=>er.message).join(""):err.message

    return res.status(err.statusCode).json({
        success:false,
        message:err.message
      })
}

export default error