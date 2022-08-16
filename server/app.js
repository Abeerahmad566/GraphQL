const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const typeDefs = require("./schema/typeDefs");
const resolvers = require("./schema/resolvers");
const cors = require("cors");
const { WebSocketServer } = require("ws");
const { useServer } = require("graphql-ws/lib/use/ws");
const { makeExecutableSchema } = require("@graphql-tools/schema");
const { createServer } = require("http");
const { ApolloServerPluginDrainHttpServer } = require("apollo-server-core");
const connectDb = require("./db");
const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });
const app = express();
app.use(cors());
const { PubSub } = require("graphql-subscriptions");

const pubsub = new PubSub();

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

async function serverstart() {
  // console.log(process.env.GOOGLE_APPLICATION_CREDENTIALS);
  const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
  });
  const app = express();
  const httpServer = createServer(app);

  const wsServer = new WebSocketServer({
    server: httpServer,
    path: "/graphql",
  });
  const getDynamicContent = async (ctx, msg, args) => {
    return { pubsub };
  };
  const serverCleanup = useServer(
    {
      schema,
      context: (ctx, msg, args) => {
        return getDynamicContent(ctx, msg, args);
      },
    },

    wsServer
  );

  const server = new ApolloServer({
    schema,
    // csrfPrevention: true,

    // cache: "bounded",
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose();
            },
          };
        },
      },
    ],
  });
  await server.start();
  //graphql path
  server.applyMiddleware({ app });
  // database connect
  await connectDb();
  // port listen
  const port = process.env.PORT;
  httpServer.listen(port, () => {
    console.log(
      `App running in ${process.env.NODE_ENV}  http://localhost:${port}${server.graphqlPath}`
    );
    console.log(
      `🚀 Subscription endpoint ready at ws://localhost:${port}${server.graphqlPath}`
    );
  });
}
serverstart();
