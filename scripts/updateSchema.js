var introspectionQuery = require('graphql/utilities').introspectionQuery;
var request = require('sync-request');
var fs = require('fs');
var path = require('path');

var graphqlUrl = 'http://localhost:8000/graphql';
var response = request('GET', graphqlUrl, {
  qs: {
    query: introspectionQuery
  }
});

var schema = response.body.toString('utf-8');
if (!fs.existsSync(path.join(__dirname, '../data'))) {
  fs.mkdirSync(path.join(__dirname, '../data'))
}
fs.writeFileSync(
  path.join(__dirname, '../data/schema.json'),
  schema
);
