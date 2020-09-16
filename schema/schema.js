const graphql = require('graphql');
const _ = require('lodash');

//dummy data
const usersData = [
  { id: 1, name: 'Peter', age: 45 },
  { id: 2, name: 'Linda', age: 12 },
  { id: 3, name: 'Sam', age: 20 }
];

const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLSchema } = graphql;

// Create types
const UserType = new GraphQLObjectType({
  name: 'User',
  description: 'Documentation for user...',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    age: { type: GraphQLInt }
  })
});

// Root query
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  description: 'Description',
  fields: {
    user: {
      type: UserType,
      args: {
        id: {
          type: GraphQLString
        }
      },
      resolve(parent, args) {
        return _.find(usersData, { id: args.id });
        // resolve with data
        // get and return data from a datasource
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
