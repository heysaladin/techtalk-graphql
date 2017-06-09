import React from 'react';
import {
    gql,
    graphql,
} from 'react-apollo';

const PersonPreview = ({ data: {loading, error, person } }) => {  
return (
    <div>
      <div className="personName">
        {person ? person.name : 'Loading...'}
      </div>
      <div>Loading Messages</div>
    </div>
  );
};
export const personQuery = gql`
  query PersonQuery($personId : ID!) {
    person(id: $personId) {
      id
      name
    }
  }
`;
export default (graphql(personQuery, {
  options: (props) => ({
    variables: { personId: props.personId },
  }),
})(PersonPreview));
