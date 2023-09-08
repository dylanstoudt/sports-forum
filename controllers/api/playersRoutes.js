const router = require('express').Router();
const { Player, User, Team } = require('../../models');
// const withAuth = require('../../utils/auth');

  router.put('/:id', async (req, res) => {

    try {
      const updatedPlayer = await Player.findByPk(
        req.params.id
      
      );
      const userData = await User.findByPk(req.session.user_id,  {include: [
        {
          model: Team,
          // add attributes
         
        }
      ]})
      console.log(userData.team)
      await updatedPlayer.update({team_id: userData.team.id})
      await updatedPlayer.save()
      console.log("FOUND PLAYER", updatedPlayer)
      console.log("USERDATA", userData)
      res.status(200).json(updatedPlayer);
    } catch (err) {
      console.log(err)
      res.status(400).json(err);
    }
  });

  module.exports = router
  