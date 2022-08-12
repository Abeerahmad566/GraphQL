const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const { graphqlHTTP } = require("express-graphql");
const typeDefs = require("./schema/typeDefs");
const resolvers = require("./schema/resolvers");
const mongoose = require("mongoose");
const cors = require("cors");
const { makeExecutableSchema } = require("@graphql-tools/schema");
const { SubscriptionServer } = require("subscriptions-transport-ws");
const { execute, subscribe } = require("graphql");
const { createServer } = require("http");

const app = express();
app.use(cors());

// app.use(
//   "/graphql",
//   graphqlHTTP({
//     schema: schema,
//     graphiql: true,
//   })
// ); //graphql endpoint where request will be entertained
// const startServer = async () => {
//   const app = express();

//   const apolloServer = new ApolloServer({
//     typeDefs,
//     resolvers,
//   });
//   await apolloServer.start();
//   apolloServer.applyMiddleware({ app: app });
//   app.listen(4000, () => console.log("Server UP & RUnning *4000"));
// };
// startServer();
(async function () {
  const app = express();

  const httpServer = createServer(app);

  const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
  });

  const subscriptionServer = SubscriptionServer.create(
    {
      schema,
      execute,
      subscribe,
    },
    { server: httpServer, path: "/graphql" }
  );

  const server = new ApolloServer({
    schema,
    plugins: [
      {
        async serverWillStart() {
          return {
            async drainServer() {
              subscriptionServer.close();
            },
          };
        },
      },
    ],
  });
  await server.start();
  server.applyMiddleware({ app });

  mongoose.connect(
    "mongodb+srv://Abeer:abeer@cluster0.hpwdt.mongodb.net/GraphQl?retryWrites=true&w=majority"
  );
  mongoose.connection.once("open", () => {
    console.log("Connected to Mongoose");
  });

  httpServer.listen(4000, () => console.log("Server is running on " + 4000));
})();
