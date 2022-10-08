const User = require('../../models/user');
const Thought = require('../../models/thoughts')

const router = require('express').Router();


//get all of the users
//http://localhost:3001/users
router.get('/', (req,res) => {
    User.find({})
     .populate('thoughts')
     .populate('friends')
     .then((users) => {
        res.json(users);
     })

});

//get user by id
//http://localhost:3001/users/:id
router.get('/:id', (req,res) =>{
    User.findOne({_id: req.params.id})
    .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : res.json({user})
        )
    .catch((err) => res.status(500).json(err));
});

//create a user
//http://localhost:3001/users
router.post('/', (req,res) => {
    User.create(req.body)
    .then((user) => res.json(user))
    .catch((err) => res.status(500).json(err));
});

//update a user
//http://localhost:3001/users/:id
router.put('/:id', (req,res) =>{
    User.findOneAndUpdate(
        {_id: req.params.id},
        {$set: req.body},
        {new:true})
    .then((user) => {
        if (!user) {
            res.status(404).json({ message: 'No user with this id!' });
            return;
        }
        res.json(user)
    })
        .catch((err) => res.status(500).json(err));

});

//delete a user
//http://localhost:3001/users/:id
router.delete('/:id', (req,res) =>{
    User.findOneAndRemove({ _id: req.params.id })
        .then((user) => 
            !user
             ? res.status(404).json({message: 'No user exists by the ID'})
             : Thought.findOneAndUpdate(
                {users: req.params.id},
                {$pull: {users: req.params.id}},
                {new:true}
             )
        )
        .then((thought) => 
          !thought
           ? res.status(404).json({ message: 'User deleted, but no thoughts found',}) 
           : res.json({ message: 'User successfully deleted'})
           )
           .catch((err) => {
            console.log(err);
            res.status(500).json(err, {message:"whoops caught an err"});
           })
});

//Add friend
//http://localhost:3001/users/:id/friends/:friendsId
router.post('/:id/friends/:friendsId', (req,res) => {
    User.findByIdAndUpdate (
        {_id: req.params.id},
        {$addToSet: {friends: req.params.friendsId}},
        {new : true}
    )
    .then((dbUserData) => {
      if (!dbUserData) {
        res.status(404).json({ message: "No user found with this id!" });
        return;
      }
      res.json(dbUserData);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
})

// delete friend
//http://localhost:3001/users/:id/friends/:friendsId
router.delete('/:id/friends/:friendsId', (req,res) => {
    User.findOneAndUpdate (
        {_id: req.params.id},
        {$pull: {friends: req.params.friendsId}},
        {new : true}
    )
    .then((dbUserData) => {
      if (!dbUserData) {
        res.status(404).json({ message: "No user found with this id!" });
        return;
      }
      res.json(dbUserData);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
})
module.exports = router;