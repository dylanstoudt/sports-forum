const router = require('express').Router();
const userRoutes = require('./userRoutes');
const teamsRoutes = require('./teamsRoutes');
const playersRoutes = require('./playersRoutes')

router.use('/users', userRoutes);
router.use('/teams', teamsRoutes);
router.use('/players', playersRoutes)

module.exports = router;
