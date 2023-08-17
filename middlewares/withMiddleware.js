
const withMiddleware = (req,res,next)=>{
    res.with = (key,value)=>{
        req.session.flashed = {...req.session.flashed,[key]:value}
        return res
    }
    next()
}

module.exports = withMiddleware