const router = require('express').Router();
const { Player, User, Team, PlayersTeam } = require('../../models');
// const withAuth = require('../../utils/auth');

  router.put('/:id', async (req, res) => {

    try {
      console.log(req.session.team_id);
      // const updatedPlayer = await Player.findByPk(
      //   req.params.id
      
      // );
      const userData = await User.findByPk(req.session.user_id,  {include: [
        {
          model: Team,
          // add attributes
         
        }
      ]})
      console.log(userData.team.id)
      const addPlayer = await PlayersTeam.create({
        team_id:userData.team.id,
        player_id:parseInt(req.params.id)
      })
      console.log('============');
      console.log(addPlayer);
      // await updatedPlayer.update({team_id: userData.team.id})
      // await updatedPlayer.save()
      // console.log("FOUND PLAYER", updatedPlayer)
      // console.log("USERDATA", userData)
      res.status(200).json(addPlayer);
    } catch (err) {
      console.log(err)
      res.status(400).json(err);
    }
  });

  module.exports = router
  