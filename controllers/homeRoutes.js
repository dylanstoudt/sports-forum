const router = require('express').Router();
const { Team, Player, User, PlayersTeam } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    const teamsData = await Team.findAll({
      include: [
        {
          model: Player,
          // add attributes
          // attributes: ['img', 'name', 'ppg', 'assists', 'rebounds', 'steals', 'blocks', 'ranking']
        }
      ],
    });
    // const playerData = await Player.findAll()
    // console.log(playerData);
    const teams = teamsData.map((team) => team.get({ plain: true }));
    // const players = playerData.map((player) => player.get({ plain: true }))
    console.log(teams);
    // console.log(teams.players[0]);
    res.render('homepage', { teams, logged_in: true })
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


router.get('/dashboard', withAuth, async (req, res) => {
  try {
    const teamData = await Team.findAll({
      include: [
        {
          model: Player,
          through: PlayersTeam,
          // add attributes
          attributes: ['img', 'name', 'ppg', 'assists', 'rebounds', 'steals', 'blocks', 'ranking']
        },
        
      ],
      where: {
        user_id: req.session.user_id,
      },
    });
    // find all players where the team id is the current users (req.session.user_id) team id
    // and give this to handlebars
    const playerData = await Player.findAll()

    const teams = teamData.map((team) => team.get({ plain: true }));
    console.log(teams);
    // only want players back that dont have a team_id or team_id is null
    const players = playerData.map((team) => team.get({ plain: true }))
    res.render('dashboard', { teams, players,   logged_in: true })
    // res.render('dashboard', { teams, players })
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/teams', withAuth, async (req, res) => {
  try {
    const teamData = await Team.findAll()
    const playerData = await Player.findAll()

    const teams = teamData.map((team) => team.get({ plain: true }));
    const players = playerData.map((team) => team.get({ plain: true }))

    res.render('teams', { teams, players,   logged_in: true })
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
