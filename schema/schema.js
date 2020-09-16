const graphql = require('graphql');
const _ = require('lodash');

//dummy data
const usersData = [
  { id: '1', name: 'Peter', age: 45, profession: 'Programmer' },
  { id: '2', name: 'Linda', age: 12, profession: 'Baker' },
  { id: '3', name: 'Sam', age: 20, profession: 'Doctor' }
];

const hobbiesData = [
  { id: '1', title: 'Peter hobby', description: 'hello', userId: '1' },
  { id: '2', title: 'Massie hobby', description: 'no', userId: '2' }
];

const postsData = [
  { id: '1', comment: 'Buiding a mind', userId: '1' },
  { id: '2', comment: 'Massie que', userId: '1' },
  { id: '3', comment: 'Massie que', userId: '2' },
  { id: '4', comment: 'Massie que', userId: '3' }
];

const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList
} = graphql;

// Create types
const UserType = new GraphQLObjectType({
  name: 'User',
  description: 'Documentation for user...',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    profession: { type: GraphQLString },

    posts: {
      type: new GraphQLList(PostType),
      resolve(parent, args) {
        return _.filter(postsData, { userId: parent.id });
      }
    },

    hobbies: {
      type: new GraphQLList(HobbyType),
      resolve(parent, args) {
        return _.filter(hobbiesData, { userId: parent.id });
      }
    }
  })
});

const HobbyType = new GraphQLObjectType({
  name: 'Hobby',
  description: 'Hobby description',
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    user: {
      type: UserType,
      resolve(parent, args) {
        return _.find(usersData, { id: parent.userId });
      }
    }
  })
});

const PostType = new GraphQLObjectType({
  name: 'Post',
  description: 'Post description',
  fields: () => ({
    id: { type: GraphQLID },
    comment: { type: GraphQLString },
    user: {
      type: UserType,
      resolve(parent, args) {
        return _.find(usersData, { id: parent.userId });
      }
    }
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
    },
    hobby: {
      type: HobbyType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return _.find(hobbiesData, { id: args.id });
        //return data for hobby
      }
    },
    post: {
      type: PostType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return _.find(postsData, { id: args.id });
        //return data for post
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
