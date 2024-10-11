const theatersService = require('./theaters.service');
const asyncErrorBoundary = require('../errors/asyncErrorBoundary')

// Get theaters
async function list(req, res) {
    const data = await theatersService.list();
    res.json({ data });
}

module.exports = {
    list: asyncErrorBoundary(list)
}