const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create a schema
const profileSchema = new Schema({
    user: {
        type: Schema.ObjectId,
        ref: 'users'
    },
    handle: {
        type: String,
        required: true,
        max: 40
    },
    company: {
        type: String,

    },
    website: {
        type: String
    },
    location: {
        type: String
    },
    status: {
        type: String,
        required: true
    },
    skills: {
        type: [String],
        required: true
    },
    bio: {
        type: String
    },
    githubUserName: {
        type: String
    },
    experience: [
        {
            title: {
                type: String,
                require: true
            },
            company: {
                type: String,
                required: true

            },
            location: {
                type: String

            },
            from: {
                type: Date,
                required: true

            },
            to: {
                type: Date

            },
            current: {
                type: Boolean,
                default: false

            },
            description: {
                type: String

            }

        }
    ],
    education: [
        {
            school: {
                type: String,
                require: true
            },
            degree: {
                type: String,
                required: true

            },
            fieldofstudy: {
                type: String,
                required: true

            },
            from: {
                type: Date,
                required: true

            },
            to: {
                type: Date

            },
            current: {
                type: Boolean,
                default: false

            },
            description: {
                type: String

            }

        }
    ],
    social: {
        youtube: {
            type: String
        },
        facebook: {
            type: String
        },
        twitter: {
            type: String
        },
        linkedin: {
            type: String
        },
        instagram: {
            type: String
        }

    },
    date: {
        type: Date,
        default: Date.now
    }

});

const profile = mongoose.model('profile', profileSchema);
module.exports = profile;