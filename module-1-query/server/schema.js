import DataLoader from 'dataloader';
import fetch from 'node-fetch';
import {
  GraphQLList,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLInputObjectType,
} from 'graphql';

import {
  fromGlobalId,
  globalIdField,
  nodeDefinitions,
} from 'graphql-relay';

const BASE_URL = 'http://localhost:8000';

function fetchResponseByURL(relativeURL) {
  console.log(`${BASE_URL}${relativeURL}`);
  return fetch(`${BASE_URL}${relativeURL}`).then(res => res.json());
}

function fetchPeople() {
  return fetchResponseByURL('/people/').then(json => json.people);
}

function fetchPersonByURL(relativeURL) {
  return fetchResponseByURL(relativeURL).then(json => json.person);
}

const personLoader = new DataLoader(
  urls => Promise.all(urls.map(fetchResponseByURL))
);

const { nodeInterface, nodeField } = nodeDefinitions(
  globalId => {
    const { type, id } = fromGlobalId(globalId);
    if (type === 'Person') {
      // return fetchPersonByURL(`/people/${id}/`);
      return personLoader.load(`/people/${id}/`);
    }
  },
  object => {
    if (object.hasOwnProperty('username')) {
      return 'Person';
    }
  },
);

// function getPersonByURL(relativeURL){
//   console.log(`${BASE_URL}${relativeURL}`);
//   return fetch(`${BASE_URL}${relativeURL}`).then(res => res.json()).then(json => json.person)
// }

const PersonType = new GraphQLObjectType({
  name: 'Person',
  description: 'Somebody that you used to know',
  fields: () => ({
    // id: {
    //   type: GraphQLString
    // },
    id: globalIdField('Person'),
    firstName: {
      type: GraphQLString,
      resolve: (person) => person.first_name,
    },
    lastName: {
      type: GraphQLString,
      resolve: (person) => person.last_name,
    },
    email: {
      type: GraphQLInt
    },
    username: {
      type: GraphQLString
    },
    friends: {
      type: new GraphQLList(PersonType),
      // resolve: (person) => person.friends.map(getPersonByURL)
      // resolve: person => person.friends.map(fetchResponseByURL),
      resolve: person => personLoader.loadMany(person.friends),
    },
  }),
  interfaces: [ nodeInterface ],
});

const QueryType = new GraphQLObjectType({
  name: 'Query',
  description: 'The root of all... queries',
  fields: () => ({
    allPeople: {
      type: new GraphQLList(PersonType),
      resolve: fetchPeople, // root => // Fetch the index of people from the REST API,
    },
    node: nodeField,
    person: {
      type: PersonType,
      args: {
        id: {type: GraphQLString}
      },
      // resolve: (root, args) => fetchPersonByURL(`/people/${args.id}/`),
      // resolve: (root, args) => getPersonByURL(`/people/${args.id}/`)
      resolve: (root, args) => personLoader.load(`/people/${args.id}/`),
    },
  }),
});

var MutationType = new GraphQLObjectType({
  name: 'PeopleMutations',
  description: 'These are the things we can change',
  fields: () => ({
    createPerson: {
      type: PersonType,
      description: 'Create a new person',
      args: {
        id:          { type: GraphQLString },
        username:        { type: new GraphQLNonNull(GraphQLString) },
        email:       { type: new GraphQLNonNull(GraphQLString) },
        firstName:        { type: GraphQLString },
        lastName:        { type: GraphQLString },
        friends: { type: new GraphQLList(GraphQLString) }
      },
      resolve: (value, { person }) => {
        return PersonType.createPerson(person);
      }
    }
  }),
});

// const PersonInputType = new GraphQLInputObjectType({
//   name: 'PersonInput',
//   fields: () => ({
//     id:          { type: GraphQLString },
//     usename:        { type: new GraphQLNonNull(GraphQLString) },
//     email:       { type: new GraphQLNonNull(GraphQLString) },
//     firstName:        { type: GraphQLString },
//     lastName:        { type: GraphQLString },
//     friends: { type: new GraphQLList(GraphQLString) }
//   })
// });

export default new GraphQLSchema({
  query: QueryType,
  mutation: MutationType
});
