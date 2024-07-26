const {faker}  = require('@faker-js/faker');
const { createUser, deleteUser, readUser, updateUser } = require('../utils/apiRequests');
const {user} = require('../data/requestBody')
const {validAuthorization, noAuthorization} = require('../utils/headers')


describe("POST /public/v2/users", () => {

    it("should create new user'", async () => { 
        user.name = faker.person.firstName()
        user.email = faker.internet.email()
        const response =  await createUser(user, validAuthorization)
        expect(response.status).toBe(201);
        expect(response.body.name).toBe(user.name);
        expect(response.body.gender).toBe(user.gender);
    });

    it("should return 422 when response is incorrect'", async () => { 
        user.name = faker.person.firstName()
        user.email = ""
        const response =  await createUser(user, validAuthorization)
        expect(response.status).toBe(422);
    });

    it("should return 401 when unauthorized", async () => { 
        user.name = faker.person.firstName()
        user.email = faker.internet.email()
        const response =  await createUser(user, noAuthorization)
        expect(response.status).toBe(401);
    });

 
});

describe("GET /public/v2/users/{id}", () => {

    let id = "";

    beforeEach(async () => {
        user.name = faker.person.firstName()
        user.email = faker.internet.email()
        id =  (await createUser(user, validAuthorization)).body.id
    });

    it("should get details of an existing user'", async () => { 
        const response = await readUser(id, validAuthorization)
        expect(response.status).toBe(200);
        expect(response.body.id).toBe(id);
        expect(response.body.name).toBe(user.name);
        expect(response.body.email).toBe(user.email);
        expect(response.body.gender).toBe(user.gender)
    });

    it("should return 404 when unauthorized", async () => { 
        const response = await readUser("test", noAuthorization)
        expect(response.status).toBe(404);
    });

    it("should return 404 when resource not found", async () => { 
        const response = await readUser("id", validAuthorization)
        expect(response.status).toBe(404);
        expect(response.body.message).toBe("Resource not found")
    });

    it("should return 404 for a deleted user'", async () => { 
        await deleteUser(id, validAuthorization)
        const response = await readUser(id, validAuthorization)
        expect(response.status).toBe(404);
        expect(response.body.message).toBe("Resource not found")
    });

    afterEach(async () => {
        await deleteUser(id, validAuthorization)
    });
});

describe("PUT|PATCH /public/v2/users/{id}", () => {

    let id = "";

    beforeEach(async () => {
        user.name = faker.person.firstName()
        user.email = faker.internet.email()
        id =  (await createUser(user, validAuthorization)).body.id
    });

    it("should update details of an existing user'", async () => { 
        user.name = "updated " + user.name
        user.email = "updated" + user.email
        user.gender = "female"
        const response = await updateUser(id, user, validAuthorization)
        expect(response.status).toBe(200);
        expect(response.body.id).toBe(id);
        expect(response.body.name).toBe(user.name);
        expect(response.body.email).toBe(user.email);
        expect(response.body.gender).toBe(user.gender)
    });

    it("should return 404 for a deleted user", async () => { 
        user.name = "updated " + user.name
        user.email = "updated" + user.email
        user.gender = "female"
    
        await deleteUser(id, validAuthorization)
        const response = await updateUser(id, user, validAuthorization)
        expect(response.status).toBe(404);
        expect(response.body.message).toBe("Resource not found")
    });

    

    afterEach(async () => {
        await deleteUser(id, validAuthorization)
    });
});

describe("DELETE /public/v2/users/{id}", () => {

    let id = "";

    beforeEach(async () => {
        user.name = faker.person.firstName()
        user.email = faker.internet.email()
        id =  (await createUser(user, validAuthorization)).body.id
    });

    it("should delete new user'", async () => { 
        const response = await deleteUser(id, validAuthorization)
        expect(response.status).toBe(204);
    });

    it("should return 404 for an invalid id", async () => { 
        const response = await deleteUser("1234", validAuthorization)
        expect(response.status).toBe(404);
    });

    it("should return 404 for an anuthorised user", async () => { 
        const response = await deleteUser("id", noAuthorization)
        expect(response.status).toBe(404);
    });

    afterEach(async () => {
        await deleteUser(id, validAuthorization)
    });

});