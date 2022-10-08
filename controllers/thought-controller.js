const { Thought, User } = require('../models');

const thoughtController = {
    // get all thoughts 
    getThoughts(req, res) {
        Thought.find()
            .sort({ createdAt: -1 })
            .then((thoughtData) => {
                res.json(thoughtData)
            })
            .catch((error) => {
                console.log(error)
                res.status(500).json(error)
            })
    },
    // get one thought by id
    findThought(req, res) {
        Thought.findOne({ _id: req.params.id })
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No thought with that ID' })
                    : res.json({ thought })
            )
    },
    // create thought 
    createThought(req, res) {
        Thought.create(req.body)
            .then((thoughtData) => {
                return User.findOneAndUpdate(
                    // id or UserId or user_id???
                    { _id: req.body.user_id },
                    { $push: { thoughts: thoughtData._id } },
                    { new: true }
                );
            })
            .then((userData) => {
                if (!userData) {
                    return res.status(404).json({ message: 'created but user no exists ' })
                }
                res.json({ message: 'successfully created thought' })
            })
            .catch((error) => {
                console.log(error)
                res.status(500).json(error)
            })
    },
    // update thought
    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.id },
            { $set: req.body },
            { new: true })
            .then((thoughtData) => {
                if (!thoughtData) {
                    res.status(404).json({ message: 'No thought with this id!' });
                    return;
                }
                res.json(thoughtData)
            })
            .catch((err) => res.status(500).json(err));
        
    // delete thought 
    },
    removeThought(req, res) {
            Thought.findOneAndDelete({ _id: req.params.thoughtId })
                .then(deletedthought => {
                    if (!deletedthought) {
                        return res.status(404).json({ message: 'No thought with this id!' });
                    }
                    return User.findOneAndUpdate(
                        { _id: req.params.id },
                        { $pull: { thoughts: req.params.thoughtId } },
                        { new: true }
                    );
                })
                .then((dbUserData) => {
                    if (!dbUserData) {
                      return res.status(404).json({ message: 'Thought created but no user with this id' });
                    }
                    res.json({ message: 'Thought successfully deleted' });
                  })
                  .catch((err) => {
                    console.log(err);
                    res.status(500).json(err);
                  });
    },
    // add a reaction 
    addReaction (req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.id },
            { $push: { reactions: req.body } },
            { new: true })
            .then((reactionData) => {
                if (!reactionData) {
                    res.status(404).json({ message: 'No thought with this id!' });
                    return;
                }
                res.json(reactionData)
            })
            .catch((err) => res.status(500).json(err));
    },
        // remove a reaction
    removeReaction({params}, res) {
        console.log(params);
    Thought.findOneAndUpdate(
        { _id: params.thoughtId },
        { $pull: { reactions: {reactions_id: params.reactionsId} } },
        { new: true }
    )
    .then((thoughtData) => {
        console.log(thoughtData);
        if (!thoughtData) {
          return res.status(404).json({ message: 'no thought with this id' });
        }
        res.json({ thoughtData });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
    }

};



module.exports = thoughtController;