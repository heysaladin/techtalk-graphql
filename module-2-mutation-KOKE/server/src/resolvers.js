const people = [{
  id: '1',
  name: 'joko',
  picture: 'http://lorempixel.com/output/people-q-c-300-300-6.jpg',
  friends: [
    '/person/2'
  ],
  messages: [{
    id: '1',
    text: 'joko is football',
  }, {
    id: '2',
    text: 'hello joko world cup',
  }]
}, {
  id: '2',
  name: 'basuki',
  picture: 'http://lorempixel.com/output/people-q-c-300-300-4.jpg',
  friends: [
    '/person/1'
  ],
  messages: [{
    id: '3',
    text: 'basuki is life',
  }, {
    id: '4',
    text: 'hello basuki world series',
  }]
}];
let nextId = 3;
let nextMessageId = 5;

export const resolvers = {
  Query: {
    people: () => {
      return people;
    },
    person: (root, { id }) => {
      return people.find(person => person.id === id);
    },
  },

  Mutation: {
  addPerson: (root, args) => {
      const newPerson = { id: String(nextId++), messages: [], name: args.name, picture: args.picture };
      people.push(newPerson);
      return newPerson;
    },
  updatePerson: (root, args) => {
      const updatedPerson = { id: args.id };
      people.pop(updatedPerson);
      const updatedNewPerson = { id: args.id, messages: [], name: args.name, picture: args.picture };
      people.push(updatedNewPerson);
      return updatedNewPerson;
    },
  deletePerson: (root, args) => {
    // for(var i = people.length - 1; i >= 0; i--) {
      const destroyPerson = { id: args.id };
      people.pop(destroyPerson);
      // if(people.includes(destroyPerson)){
        // console.log(destroyPerson);
      // people.splice(index,1, destroyPerson);
      // }
      return destroyPerson;
    // }
    },
  addMessage: (root, { message }) => {
    const person = people.find(person => person.id === message.personId);
    if(!person)
      throw new Error("Person does not exist");
    const newMessage = { id: String(nextMessageId++), text: message.text };
    person.messages.push(newMessage);
    return newMessage;
  },
},

};
