
const router = require('express').Router();

const {
    getThoughts,
    createThought,
    findThought,
    updateThought, 
    removeThought, 
    addReaction,
    removeReaction,
} = require('../../controllers/thought-controller')


//get all of the thoughts
router.route('/').get(getThoughts).post(createThought);

//get thought by id

router.route('/:id').get(findThought);

//update a thought

router.route('/:id').get(findThought).put(updateThought);
//delete a thought
router.route('/:id/thought/:thoughtId').delete(removeThought);

//add a reaction
router.route('/:id').post(addReaction);

//delete a reaction
router.route('/:thoughtId/reactions/:reactionId').delete(removeReaction);


module.exports = router;