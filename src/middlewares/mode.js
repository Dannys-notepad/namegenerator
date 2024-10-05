const mode = (req, res, next) => {
  if(req.query.mode === undefined){
    res.status(400).json({err: 'Can not generate any names without setting generating mode'})
  }
  next()
}

module.exports = mode