const responsHelper = (req,res,error,data,status,numberOfResult=null)=>{
    if (error){
        return res.status(status||400).json({
            code:status||400,
            message:error
        })
    }
    if(numberOfResult!= null && numberOfResult!= undefined){
        return res.status(status||200).json({
            status:'success',
            code:status||200,
            data:data,
            numberOfResult:numberOfResult
        })
    }
    else{
        return res.status(status||200).json({
            status:'success',
            code:status||200,
            data:(data)
        })
    }
}
module.exports = {
    responsHelper
}