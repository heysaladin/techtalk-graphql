import React from 'react';
import MessageList from './MessageList';
import PersonPreview from './PersonPreview';
import NotFound from './NotFound';

import {
    gql,
    graphql,
} from 'react-apollo';

const PersonDetails = ({ data: {loading, error, person }, match }) => {
  if (loading) {
    return <PersonPreview personId={match.params.personId}/>;
  }
  if (error) {
    return <p>{error.message}</p>;
  }
  if(person === null){
    return <NotFound />
  }
  return (<div className="container">
      <div className="personName">
        {person.name}
      </div>
      <img style={{width: 300,borderRadius:10,margin:'0 auto',display:'block'}} src={person.picture} alt={person.name} />
      <MessageList messages={person.messages}/>
    </div>);
}

export const personDetailsQuery = gql`
  query PersonDetailsQuery($personId : ID!) {
    person(id: $personId) {
      id
      name
      picture
      messages {
        id
        text
      }
    }
  }
`;

export default (graphql(personDetailsQuery, {
  options: (props) => ({
    variables: { personId: props.match.params.personId },
  }),
})(PersonDetails));
