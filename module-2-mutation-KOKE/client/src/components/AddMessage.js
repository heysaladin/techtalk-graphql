import React from 'react';
import { gql, graphql } from 'react-apollo';
import { personDetailsQuery } from './PersonDetails';
import { withRouter } from 'react-router';


/* const AddMessage = ({ match }) => {
  const handleKeyUp = (evt) => {
    if (evt.keyCode === 13) {
      evt.target.value = '';
    }
  };

  return (
    <div className="messageInput">
      <input
        type="text"
        placeholder="New message"
        onKeyUp={handleKeyUp}
      />
    </div>
  );
};*/

const AddMessage = ({ mutate, match }) => {
  const handleKeyUp = (evt) => {
    if (evt.keyCode === 13) {
      mutate({
        variables: {
          message: {
            personId: match.params.personId,
            text: evt.target.value
          }
        },
        optimisticResponse: {
          addMessage: {
            text: evt.target.value,
            id: Math.round(Math.random() * -1000000),
            __typename: 'Message',
          },
        },
        update: (store, { data: { addMessage } }) => {
          // Read the data from the cache for this query.
          const data = store.readQuery({
            query: personDetailsQuery,
            variables: {
              personId: match.params.personId,
            }
          });
          // Add our Message from the mutation to the end.
          data.person.messages.push(addMessage);
          // Write the data back to the cache.
          store.writeQuery({
            query: personDetailsQuery,
            variables: {
              personId: match.params.personId,
            },
            data
          });
        },
      });
      evt.target.value = '';
    }
  };
  return (
    <div className="messageInput">
      <input
        type="text"
        placeholder="New message"
        onKeyUp={handleKeyUp}
      />
    </div>
  );
};

const addMessageMutation = gql`
  mutation addMessage($message: MessageInput!) {
    addMessage(message: $message) {
      id
      text
    }
  }
`;  

// export default withRouter(AddMessage);

const AddMessageWithMutation = graphql(
  addMessageMutation,
)(withRouter(AddMessage));
export default AddMessageWithMutation;
