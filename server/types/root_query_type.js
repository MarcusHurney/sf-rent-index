const graphql = require('graphql');
const mongoose = require('mongoose');
const UserType = require('./user_type');
const PropertyType = require('./property_type');
const Property = mongoose.model('property');

const { GraphQLObjectType, GraphQLList } = graphql;

const RootQueryType = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    currentUser: {
      type: UserType,
      resolve(parentValue, args, { user }) {
        return user;
      }
    },
    properties: {
      type: new GraphQLList(PropertyType),
      resolve() {
        return Property.find({});
      }
    }
  }
});

module.exports = RootQueryType;
