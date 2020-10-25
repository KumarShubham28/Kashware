const request = require('supertest');
const app = require('../app');
const user_data = require('../models').user_data;
const bcrypt = require('bcrypt');

// generating hash password
const generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
}
const userPassword = generateHash("123ert");
const userOne = {
    name: "Shubham",
    email: "Shubham@gmail.com",
    password: userPassword,
}

let token;

//destroying all the users from table and creating one
beforeAll(async () => {
    await user_data.destroy({
        where: {}
    })
    await user_data.create(userOne)
})

//generating token befor every test
beforeEach(async () => {
    const response = await request(app).post('/api/login').send({
        email: "Shubham@gmail.com",
        password: "123ert"
    })
    token = response.body.token;
})

// testing a signup route
test('should signup a new user', async () => {
    await request(app).post('/api').send({
        name: "Andrew",
        email: "Andrew@gmail.com",
        password: "123ert",
    }).expect(200)
})

// testing a login route
test('should login a user', async () => {
    const response = await request(app).post('/api/login').send({
        email: "Shubham@gmail.com",
        password: "123ert"
    }).expect(200)
})

// testing a login route by providing invalid password
test('should not login non_existence user', async () => {
    await request(app).post('/api/logIn').send({
        email: "Shubham@gmail.com",
        password: "123er"
    }).expect(401)
})

// testing an update route with token
test('should update', () => {
    const response = request(app).put('/api/1')
        .set('Authorization', `Bearer ${token}`)
        .send({
            name: "Romit"
        }).then((response) => {
            expect(200);
        });
})

// testing an update route without token
test('should not update and failed', () => {
    request(app).put('/api/1')
        .send({
            name: "Romit"
        }).expect(200);
})

