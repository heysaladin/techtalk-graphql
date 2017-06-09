import React, { Component } from 'react';
import {
  BrowserRouter,
  Link,
  Route,
  Switch,
} from 'react-router-dom';

import './App.css';
import PeopleListWithData from './components/PeopleListWithData';
import NotFound from './components/NotFound';
import PersonDetails from './components/PersonDetails';

import {
  ApolloClient,
  ApolloProvider,
  createNetworkInterface,
  toIdValue,
} from 'react-apollo';


const networkInterface = createNetworkInterface({ uri: 'http://localhost:4000/graphql' });
networkInterface.use([{
  applyMiddleware(req, next) {
    setTimeout(next, 500);
  },
}]);

function dataIdFromObject (result) {
  if (result.__typename) {
    if (result.id !== undefined) {
      return `${result.__typename}:${result.id}`;
    }
  }
  return null;
}

const client = new ApolloClient({
  networkInterface,
  customResolvers: {
    Query: {
      person: (_, args) => {
        return toIdValue(dataIdFromObject({ __typename: 'Person', id: args['id'] }))
      },
    },
  },
  dataIdFromObject,
});


class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <BrowserRouter>
          <div className="App">
            <Link to="/" className="navbar">
              <h4 className="navbarLogo">KoKé</h4>
              <small><i>Friendship Media</i></small>
            </Link>
            <Switch>
              <Route exact path="/" component={PeopleListWithData}/>
              <Route path="/person/:personId" component={PersonDetails}/>
              <Route component={ NotFound }/>
            </Switch>
          </div>
        </BrowserRouter>
      </ApolloProvider>
    );
  }
}

export default App;
