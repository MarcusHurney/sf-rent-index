const graphql = require('graphql');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt
} = graphql;

const MovieType = new GraphQLObjectType({
  name: 'MovieType',
  fields: {
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    vote_count: { type: GraphQLInt },
    vote_average: { type: GraphQLInt },
    popularity: { type: GraphQLInt },
    poster_path: { type: GraphQLString },
    backdrop_path: { type: GraphQLString },
    original_language: { type: GraphQLString },
    overview: { type: GraphQLString },
    release_date: { type: GraphQLString }
  }
});

module.exports = MovieType;
