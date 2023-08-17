
const sessionErrors = (req, res, next) => {
    if ('flashed' in req.session) {
        res.locals = { ...req.session.flashed }
        req.session.flashed = null
    }
    next()
}

module.exports = sessionErrors