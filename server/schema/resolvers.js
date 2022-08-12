const Book = require("../models/book");
const Notification = require("../models/notification");

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
    createNoti: async (parent, args, context, info) => {
      console.log(args);
      const name = args;
      const notification = await new Notification(name).save();
      return notification;
    },
  },
};
module.exports = resolvers;
