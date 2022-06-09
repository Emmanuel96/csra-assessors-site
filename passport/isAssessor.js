function isAssessor(req, res, next) {
  if (req.isAuthenticated() && req.user.role === 'assessor') {
    return next()
  }
  res.redirect('/login')
}
module.exports = isAssessor