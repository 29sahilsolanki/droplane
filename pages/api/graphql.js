import { createSchema, createYoga } from "graphql-yoga";
import { typeDefs } from "../../graphql/type-defs";
import { Query } from "../../graphql/resolvers/Query";
import { Mutation } from "../../graphql/resolvers/Mutation";

// Yoga reads the request body itself, so Next's parser must be off
export const config = {
  api: { bodyParser: false },
};

const schema = createSchema({ typeDefs, resolvers: { Query, Mutation } });

export default createYoga({
  schema,
  graphqlEndpoint: "/api/graphql",
});
