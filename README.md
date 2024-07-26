# Automated API Testing

Automated API Tests for Go Rest(Users) was implemented as part of this project. The documentation for the API is available [here](https://gorest.co.in/). This test framework was developed with SuperTest, Jest and Javascript.


## Frameworks
Following frameworks were used to implement the test tests
- [SuperTest](https://github.com/visionmedia/supertest) provides a high level absctraction for the HTTP requests
- [Jest](https://jestjs.io/) is a javascript testing framework


## Github Actions
The tests are also executed as part of Continuous Integration using Github Actions.

The configuration file for the same is available here `.github/workflows/ci.yml`

## Test Scenarios

#### Following test scenarios were covered


## Steps to execute

- #### Pre-requisite
    - `node.js` should be installed on the system.

- #### Setup
    - Token for the Go Rest API can be fetched from [here](https://gorest.co.in/my-account/access-tokens). 
    - Run `npm install` to install node modules.

- #### Execute tests on Local
    -  To execute all the tests

        `TOKEN=${YOUR_TOKEN} npm run test` 