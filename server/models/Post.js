const { model, Schema } = require('mongoose');
const { Schema } = mongoose;


const postSchema = new Schema({
    body: String,
    firstName: String,
    createdAt: String,
    comments: [
        {
            body: String,
            firstName: String,
            createdAt: String
        }
    ],
    likes: [
        {
            firstName: String,
            createdAt: String
        }
    ],
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    }
})

module.exports = model('Post', postSchema);