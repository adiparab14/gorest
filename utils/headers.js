const env = require('../env');

const headers = {
    validAuthorization: { 'Authorization': `Bearer ${env.token}`, 'Content-Type': 'application/json' },
    noAuthorization: { 'Content-Type': 'application/json' }
};

module.exports = headers;

