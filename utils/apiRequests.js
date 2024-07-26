const supertest = require("supertest")
const env = require('../env');
const request = supertest(env.url);


function createUser(requestBody, authHeaders) {

    return request.post(`public/v2/users`)
        .set(authHeaders)
        .send(requestBody);
}

function deleteUser(id, authHeaders) {

    return request.delete(`public/v2/users/${id}`)
        .set(authHeaders);
}

function readUser(id, authHeaders) {

    return request.get(`public/v2/users/${id}`)
        .set(authHeaders);
}

function updateUser(id, requestBody, authHeaders) {

    return request.patch(`public/v2/users/${id}`)
        .set(authHeaders)
        .send(requestBody);
}

module.exports = { createUser, deleteUser, readUser, updateUser };