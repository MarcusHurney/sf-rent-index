const graphql = require('graphql');
const mongoose = require('mongoose');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList
} = graphql;

const User = mongoose.model('user');

const PropertyType = require('./property_type');

const UserType = new GraphQLObjectType({
  name: 'UserType',
  fields: () => ({
    id: { type: GraphQLID },
    email: { type: GraphQLString },
    properties: {
      type: new GraphQLList(PropertyType),
      resolve(parentValue) {
        return User.findProperties(parentValue.id);
      }
    }
  })
});

module.exports = UserType;
