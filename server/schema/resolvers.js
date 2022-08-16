const Book = require("../models/book");
const Notification = require("../models/notification");
const { PubSub } = require("graphql-subscriptions");

const pubsub = new PubSub();

const resolvers = {
  Query: {
    hello: () => {
      return "Hello World";
    },
    getAll: async () => {
      return await Book.find();
    },
    getAllnoti: async () => {
      return await Notification.find();
    },
  },
  Mutation: {
    createBook: async (parent, args, context, info) => {
      const { name, genre, author } = args.book;
      const book = await new Book({ name, genre, author }).save();
      pubsub.publish("NOTIFICATION CREATED", {
        notificationCreated: {
          name: name,
          author: author,
        },
      });
      return book;
    },
    updateBook: async (parent, args, context, info) => {
      console.log(args);
      const book = await Book.findOneAndUpdate(
        { id: args.id },
        { name: args.name, genre: args.genre, author: args.author }
      );
      return book;
    },
    deleteBook: async (parent, args, context, info) => {
      const { id } = args;
      await Book.findByIdAndDelete(id);
      return "Deleted";
    },
  },

  Subscription: {
    notificationCreated: {
      subscribe: () => pubsub.asyncIterator("NOTIFICATION CREATED"),
    },
  },
};
module.exports = resolvers;
