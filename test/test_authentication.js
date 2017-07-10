const assert = require('assert')
const mongoose = require("mongoose")
mongoose.Promise = require("bluebird")
const User = require('../models/user')

before("connect to database", function (done) {
    mongoose.connect('mongodb://localhost:27017/snips_test', {
            useMongoClient: true
        })
        .then(function () {
            done()
        })
})

beforeEach("clear users", function (done) {
    User.remove({})
        .then(function () {
            done();
        })
})

describe("User", function () {
    describe("with a test user", function () {
        let testUser;

        beforeEach("create a test user", function (done) {
            User.create({
                username: "test",
                password: "testpw"
            }).then(function (user) {
                testUser = user;
                done();
            })
        })

        it("can compare passwords", function () {
            assert(testUser.comparePassword("testpw"))
        })

        it("can authenticate", function (done) {
            User.authenticate("test", "testpw")
                .then(function (authenticatedUser) {
                    assert.equal(authenticatedUser.username, testUser.username)
                    done()
                })
                .catch(done)
        })

        it("will not authenticate with a bad password", function (done) {
            User.authenticate("test", "badpw")
                .then(function (authenticatedUser) {
                    assert(!authenticatedUser)
                    done()
                })
                .catch(done)
        })
    })
})
