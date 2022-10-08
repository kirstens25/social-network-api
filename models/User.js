const { Schema, model } = require('mongoose');
const Thought = require('./thoughts');

// Schema to create a user model
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
// Email, must be a proper email address
    email: {
      type: String,
      required: true,
      unique: true,
      validate: [function (email) {
        var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        return re.test(email)
      }, "Invalid email"]
    },
    // 
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: Thought,
      },
    ],
    friends: [
        {
          type: Schema.Types.ObjectId,
          ref: 'user',
        }
      ],
  },
  {
    toJSON: {
        getters:true,
        virtuals:true
    },
    id: true,
    timestamps: true,
  }
);

//Friend count
userSchema.virtual("friendCount").get(function () {
    return this.friends.length;
})

const User = model('user', userSchema);

module.exports = User;