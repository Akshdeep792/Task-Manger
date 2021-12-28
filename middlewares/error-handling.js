const res = require("express/lib/response")

const errorhandlingmiddleware = (err, req, res,next) => {
    return res.status(500).json({msg : 'Something went wrong'});
}

module.exports = errorhandlingmiddleware