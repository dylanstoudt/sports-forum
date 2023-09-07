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
    // const teamData = await Team.find({
    //   include: [
    //     {
    //       model: Player,
    //       // add attributes
    //       attributes: ['img', 'name', 'ppg', 'assists', 'rebounds', 'steals', 'blocks', 'ranking']
    //     }
    //   ],
    //   where: {
    //     user_id: req.session.user_id,
    //   },
    // });
    // const playerData = await Player.findAll()

    // const teams = teamData.map((team) => team.get({ plain: true }));
    // const players = playerData.map((team) => team.get({ plain: true }))

    // console.log(teams)
    // console.log(players);

    res.render('dashboard')
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




// router.get('/', async (req, res) => {
//   try {
//     // Get all projects and JOIN with user data
//     const projectData = await Project.findAll({
//       include: [
//         {
//           model: User,
//           attributes: ['name'],
//         },
//       ],
//     });

//     // Serialize data so the template can read it
//     const projects = projectData.map((project) => project.get({ plain: true }));

//     // Pass serialized data and session flag into template
//     res.render('homepage', { 
//       projects, 
//       logged_in: req.session.logged_in 
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// router.get('/project/:id', async (req, res) => {
//   try {
//     const projectData = await Project.findByPk(req.params.id, {
//       include: [
//         {
//           model: User,
//           attributes: ['name'],
//         },
//       ],
//     });

//     const project = projectData.get({ plain: true });

//     res.render('project', {
//       ...project,
//       logged_in: req.session.logged_in
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// Use withAuth middleware to prevent access to route
router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Project }],
    });

    const user = userData.get({ plain: true });

    res.render('profile', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});

module.exports = router;
