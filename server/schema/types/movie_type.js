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
    vote_count: { type: GraphQLString },
    vote_average: { type: GraphQLString },
    popularity: { type: GraphQLString },
    poster_path: { type: GraphQLString },
    backdrop_path: { type: GraphQLString },
    original_language: { type: GraphQLString },
    overview: { type: GraphQLString },
    release_date: { type: GraphQLString },
    status: { type: GraphQLString },
    revenue: { type: GraphQLString },
    budget: { type: GraphQLString },
    tagline: { type: GraphQLString }
  }
});

module.exports = MovieType;
