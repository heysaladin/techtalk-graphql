export const typeDefs = `

type Person {
  id: ID!
  name: String
}

type Query {
  people: [Person]
}
`;
