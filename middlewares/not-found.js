const notFound = (req, res) => res.status(404).send('Cannot find route')
module.exports = notFound 