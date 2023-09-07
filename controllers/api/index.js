const router = require('express').Router();
const userRoutes = require('./userRoutes');
const teamsRoutes = require('./teamsRoutes');


router.use('/users', userRoutes);
router.use('/teams', teamsRoutes);

module.exports = router;
