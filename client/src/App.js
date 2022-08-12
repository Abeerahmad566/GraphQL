import "./App.css";

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
} from "@apollo/client";
import BookList from "./components/BookList";
import Notification from "./components/Notification";

//apollo client setup

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
  onError: ({ networkError, graphQLErrors }) => {
    console.log("graphQLErrors", graphQLErrors);
    console.log("networkError", networkError);
  },
});
function App() {
  return (
    <ApolloProvider client={client}>
      <div className="container">
        <h1>Add Books</h1>
        <div className="flex-container">
          <div className="flex-child">
            <BookList />
          </div>
          <div className="flex-child">
            <Notification />
          </div>
        </div>
      </div>
    </ApolloProvider>
  );
}

export default App;
