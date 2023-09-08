const router = require('express').Router();
const { Player, User } = require('../../models');
// const withAuth = require('../../utils/auth');

  router.post('/', async (req, res) => {
    try {
      const newTeam = await Plater.create({
        ...req.body,
        user_id: req.session.user_id,
      });
      res.status(200).json(newTeam);
    } catch (err) {
      res.status(400).json(err);
    }
  });

  router.delete('/:id', async (req, res) => {
    try {
      const newProject = await Plater.destroy({
        id:req.params.id,
        user_id: req.session.user_id,
      });
  
      res.status(200).json(newProject);
    } catch (err) {
      res.status(400).json(err);
    }
  });

  module.exports = router
  