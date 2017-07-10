const mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    bcrypt = require('bcryptjs'),
    Promise = require('bluebird'),
    SALT_WORK_FACTOR = 10;

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        index: {
            unique: true
        }
    },
    passwordHash: {
        type: String,
        required: true
    }
});

UserSchema.virtual('password')
    .get(function () { return null })
    .set(function (value) {
        const salt = bcrypt.genSaltSync(SALT_WORK_FACTOR);
        const hash = bcrypt.hashSync(value, salt);
        this.passwordHash = hash;
    })

UserSchema.methods.comparePassword = function (candidatePassword) {
    return bcrypt.compareSync(candidatePassword, this.passwordHash);
}

UserSchema.statics.authenticate = function (username, password) {
    const self = this;
    return new Promise(function (resolve) {
        self.findOne({username: username})
        .then(function (user) {
            if (user.comparePassword(password)) {
                resolve(user)
            } else {
                resolve(false)
            }
        })
    })
    
}

module.exports = mongoose.model('User', UserSchema);
