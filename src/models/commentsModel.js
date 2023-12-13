const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
        },
        postId: {
            type: String,
            required: true,
        },
        likes: {
            type: Array,
            default: [],
        },
        desc: {
            type: String,
            max: 500,
        },
    },
    { timestamps: true }
)
