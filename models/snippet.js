const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const SnippetSchema = new Schema({
    owner: Schema.Types.ObjectId,
    title: {
        type: String,
        required: true,
        index: true
    },
    language: {
        type: String,
        required: true,
        index: true
    },
    tags: {
        type: [String],
        index: true
    },
    snippet: {
        type: String,
        required: true
    },
    description: String
});

module.exports = mongoose.model('Snippet', SnippetSchema);