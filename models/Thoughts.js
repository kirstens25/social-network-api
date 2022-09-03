const { Schema, model } = require('mongoose');

const reactionSchema = new Schema({
        
    reaction_id: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
    },
    body: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 280,
    },
    user_id: {
        type: String,
        required: true
    }
}, {
toJSON: {
    getters: true
},
timestamps: true,
id: false
}
);

// Schema to create a thought model
const thoughtSchema = new Schema(
  {
    text: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 280,

    },

    reactions: [reactionSchema],

  },
  {
    id: true,
    
    timestamps: true,

  }
);

const Thought = model('thought', thoughtSchema);

module.exports = Thought;