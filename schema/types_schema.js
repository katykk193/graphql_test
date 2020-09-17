const graphql = require('graphql');

const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLFloat,
  GraphQLNonNull
} = graphql;

//Scalar Type
/**
 * String = GraphQLString
 * Int
 * Float
 * Boolean
 * ID
 */

const Person = new GraphQLObjectType({
  name: 'Person',
  description: 'Represents a Person Type',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: new GraphQLNonNull(GraphQLString) },
    age: { type: GraphQLInt },
    isMarried: { type: GraphQLBoolean },
    gpa: { type: GraphQLFloat },

    justAType: {
      type: Person,
      resolve(parent, args) {
        return parent;
      }
    }
  })
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  description: 'Description',
  fields: {
    person: {
      type: Person,
      resolve(parent, args) {
        const personObj = {
          name: 'Tony',
          age: 35,
          isMarried: true,
          gpa: 4.5
        };
        return personObj;
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
