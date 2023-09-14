const constant = require("../constant")

const errorHandler = (err,req,res,next)=>
{
    //if we dont have status code we assign 500 else keep the status code as it is 
    const statusCode = res.statusCode ? res.statusCode : 500;
    console.log(statusCode);

    switch (statusCode) {
        case constant.VALIDATION_ERROR:
            res.json({
                title : "Validation Failed",
                message : err.message
            })
            break;
         case constant.NOT_FOUND:
            res.json({
                title : "Not found",
                message : err.message,
    
            })
            break;
         case constant.FORBIDDEN:
            res.json({
                title : "Forbidden error",
                message : err.message,

            })
            break;
         case constant.UNAUTHORIZED:
            res.json({
                title : "Unauthorized error",
                message : err.message,

            })
            break;
        case constant.SERVER_ERROR:
            res.json({
                title : "server error",
                message : err.message,

            })
            break;
    
        default:
            res.json({
                title : "server error",
                message : err.message,

            })
            console.log("All good no error!");
            break;
    }

}

module.exports = errorHandler