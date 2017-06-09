import {
  makeExecutableSchema,
  addMockFunctionsToSchema,
} from 'graphql-tools';

import { resolvers } from './resolvers';

const typeDefs = `
type Person {
  id: ID!
  name: String
  picture: String
  friends: [String]!
  messages: [Message]!
}
type Message {
  id: ID!
  text: String
}
# This type specifies the entry points into our API
type Query {
  people: [Person]
  person(id: ID!): Person
}
# The mutation root type, used to define all mutations
#type Mutation {
#  addPerson(name: String!, picture: String!): Person
#}

input MessageInput{
  personId: ID!
  text: String
}
type Mutation {
  # A mutation to add a new person to the list of people
  addPerson(name: String!, picture: String!): Person
  updatePerson(id: String!, name: String!, picture: String!): Person
  deletePerson(id: String!): Person
  addMessage(message: MessageInput!): Message
}

`;

const schema = makeExecutableSchema({ typeDefs, resolvers });
export { schema };
