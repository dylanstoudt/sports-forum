const router = require('express').Router();
const { Team, Player, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    res.render('homepage', {
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});


router.get('/dashboard', withAuth, async (req, res) => {
  try {
    const teamData = await Team.findAll({
      include: [
        {
          model: Player,
          // add attributes
          attributes: ['img', 'name', 'ppg', 'assists', 'rebounds', 'steals', 'blocks', 'ranking']
        },
        
      ],
      where: {
        user_id: req.session.user_id,
      },
    });
    const playerData = await Player.findAll()

    const teams = teamData.map((team) => team.get({ plain: true }));
    console.log(teams);
    const players = playerData.map((team) => team.get({ plain: true }))

    res.render('dashboard', { teams, players })
    // res.render('dashboard', { teams, players })
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/teams', withAuth, async (req, res) => {
  try {
    const teamData = await Team.findall()
    const playerData = await Player.findAll()

    const teams = teamData.map((team) => team.get({ plain: true }));
    const players = playerData.map((team) => team.get({ plain: true }))

    res.render('teams', { teams, players })
  } catch (err) {
    res.status(500).json(err);
  }
});

// // Use withAuth middleware to prevent access to route
// router.get('/profile', withAuth, async (req, res) => {
//   try {
//     // Find the logged in user based on the session ID
//     const userData = await User.findByPk(req.session.user_id, {
//       attributes: { exclude: ['password'] },
//       include: [{ model: Project }],
//     });

//     const user = userData.get({ plain: true });

//     res.render('profile', {
//       ...user,
//       logged_in: true
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }

  res.render('login');
});

module.exports = router;
